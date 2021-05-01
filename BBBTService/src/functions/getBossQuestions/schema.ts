export default {
  type: 'object',
  properties: {
    bossId: { type: 'string' },
    sessionId: { type: 'string' },
    numQuestionsForRound: { type: 'number' },
  },
  required: ['bossId', 'sessionId', 'numQuestionsForRound'],
} as const;
