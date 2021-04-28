export default {
  type: 'object',
  properties: {
    bossId: { type: 'string' },
    sessionId: { type: 'string' },
  },
  required: ['bossId', 'sessionId'],
} as const;
