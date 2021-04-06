// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateLevel = `subscription OnCreateLevel {
  onCreateLevel {
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
export const onUpdateLevel = `subscription OnUpdateLevel {
  onUpdateLevel {
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
export const onDeleteLevel = `subscription OnDeleteLevel {
  onDeleteLevel {
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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
export const onCreateAnswer = `subscription OnCreateAnswer {
  onCreateAnswer {
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
export const onUpdateAnswer = `subscription OnUpdateAnswer {
  onUpdateAnswer {
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
export const onDeleteAnswer = `subscription OnDeleteAnswer {
  onDeleteAnswer {
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
