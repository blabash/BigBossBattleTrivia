import API, { graphqlOperation } from '@aws-amplify/api-graphql';
import { ListBosssQuery, GetBossQuery } from '../src/API';
import awsExports from '../src/aws-exports';
import { listBosss, getBoss } from '../src/graphql/queries';
API.configure(awsExports);

export async function getBosssData() {
  try {
    const response = (await API.graphql(graphqlOperation(listBosss))) as {
      data: ListBosssQuery;
    };
    return response.data.listBosss.items;
  } catch (error) {
    console.warn(error);
  }
}

export async function getBossSlugs() {
  try {
    const response = (await API.graphql(graphqlOperation(listBosss))) as {
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
    return response.data.listBosss.items;
  } catch (error) {
    console.warn(error);
  }
}
