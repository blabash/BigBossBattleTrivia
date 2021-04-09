import API, { graphqlOperation } from '@aws-amplify/api-graphql';
import { ListBosssQuery, GetBossQuery } from '../src/API';
import awsExports from '../src/aws-exports';
import { listBosss } from '../src/graphql/queries';
API.configure(awsExports);

export async function getBossesData() {
  try {
    const response = (await API.graphql(graphqlOperation(listBosss))) as {
      data: ListBosssQuery;
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

export async function getBossData(slug: GetBossQuery['getBoss']['slug']) {
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
    };
    return response.data.listBosss.items[0];
  } catch (error) {
    console.warn(error);
  }
}
