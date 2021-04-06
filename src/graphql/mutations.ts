// tslint:disable
// this is an auto generated file. This will be overwritten

export const createLevel = `mutation CreateLevel(
  $input: CreateLevelInput!
  $condition: ModelLevelConditionInput
) {
  createLevel(input: $input, condition: $condition) {
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
export const updateLevel = `mutation UpdateLevel(
  $input: UpdateLevelInput!
  $condition: ModelLevelConditionInput
) {
  updateLevel(input: $input, condition: $condition) {
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
export const deleteLevel = `mutation DeleteLevel(
  $input: DeleteLevelInput!
  $condition: ModelLevelConditionInput
) {
  deleteLevel(input: $input, condition: $condition) {
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
export const createQuestion = `mutation CreateQuestion(
  $input: CreateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = `mutation UpdateQuestion(
  $input: UpdateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = `mutation DeleteQuestion(
  $input: DeleteQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  deleteQuestion(input: $input, condition: $condition) {
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
