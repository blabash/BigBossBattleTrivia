// tslint:disable
// this is an auto generated file. This will be overwritten

export const getRandomQuestions = `mutation GetRandomQuestions($input: GetRandomQuestionsInput!) {
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
export const getRandomLootItem = `mutation GetRandomLootItem($input: GetRandomLootItemInput!) {
  getRandomLootItem(input: $input) {
    ... on DdbError {
      statusCode
      error
    }
    ... on LootItemResult {
      lootItem {
        id
        name
        thumbnailUrl
        tooltipUrl
      }
    }
  }
}
`;
export const createBoss = `mutation CreateBoss(
  $input: CreateBossInput!
  $condition: ModelBossConditionInput
) {
  createBoss(input: $input, condition: $condition) {
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
export const updateBoss = `mutation UpdateBoss(
  $input: UpdateBossInput!
  $condition: ModelBossConditionInput
) {
  updateBoss(input: $input, condition: $condition) {
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
export const deleteBoss = `mutation DeleteBoss(
  $input: DeleteBossInput!
  $condition: ModelBossConditionInput
) {
  deleteBoss(input: $input, condition: $condition) {
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
export const createQuestion = `mutation CreateQuestion(
  $input: CreateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = `mutation UpdateQuestion(
  $input: UpdateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = `mutation DeleteQuestion(
  $input: DeleteQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  deleteQuestion(input: $input, condition: $condition) {
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
export const createSession = `mutation CreateSession(
  $input: CreateSessionInput!
  $condition: ModelSessionConditionInput
) {
  createSession(input: $input, condition: $condition) {
    id
    seenQuestions
    inventory
  }
}
`;
export const updateSession = `mutation UpdateSession(
  $input: UpdateSessionInput!
  $condition: ModelSessionConditionInput
) {
  updateSession(input: $input, condition: $condition) {
    id
    seenQuestions
    inventory
  }
}
`;
export const deleteSession = `mutation DeleteSession(
  $input: DeleteSessionInput!
  $condition: ModelSessionConditionInput
) {
  deleteSession(input: $input, condition: $condition) {
    id
    seenQuestions
    inventory
  }
}
`;
