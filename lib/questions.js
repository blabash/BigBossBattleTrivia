const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

exports.handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const { sessionId, bossId } = requestBody;

  const questionParams = {
    TableName: 'Question-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
    IndexName: 'gsi-BossQuestions',
    KeyConditionExpression: 'questionBossId = :questionBossId',
    ExpressionAttributeValues: {
      ':questionBossId': bossId,
    },
    // ProjectionExpression: 'seenQuestions',
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
    const { Items: bossQuestions } = await questionsPromise;
    console.log(`bossQuestions`, bossQuestions);
    const { Item: session } = await sessionPromise;
    console.log('session:', session);
    if (!bossQuestions.length || !session) {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing boss questions or session',
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const seenQuestions = session.seenQuestions || {
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

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        question: bossQuestions[randomIdx],
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error(error);
    errorResponse(error.message, context.awsRequestId, callback);
  }
};

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// import AWS from 'aws-sdk';
// import { APIGatewayEvent } from 'aws-lambda';

// const ddb = new AWS.DynamoDB.DocumentClient();

// exports.handler = async (event: APIGatewayEvent): Promise<any> => {
//   const requestBody: { sessionId: string; bossId: string } = JSON.parse(
//     event.body
//   );
//   const { sessionId, bossId } = requestBody;

//   var params = {
//     TableName: 'Question-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
//     KeyConditionExpression: 'QuestionBossId = :questionBossId',
//     ExpressionAttributeValues: {
//       ':questionBossId': `${bossId}`,
//     },
//     // ProjectionExpression: 'seenQuestions',
//   };

//   ddb.query(params, (err, data) => {
//     if (err) {
//       console.log('Error', err);
//     } else {
//       console.log('Success: ', data.Items);
//     }
//   });
// };
