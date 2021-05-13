import API, { graphqlOperation } from '@aws-amplify/api-graphql';
import awsExports from '../src/aws-exports';
API.configure(awsExports);
import {
  ListBosssQuery,
  CreateSessionMutation,
  GetRandomQuestionsMutation,
} from '../src/API';
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

const getRandomQuestionsNoAnswers = `mutation GetRandomQuestions($input: GetRandomQuestionsInput) {
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
          correct
        }
        text
        id
        questionBossId
      }
    }
  }
}
`;

export async function getNewQuestions(
  sessionId: string,
  bossId: string,
  numQuestionsForRound: number
) {
  try {
    const response = (await API.graphql(
      graphqlOperation(getRandomQuestions, {
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
