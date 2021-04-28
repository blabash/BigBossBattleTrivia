import 'source-map-support/register';
import * as AWS from 'aws-sdk';
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
import { ListQuestionsQuery } from '../../../../src/API';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getBossQuestion: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event, context) => {
  const bossId = event.body.bossId;
  const sessionId = event.body.sessionId;
  console.log(`bossId`, bossId);
  console.log(`sessionId`, sessionId);

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
    // const { Items: bossQuestions } = await questionsPromise;
    // const { Item: session } = await sessionPromise;
    const { Items } = await questionsPromise;
    const { Item } = await sessionPromise;
    console.log(`Item`, Item);
    const bossQuestions = Items as ListQuestionsQuery['listQuestions']['items'];
    const session = Item as {
      __typename: 'Session';
      id: string;
      seenQuestions: { [key: string]: { [key: string]: boolean } } | null;
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

    let seenQuestions = session.seenQuestions || {
      [bossId]: {},
    };

    const bossQuestionsLength = bossQuestions.length;

    if (bossQuestionsLength === Object.keys(seenQuestions[bossId]).length) {
      seenQuestions = {
        ...seenQuestions,
        [bossId]: {},
      };
    }

    let randomIdx = Math.floor(Math.random() * 1000) % bossQuestionsLength;
    let randomQuestionId = bossQuestions[randomIdx].id;
    while (seenQuestions[bossId][randomQuestionId] && !isNaN(randomIdx)) {
      randomIdx = Math.floor(Math.random() * 1000) % bossQuestionsLength;
      randomQuestionId = bossQuestions[randomIdx].id;
      console.log('infinite loop?');
    }

    const updatedSeenQuestions = {
      ...seenQuestions,
      [bossId]: {
        ...seenQuestions[bossId],
        [randomQuestionId]: true,
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
      body: JSON.stringify({
        question: bossQuestions[randomIdx],
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        Error: error.message,
        Reference: context.awsRequestId,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};

export const main = middyfy(getBossQuestion);
