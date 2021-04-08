import API, { graphqlOperation } from '@aws-amplify/api-graphql';
import { ListBosssQuery } from '../src/API';
import awsExports from '../src/aws-exports';
import { listBosss } from '../src/graphql/queries';
API.configure(awsExports);


export async function getBosss() {
  try {
    const response = (await API.graphql(graphqlOperation(listBosss))) as {
      data: ListBosssQuery, errors: {}[]
    }
    if (response.data.listBosss !== null) {
      return response.data.listBosss.items
    } else {
      console.warn('Failed to fetch bosses. ', response.errors)
      return []
    }
  } catch (error) {
    console.warn(error)
    return []
  }
}

export async function getBossslugs() {
  try {
    const response = (await API.graphql(graphqlOperation(listBosss))) as {
      data: ListBosssQuery, errors: {}[]
    }
    if (response.data.listBosss !== null) {
      return response.data.listBosss.items.map(({slug}) => ({
        params: {
          slug
        }
      }))
    } else {
      console.warn('Failed to fetch bosses. ', response.errors)
      return []
    }
  } catch (error) {
    console.warn(error)
    return []
  }
}