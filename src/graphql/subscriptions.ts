// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateBoss = `subscription OnCreateBoss {
  onCreateBoss {
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
export const onUpdateBoss = `subscription OnUpdateBoss {
  onUpdateBoss {
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
export const onDeleteBoss = `subscription OnDeleteBoss {
  onDeleteBoss {
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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
export const onCreateAnswer = `subscription OnCreateAnswer {
  onCreateAnswer {
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
export const onUpdateAnswer = `subscription OnUpdateAnswer {
  onUpdateAnswer {
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
export const onDeleteAnswer = `subscription OnDeleteAnswer {
  onDeleteAnswer {
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
