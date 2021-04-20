// tslint:disable
// this is an auto generated file. This will be overwritten

export const getBoss = `query GetBoss($id: ID!) {
  getBoss(id: $id) {
    id
    name
    slug
    bossImgUrl
    background
    questions {
      items {
        id
        text
      }
      nextToken
    }
  }
}
`;
export const listBosss = `query ListBosss(
  $filter: ModelBossFilterInput
  $limit: Int
  $nextToken: String
) {
  listBosss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      slug
      bossImgUrl
      background
      questions {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getQuestion = `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
    id
    text
    boss {
      id
      name
      slug
      bossImgUrl
      background
      questions {
        nextToken
      }
    }
    answers {
      text
      correct
    }
  }
}
`;
export const listQuestions = `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      boss {
        id
        name
        slug
        bossImgUrl
        background
      }
      answers {
        text
        correct
      }
    }
    nextToken
  }
}
`;
export const getSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
    id
    seenQuestions
  }
}
`;
export const listSessions = `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      seenQuestions
    }
    nextToken
  }
}
`;
