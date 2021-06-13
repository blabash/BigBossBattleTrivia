import * as AWS from 'aws-sdk';
import 'source-map-support/register';
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
import { Handler, AppSyncResolverEvent } from 'aws-lambda';

type SeenQuestions = {
  [key: string]: { [key: string]: true };
} | null;

type RandomQuestions = {
  id: string;
  updatedAt: string;
  createdAt: string;
  text: string;
  questionBossId: string;
  answers: {
    __typename: 'Answer';
    text: string;
    correct: boolean;
  }[];
}[];

type QuestionsAndIds = {
  newQuestionIds: { [key: string]: true };
  newQuestions: RandomQuestions;
};

function grabNewQuestionsAndTheirIds(
  bossQuestions: RandomQuestions,
  seenQuestionsForBoss: { [key: string]: true },
  numQuestionsForRound: number
): QuestionsAndIds {
  const newQuestionIds: typeof seenQuestionsForBoss = {};
  let newQuestions: typeof bossQuestions = [];
  for (let i = 0; i < numQuestionsForRound; i++) {
    let randomIdx = Math.floor(Math.random() * 1000) % bossQuestions.length;
    let randomQuestionId = bossQuestions[randomIdx].id;

    while (
      (seenQuestionsForBoss[randomQuestionId] ||
        newQuestionIds[randomQuestionId]) &&
      !isNaN(randomIdx)
    ) {
      randomIdx = Math.floor(Math.random() * 1000) % bossQuestions.length;
      randomQuestionId = bossQuestions[randomIdx].id;
      console.log('infinite loop?');
    }

    newQuestionIds[randomQuestionId] = true;
    newQuestions = newQuestions.concat(bossQuestions[randomIdx]);
  }
  return { newQuestionIds, newQuestions };
}

type HandlerEvent = {
  input: {
    bossId: string;
    sessionId: string;
    numQuestionsForRound: number;
  };
};

type HandlerError = {
  __typename: string;
  statusCode: number;
  error: string;
};

type HandlerSuccess = {
  __typename: string;
  newQuestions: RandomQuestions;
};

type HandlerResult = HandlerError | HandlerSuccess;

export const handler: Handler<
  AppSyncResolverEvent<HandlerEvent>,
  HandlerResult
> = async (event) => {
  console.log(`event`, event);
  const bossId = event.arguments.input.bossId;
  console.log(`bossId`, bossId);
  const sessionId = event.arguments.input.sessionId;
  const numQuestionsForRound = event.arguments.input.numQuestionsForRound;

  const questionParams = {
    TableName: 'Question-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
    IndexName: 'gsi-BossQuestions',
    KeyConditionExpression: 'questionBossId = :questionBossId',
    ExpressionAttributeValues: {
      ':questionBossId': bossId,
    },
  };
  const sessionParams = {
    TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
    Key: {
      id: sessionId,
    },
  };

  const questionsPromise = ddb.query(questionParams).promise();
  const sessionPromise = ddb.get(sessionParams).promise();

  try {
    const { Items } = await questionsPromise;
    const { Item } = await sessionPromise;
    const bossQuestions = Items as RandomQuestions;
    const session = Item as {
      __typename: 'Session';
      id: string;
      seenQuestions: SeenQuestions;
    };

    if (!bossQuestions.length || !session) {
      return {
        __typename: 'DdbError',
        statusCode: 400,
        error: 'Missing boss questions or session',
      };
    }

    //initialize seenQuestions for this session
    let seenQuestions = session.seenQuestions || {
      [bossId]: {},
    };

    //check if player will see more than total available questions for this boss
    if (
      Object.keys(seenQuestions[bossId]).length + numQuestionsForRound >
      bossQuestions.length
    ) {
      seenQuestions = {
        ...seenQuestions,
        [bossId]: {}, //reset questions for this boss
      };
    }

    const { newQuestions, newQuestionIds } = grabNewQuestionsAndTheirIds(
      bossQuestions,
      seenQuestions[bossId],
      numQuestionsForRound
    );

    const updatedSeenQuestions = {
      ...seenQuestions,
      [bossId]: {
        ...seenQuestions[bossId],
        ...newQuestionIds,
      },
    };
    const updatedSessionParams = {
      TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
      Item: {
        ...session,
        updatedAt: new Date().toISOString(),
        seenQuestions: updatedSeenQuestions,
      },
    };
    await ddb.put(updatedSessionParams).promise();

    console.log(`newQuestions`, newQuestions);
    return { __typename: 'NewQuestions', newQuestions };
  } catch (error) {
    console.error(error);

    return {
      __typename: 'DdbError',
      statusCode: 500,
      error: error.message,
    };
  }
};
