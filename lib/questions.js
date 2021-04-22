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
  const questionsPromise = ddb.query(questionParams).promise();

  const sessionParams = {
    TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
    Key: {
      id: sessionId,
    },
  };
  const sessionPromise = ddb.get(sessionParams).promise();

  const { Items: questions } = await questionsPromise;
  const { Item: sessionRecord } = await sessionPromise;
  console.log('sessionRecord:', sessionRecord);

  const { seenQuestions } = sessionRecord;

  const questionsLength = questions.length;

  let randomIdx = Math.floor(Math.random() * 1000) % questionsLength;

  let randomQuestionId = questions[randomIdx].id;
  while (seenQuestions[randomQuestionId] && !isNaN(randomIdx)) {
    randomIdx = Math.floor(Math.random() * 1000) % questionsLength;
    randomQuestionId = questions[randomIdx].id;
    console.log('infinite loop?');
  }

  const updatedSeenQuestions = {
    ...seenQuestions,
    [randomQuestionId]: true,
  };

  const updatedSessionParams = {
    TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
    Item: {
      seenQuestions: updatedSeenQuestions,
      id: sessionId,
    },
  };

  await ddb.put(updatedSessionParams).promise();
};

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
