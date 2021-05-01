import 'source-map-support/register';
import * as AWS from 'aws-sdk';
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
import { ListQuestionsQuery } from '../../../../src/API';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

type SeenQuestions = {
  [key: string]: { [key: string]: true };
} | null;

type BossQuestions = ListQuestionsQuery['listQuestions']['items'];

interface QuestionsAndIds {
  newQuestionIds: { [key: string]: true };
  newQuestions: BossQuestions;
}

function grabNewQuestionsAndTheirIds(
  bossQuestions: BossQuestions,
  seenQuestionsForBoss: { [key: string]: true },
  numQuestionsForRound: number
): QuestionsAndIds {
  const newQuestionIds: { [key: string]: true } = {};
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
  console.log(`newQuestions`, newQuestions);
  return { newQuestionIds, newQuestions };
}

const getBossQuestions: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event, context) => {
  const bossId = event.body.bossId;
  const sessionId = event.body.sessionId;
  const numQuestionsForRound = event.body.numQuestionsForRound;

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
    const bossQuestions = Items as BossQuestions;
    const session = Item as {
      __typename: 'Session';
      id: string;
      seenQuestions: SeenQuestions;
    };

    if (!bossQuestions.length || !session) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing boss questions or session',
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    //initialize seenQuestions for this session
    let seenQuestions = session.seenQuestions || {
      [bossId]: {},
    };

    const totalBossQuestions = bossQuestions.length;
    const numSeenQuestions = Object.keys(seenQuestions[bossId]).length;
    //check if player will see more than total available questions for this boss
    if (numSeenQuestions + numQuestionsForRound > totalBossQuestions) {
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

    return {
      statusCode: 200,
      body: JSON.stringify({ newQuestions }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        reference: context.awsRequestId,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};

export const main = middyfy(getBossQuestions);
