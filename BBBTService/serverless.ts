import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getBossQuestion from '@functions/getBossQuestion';

const serverlessConfiguration: AWS = {
  service: 'bbbtservice',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'serverlessUser',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
        Resource: ['${opt:questionTableWithGsiArn}', '${opt:sessionTableArn}'],
      },
    ],
  },
  // import the function via paths
  functions: { hello, getBossQuestion },
};

module.exports = serverlessConfiguration;