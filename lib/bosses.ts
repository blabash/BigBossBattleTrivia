import API, { graphqlOperation } from '@aws-amplify/api-graphql';
import awsExports from '../src/aws-exports';
API.configure(awsExports);
import { ListBosssQuery, CreateSessionMutation } from '../src/API';
import { listBosss } from '../src/graphql/queries';
import { createSession, getRandomQuestions } from '../src/graphql/mutations';

export async function getBossesData() {
  try {
    const response = (await API.graphql(graphqlOperation(listBosss))) as {
      data: ListBosssQuery;
      error: {}[];
    };
    return response.data.listBosss.items;
  } catch (error) {
    console.warn(error);
  }
}

const bossSlugs = `query BossSlugs {
  listBosss {
    items {
      slug
    }
  }
}`;

export async function getBossSlugs() {
  try {
    const response = (await API.graphql({ query: bossSlugs })) as {
      data: ListBosssQuery;
    };
    return response.data.listBosss.items.map(({ slug }) => ({
      params: {
        slug,
      },
    }));
  } catch (error) {
    console.warn(error);
  }
}

export async function getBossData(slug: string | string[]) {
  try {
    const response = (await API.graphql(
      graphqlOperation(listBosss, {
        filter: {
          slug: {
            eq: slug,
          },
        },
      })
    )) as {
      data: ListBosssQuery;
      error: {}[];
    };
    return response.data.listBosss.items[0];
  } catch (error) {
    console.warn(error);
  }
}

export async function createSessionId() {
  try {
    const response = (await API.graphql(
      graphqlOperation(createSession, { input: {} })
    )) as {
      data: CreateSessionMutation;
      error: {}[];
    };
    return response.data.createSession.id;
  } catch (error) {
    console.warn(error);
  }
}

const getRandomQuestionsWithoutCorrectAnswer = `mutation GetRandomQuestions($input: GetRandomQuestionsInput!) {
  getRandomQuestions(input: $input) {
    ... on DdbError {
      statusCode
      error
    }
    ... on NewQuestions {
      newQuestions {
        updatedAt
        createdAt
        answers {
          text
        }
        text
        id
        questionBossId
      }
    }
  }
}
`;
type GetRandomQuestionsMutation = {
  getRandomQuestions:
    | (
        | {
            __typename: 'DdbError';
            statusCode: number | null;
            error: string | null;
          }
        | {
            __typename: 'NewQuestions';
            newQuestions: Array<{
              __typename: string;
              updatedAt: string | null;
              createdAt: string | null;
              answers: Array<{
                __typename: string;
                text: string;
              } | null> | null;
              text: string | null;
              id: string | null;
              questionBossId: string | null;
            } | null> | null;
          }
      )
    | null;
};
export async function getNewQuestions(
  sessionId: string,
  bossId: string,
  numQuestionsForRound: number
) {
  try {
    const response = (await API.graphql(
      graphqlOperation(getRandomQuestionsWithoutCorrectAnswer, {
        input: {
          sessionId,
          bossId,
          numQuestionsForRound,
        },
      })
    )) as {
      data: GetRandomQuestionsMutation;
      error: {}[];
    };
    return response.data.getRandomQuestions;
  } catch (error) {
    console.warn(error);
  }
}

const getQuestionAnswerQuery = `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
    answers {
      correct
    }
  }
}
`;
type GetQuestionAnswerQuery = {
  getQuestion: {
    __typename: 'Question';
    answers: Array<{
      __typename: 'Answer';
      correct: boolean;
    }>;
  } | null;
};
export async function getQuestionAnswer(id: string) {
  try {
    const response = (await API.graphql(
      graphqlOperation(getQuestionAnswerQuery, { id })
    )) as { data: GetQuestionAnswerQuery; error: {}[] };
    return response.data.getQuestion.answers;
  } catch (error) {
    console.warn(error);
  }
}
