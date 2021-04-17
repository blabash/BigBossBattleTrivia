import API, { graphqlOperation } from '@aws-amplify/api-graphql';
import {
  ListBosssQuery,
  GetBossQuery,
  GetQuestionQuery,
  ListQuestionsQuery,
} from '../src/API';
import awsExports from '../src/aws-exports';
import { getBoss, listBosss, listQuestions } from '../src/graphql/queries';
API.configure(awsExports);

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

const bossQuestions = `query GetQuestionsByBossId(
  $id: ID!
  $nextToken: String
  $limit: Int
) {
  getBoss(id: $id) {
    questions(limit: $limit, nextToken: $nextToken) {
      nextToken
      items {
        text
        answers {
          correct
          text
        }
      }
    }
  }
}`;

export async function getBossQuestions(
  id: string,
  limit?: number,
  nextToken?: string
) {
  try {
    const response = (await API.graphql(
      graphqlOperation(bossQuestions, { id, limit, nextToken })
    )) as {
      data: GetBossQuery;
      error: {}[];
    };
    console.log(response);
    return response.data.getBoss.questions;
  } catch (error) {
    console.warn(error);
  }
}
