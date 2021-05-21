/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type GetRandomQuestionsInput = {
  bossId: string,
  sessionId: string,
  numQuestionsForRound: number,
};

export type GetRandomLootItemInput = {
  bossId: string,
  sessionId: string,
};

export type CreateBossInput = {
  id?: string | null,
  name: string,
  slug: string,
  bossImgUrl?: string | null,
  background?: string | null,
};

export type ModelBossConditionInput = {
  name?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  bossImgUrl?: ModelStringInput | null,
  background?: ModelStringInput | null,
  and?: Array< ModelBossConditionInput | null > | null,
  or?: Array< ModelBossConditionInput | null > | null,
  not?: ModelBossConditionInput | null,
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

export type UpdateBossInput = {
  id: string,
  name?: string | null,
  slug?: string | null,
  bossImgUrl?: string | null,
  background?: string | null,
};

export type DeleteBossInput = {
  id?: string | null,
};

export type CreateQuestionInput = {
  id?: string | null,
  text: string,
  answers: Array< AnswerInput >,
  questionBossId: string,
};

export type AnswerInput = {
  text: string,
  correct: boolean,
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
  answers?: Array< AnswerInput > | null,
  questionBossId?: string | null,
};

export type DeleteQuestionInput = {
  id?: string | null,
};

export type CreateSessionInput = {
  id?: string | null,
  seenQuestions?: string | null,
  inventory?: string | null,
};

export type ModelSessionConditionInput = {
  seenQuestions?: ModelStringInput | null,
  inventory?: ModelStringInput | null,
  and?: Array< ModelSessionConditionInput | null > | null,
  or?: Array< ModelSessionConditionInput | null > | null,
  not?: ModelSessionConditionInput | null,
};

export type UpdateSessionInput = {
  id: string,
  seenQuestions?: string | null,
  inventory?: string | null,
};

export type DeleteSessionInput = {
  id?: string | null,
};

export type ModelBossFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  bossImgUrl?: ModelStringInput | null,
  background?: ModelStringInput | null,
  and?: Array< ModelBossFilterInput | null > | null,
  or?: Array< ModelBossFilterInput | null > | null,
  not?: ModelBossFilterInput | null,
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

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null,
  seenQuestions?: ModelStringInput | null,
  inventory?: ModelStringInput | null,
  and?: Array< ModelSessionFilterInput | null > | null,
  or?: Array< ModelSessionFilterInput | null > | null,
  not?: ModelSessionFilterInput | null,
};

export type GetRandomQuestionsMutationVariables = {
  input: GetRandomQuestionsInput,
};

export type GetRandomQuestionsMutation = {
  getRandomQuestions: ( {
      __typename: "DdbError",
      statusCode: number | null,
      error: string | null,
    } | {
      __typename: "NewQuestions",
      newQuestions:  Array< {
        __typename: string,
        updatedAt: string | null,
        createdAt: string | null,
        answers:  Array< {
          __typename: string,
          text: string,
          correct: boolean,
        } | null > | null,
        text: string | null,
        id: string | null,
        questionBossId: string | null,
      } | null > | null,
    }
  ) | null,
};

export type GetRandomLootItemMutationVariables = {
  input: GetRandomLootItemInput,
};

export type GetRandomLootItemMutation = {
  getRandomLootItem: ( {
      __typename: "DdbError",
      statusCode: number | null,
      error: string | null,
    } | {
      __typename: "LootItemResult",
      lootItem:  {
        __typename: string,
        id: string | null,
        name: string | null,
        thumbnailUrl: string | null,
        tooltipUrl: string | null,
      } | null,
    }
  ) | null,
};

export type CreateBossMutationVariables = {
  input: CreateBossInput,
  condition?: ModelBossConditionInput | null,
};

