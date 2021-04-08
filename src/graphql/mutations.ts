// tslint:disable
// this is an auto generated file. This will be overwritten

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
export const createAnswer = `mutation CreateAnswer(
  $input: CreateAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  createAnswer(input: $input, condition: $condition) {
    id
    text
    question {
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
        nextToken
      }
    }
    correct
  }
}
`;
export const updateAnswer = `mutation UpdateAnswer(
  $input: UpdateAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  updateAnswer(input: $input, condition: $condition) {
    id
    text
    question {
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
        nextToken
      }
    }
    correct
  }
}
`;
export const deleteAnswer = `mutation DeleteAnswer(
  $input: DeleteAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  deleteAnswer(input: $input, condition: $condition) {
    id
    text
    question {
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
        nextToken
      }
    }
    correct
  }
}
`;
