/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateLevelInput = {
  id?: string | null,
  boss: string,
  background: string,
};

export type ModelLevelConditionInput = {
  boss?: ModelStringInput | null,
  background?: ModelStringInput | null,
  and?: Array< ModelLevelConditionInput | null > | null,
  or?: Array< ModelLevelConditionInput | null > | null,
  not?: ModelLevelConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateLevelInput = {
  id: string,
  boss?: string | null,
  background?: string | null,
};

export type DeleteLevelInput = {
  id?: string | null,
};

export type CreateQuestionInput = {
  id?: string | null,
  text: string,
  questionLevelId?: string | null,
};

export type ModelQuestionConditionInput = {
  text?: ModelStringInput | null,
  and?: Array< ModelQuestionConditionInput | null > | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  not?: ModelQuestionConditionInput | null,
};

export type UpdateQuestionInput = {
  id: string,
  text?: string | null,
  questionLevelId?: string | null,
};

export type DeleteQuestionInput = {
  id?: string | null,
};

export type CreateAnswerInput = {
  id?: string | null,
  text: string,
  correct?: boolean | null,
  answerQuestionId?: string | null,
};

export type ModelAnswerConditionInput = {
  text?: ModelStringInput | null,
  correct?: ModelBooleanInput | null,
  and?: Array< ModelAnswerConditionInput | null > | null,
  or?: Array< ModelAnswerConditionInput | null > | null,
  not?: ModelAnswerConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateAnswerInput = {
  id: string,
  text?: string | null,
  correct?: boolean | null,
  answerQuestionId?: string | null,
};

export type DeleteAnswerInput = {
  id?: string | null,
};

export type ModelLevelFilterInput = {
  id?: ModelIDInput | null,
  boss?: ModelStringInput | null,
  background?: ModelStringInput | null,
  and?: Array< ModelLevelFilterInput | null > | null,
  or?: Array< ModelLevelFilterInput | null > | null,
  not?: ModelLevelFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
};

export type ModelAnswerFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  correct?: ModelBooleanInput | null,
  and?: Array< ModelAnswerFilterInput | null > | null,
  or?: Array< ModelAnswerFilterInput | null > | null,
  not?: ModelAnswerFilterInput | null,
};

export type CreateLevelMutationVariables = {
  input: CreateLevelInput,
  condition?: ModelLevelConditionInput | null,
};

export type CreateLevelMutation = {
  createLevel:  {
    __typename: "Level",
    id: string,
    boss: string,
    background: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        text: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateLevelMutationVariables = {
  input: UpdateLevelInput,
  condition?: ModelLevelConditionInput | null,
};

export type UpdateLevelMutation = {
  updateLevel:  {
    __typename: "Level",
    id: string,
    boss: string,
    background: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        text: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteLevelMutationVariables = {
  input: DeleteLevelInput,
  condition?: ModelLevelConditionInput | null,
};

export type DeleteLevelMutation = {
  deleteLevel:  {
    __typename: "Level",
    id: string,
    boss: string,
    background: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        text: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateQuestionMutationVariables = {
  input: CreateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type CreateQuestionMutation = {
  createQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    level:  {
      __typename: "Level",
      id: string,
      boss: string,
      background: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answers:  {
      __typename: "ModelAnswerConnection",
      items:  Array< {
        __typename: "Answer",
        id: string,
        text: string,
        correct: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateQuestionMutationVariables = {
  input: UpdateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type UpdateQuestionMutation = {
  updateQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    level:  {
      __typename: "Level",
      id: string,
      boss: string,
      background: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answers:  {
      __typename: "ModelAnswerConnection",
      items:  Array< {
        __typename: "Answer",
        id: string,
        text: string,
        correct: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteQuestionMutationVariables = {
  input: DeleteQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type DeleteQuestionMutation = {
  deleteQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    level:  {
      __typename: "Level",
      id: string,
      boss: string,
      background: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answers:  {
      __typename: "ModelAnswerConnection",
      items:  Array< {
        __typename: "Answer",
        id: string,
        text: string,
        correct: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateAnswerMutationVariables = {
  input: CreateAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type CreateAnswerMutation = {
  createAnswer:  {
    __typename: "Answer",
    id: string,
    text: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      level:  {
        __typename: "Level",
        id: string,
        boss: string,
        background: string,
      } | null,
      answers:  {
        __typename: "ModelAnswerConnection",
        nextToken: string | null,
      } | null,
    } | null,
    correct: boolean | null,
  } | null,
};

export type UpdateAnswerMutationVariables = {
  input: UpdateAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type UpdateAnswerMutation = {
  updateAnswer:  {
    __typename: "Answer",
    id: string,
    text: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      level:  {
        __typename: "Level",
        id: string,
        boss: string,
        background: string,
      } | null,
      answers:  {
        __typename: "ModelAnswerConnection",
        nextToken: string | null,
      } | null,
    } | null,
    correct: boolean | null,
  } | null,
};

export type DeleteAnswerMutationVariables = {
  input: DeleteAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type DeleteAnswerMutation = {
  deleteAnswer:  {
    __typename: "Answer",
    id: string,
    text: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      level:  {
        __typename: "Level",
        id: string,
        boss: string,
        background: string,
      } | null,
      answers:  {
        __typename: "ModelAnswerConnection",
        nextToken: string | null,
      } | null,
    } | null,
    correct: boolean | null,
  } | null,
};

export type GetLevelQueryVariables = {
  id: string,
};

export type GetLevelQuery = {
  getLevel:  {
    __typename: "Level",
    id: string,
    boss: string,
    background: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        text: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListLevelsQueryVariables = {
  filter?: ModelLevelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLevelsQuery = {
  listLevels:  {
    __typename: "ModelLevelConnection",
    items:  Array< {
      __typename: "Level",
      id: string,
      boss: string,
      background: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetQuestionQueryVariables = {
  id: string,
};

export type GetQuestionQuery = {
  getQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    level:  {
      __typename: "Level",
      id: string,
      boss: string,
      background: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answers:  {
      __typename: "ModelAnswerConnection",
      items:  Array< {
        __typename: "Answer",
        id: string,
        text: string,
        correct: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsQuery = {
  listQuestions:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      level:  {
        __typename: "Level",
        id: string,
        boss: string,
        background: string,
      } | null,
      answers:  {
        __typename: "ModelAnswerConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAnswerQueryVariables = {
  id: string,
};

export type GetAnswerQuery = {
  getAnswer:  {
    __typename: "Answer",
    id: string,
    text: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      level:  {
        __typename: "Level",
        id: string,
        boss: string,
        background: string,
      } | null,
      answers:  {
        __typename: "ModelAnswerConnection",
        nextToken: string | null,
      } | null,
    } | null,
    correct: boolean | null,
  } | null,
};

export type ListAnswersQueryVariables = {
  filter?: ModelAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAnswersQuery = {
  listAnswers:  {
    __typename: "ModelAnswerConnection",
    items:  Array< {
      __typename: "Answer",
      id: string,
      text: string,
      question:  {
        __typename: "Question",
        id: string,
        text: string,
      } | null,
      correct: boolean | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateLevelSubscription = {
  onCreateLevel:  {
    __typename: "Level",
    id: string,
    boss: string,
    background: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        text: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateLevelSubscription = {
  onUpdateLevel:  {
    __typename: "Level",
    id: string,
    boss: string,
    background: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        text: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteLevelSubscription = {
  onDeleteLevel:  {
    __typename: "Level",
    id: string,
    boss: string,
    background: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      items:  Array< {
        __typename: "Question",
        id: string,
        text: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    level:  {
      __typename: "Level",
      id: string,
      boss: string,
      background: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answers:  {
      __typename: "ModelAnswerConnection",
      items:  Array< {
        __typename: "Answer",
        id: string,
        text: string,
        correct: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    level:  {
      __typename: "Level",
      id: string,
      boss: string,
      background: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answers:  {
      __typename: "ModelAnswerConnection",
      items:  Array< {
        __typename: "Answer",
        id: string,
        text: string,
        correct: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    level:  {
      __typename: "Level",
      id: string,
      boss: string,
      background: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answers:  {
      __typename: "ModelAnswerConnection",
      items:  Array< {
        __typename: "Answer",
        id: string,
        text: string,
        correct: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateAnswerSubscription = {
  onCreateAnswer:  {
    __typename: "Answer",
    id: string,
    text: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      level:  {
        __typename: "Level",
        id: string,
        boss: string,
        background: string,
      } | null,
      answers:  {
        __typename: "ModelAnswerConnection",
        nextToken: string | null,
      } | null,
    } | null,
    correct: boolean | null,
  } | null,
};

export type OnUpdateAnswerSubscription = {
  onUpdateAnswer:  {
    __typename: "Answer",
    id: string,
    text: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      level:  {
        __typename: "Level",
        id: string,
        boss: string,
        background: string,
      } | null,
      answers:  {
        __typename: "ModelAnswerConnection",
        nextToken: string | null,
      } | null,
    } | null,
    correct: boolean | null,
  } | null,
};

export type OnDeleteAnswerSubscription = {
  onDeleteAnswer:  {
    __typename: "Answer",
    id: string,
    text: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      level:  {
        __typename: "Level",
        id: string,
        boss: string,
        background: string,
      } | null,
      answers:  {
        __typename: "ModelAnswerConnection",
        nextToken: string | null,
      } | null,
    } | null,
    correct: boolean | null,
  } | null,
};