export type CreateBossMutation = {
  createBoss:  {
    __typename: "Boss",
    id: string,
    name: string,
    slug: string,
    bossImgUrl: string | null,
    background: string | null,
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

export type UpdateBossMutationVariables = {
  input: UpdateBossInput,
  condition?: ModelBossConditionInput | null,
};

export type UpdateBossMutation = {
  updateBoss:  {
    __typename: "Boss",
    id: string,
    name: string,
    slug: string,
    bossImgUrl: string | null,
    background: string | null,
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

export type DeleteBossMutationVariables = {
  input: DeleteBossInput,
  condition?: ModelBossConditionInput | null,
};

export type DeleteBossMutation = {
  deleteBoss:  {
    __typename: "Boss",
    id: string,
    name: string,
    slug: string,
    bossImgUrl: string | null,
    background: string | null,
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
    boss:  {
      __typename: "Boss",
      id: string,
      name: string,
      slug: string,
      bossImgUrl: string | null,
      background: string | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    },
    answers:  Array< {
      __typename: "Answer",
      text: string,
      correct: boolean,
    } >,
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
    boss:  {
      __typename: "Boss",
      id: string,
      name: string,
      slug: string,
      bossImgUrl: string | null,
      background: string | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    },
    answers:  Array< {
      __typename: "Answer",
      text: string,
      correct: boolean,
    } >,
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
    boss:  {
      __typename: "Boss",
      id: string,
      name: string,
      slug: string,
      bossImgUrl: string | null,
      background: string | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    },
    answers:  Array< {
      __typename: "Answer",
      text: string,
      correct: boolean,
    } >,
  } | null,
};

export type CreateSessionMutationVariables = {
  input: CreateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type CreateSessionMutation = {
  createSession:  {
    __typename: "Session",
    id: string,
    seenQuestions: string | null,
    inventory: string | null,
  } | null,
};

export type UpdateSessionMutationVariables = {
  input: UpdateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type UpdateSessionMutation = {
  updateSession:  {
    __typename: "Session",
    id: string,
    seenQuestions: string | null,
    inventory: string | null,
  } | null,
};

export type DeleteSessionMutationVariables = {
  input: DeleteSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type DeleteSessionMutation = {
  deleteSession:  {
    __typename: "Session",
    id: string,
    seenQuestions: string | null,
    inventory: string | null,
  } | null,
};

export type GetBossQueryVariables = {
  id: string,
};

export type GetBossQuery = {
  getBoss:  {
    __typename: "Boss",
    id: string,
    name: string,
    slug: string,
    bossImgUrl: string | null,
    background: string | null,
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

export type ListBosssQueryVariables = {
  filter?: ModelBossFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBosssQuery = {
  listBosss:  {
    __typename: "ModelBossConnection",
    items:  Array< {
      __typename: "Boss",
      id: string,
      name: string,
      slug: string,
      bossImgUrl: string | null,
      background: string | null,
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
    boss:  {
      __typename: "Boss",
      id: string,
      name: string,
      slug: string,
      bossImgUrl: string | null,
      background: string | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    },
    answers:  Array< {
      __typename: "Answer",
      text: string,
      correct: boolean,
    } >,
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
      boss:  {
        __typename: "Boss",
        id: string,
        name: string,
        slug: string,
        bossImgUrl: string | null,
        background: string | null,
      },
      answers:  Array< {
        __typename: "Answer",
        text: string,
        correct: boolean,
      } >,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSessionQueryVariables = {
  id: string,
};

export type GetSessionQuery = {
  getSession:  {
    __typename: "Session",
    id: string,
    seenQuestions: string | null,
    inventory: string | null,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      seenQuestions: string | null,
      inventory: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateBossSubscription = {
  onCreateBoss:  {
    __typename: "Boss",
    id: string,
    name: string,
    slug: string,
    bossImgUrl: string | null,
    background: string | null,
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

export type OnUpdateBossSubscription = {
  onUpdateBoss:  {
    __typename: "Boss",
    id: string,
    name: string,
    slug: string,
    bossImgUrl: string | null,
    background: string | null,
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

export type OnDeleteBossSubscription = {
  onDeleteBoss:  {
    __typename: "Boss",
    id: string,
    name: string,
    slug: string,
    bossImgUrl: string | null,
    background: string | null,
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
    boss:  {
      __typename: "Boss",
      id: string,
      name: string,
      slug: string,
      bossImgUrl: string | null,
      background: string | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    },
    answers:  Array< {
      __typename: "Answer",
      text: string,
      correct: boolean,
    } >,
  } | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    boss:  {
      __typename: "Boss",
      id: string,
      name: string,
      slug: string,
      bossImgUrl: string | null,
      background: string | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    },
    answers:  Array< {
      __typename: "Answer",
      text: string,
      correct: boolean,
    } >,
  } | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    boss:  {
      __typename: "Boss",
      id: string,
      name: string,
      slug: string,
      bossImgUrl: string | null,
      background: string | null,
      questions:  {
        __typename: "ModelQuestionConnection",
        nextToken: string | null,
      } | null,
    },
    answers:  Array< {
      __typename: "Answer",
      text: string,
      correct: boolean,
    } >,
  } | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession:  {
    __typename: "Session",
    id: string,
    seenQuestions: string | null,
    inventory: string | null,
  } | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession:  {
    __typename: "Session",
    id: string,
    seenQuestions: string | null,
    inventory: string | null,
  } | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession:  {
    __typename: "Session",
    id: string,
    seenQuestions: string | null,
    inventory: string | null,
  } | null,
};
