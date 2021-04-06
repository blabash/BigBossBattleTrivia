// tslint:disable
// this is an auto generated file. This will be overwritten

export const getLevel = `query GetLevel($id: ID!) {
  getLevel(id: $id) {
    id
    boss
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
export const listLevels = `query ListLevels(
  $filter: ModelLevelFilterInput
  $limit: Int
  $nextToken: String
) {
  listLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      boss
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
    level {
      id
      boss
      bossImgUrl
      background
      questions {
        nextToken
      }
    }
    answers {
      items {
        id
        text
        correct
      }
      nextToken
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
      level {
        id
        boss
        bossImgUrl
        background
      }
      answers {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getAnswer = `query GetAnswer($id: ID!) {
  getAnswer(id: $id) {
    id
    text
    question {
      id
      text
      level {
        id
        boss
        bossImgUrl
        background
      }
      answers {
        nextToken
      }
    }
    correct
  }
}
`;
export const listAnswers = `query ListAnswers(
  $filter: ModelAnswerFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      question {
        id
        text
      }
      correct
    }
    nextToken
  }
}
`;
