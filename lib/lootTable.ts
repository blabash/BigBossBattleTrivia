const BossNamesAndIds = {
  ragnarosTheFirelord: 'be6eac33-15dd-4288-96ed-04a1ced2a3b0',
  deathwing: '3271280a-dca4-4637-a1a2-ead56ddc5cb6',
} as const;

type BossIds = typeof BossNamesAndIds[keyof typeof BossNamesAndIds];

type LootTable = {
  [itemId: string]: {
    itemId: string;
    name: string;
    bossId: BossIds;
    dropPercentage: number;
    thumbnailUrl: string;
    tooltipUrl: string;
  };
};

//generate a uuid online
export const lootTable: LootTable = {
  '827daafd-d992-4132-8553-e65999ece38a': {
    itemId: '827daafd-d992-4132-8553-e65999ece38a',
    name: 'Hunter pants',
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 50,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  'b5292c8c-dc77-4641-92d8-647444bc0501': {
    itemId: 'b5292c8c-dc77-4641-92d8-647444bc0501',
    name: 'Warrior Pants',
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 20,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  'd7b592c0-7c5b-4cf5-b674-71e9e8fde01c': {
    itemId: 'd7b592c0-7c5b-4cf5-b674-71e9e8fde01c',
    name: "Bonereaver's edge",
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 10,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  'c5ad3a1c-5b0c-4154-8e55-f2ec09becaf7': {
    itemId: 'c5ad3a1c-5b0c-4154-8e55-f2ec09becaf7',
    name: 'Crown of Destruction',
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 10,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  '5af28474-58b5-4e7f-9a60-e181fe0000b9': {
    itemId: '5af28474-58b5-4e7f-9a60-e181fe0000b9',
    name: 'Eye of Sulfuras',
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 10,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
};

// [key in BossIds]: {}
