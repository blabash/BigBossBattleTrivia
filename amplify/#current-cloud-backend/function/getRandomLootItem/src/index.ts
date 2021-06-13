import * as AWS from 'aws-sdk';
import 'source-map-support/register';
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
import { Handler, AppSyncResolverEvent } from 'aws-lambda';

const BossNamesAndIds = {
  ragnarosTheFirelord: 'be6eac33-15dd-4288-96ed-04a1ced2a3b0',
  deathwing: '3271280a-dca4-4637-a1a2-ead56ddc5cb6',
} as const;

type BossIds = typeof BossNamesAndIds[keyof typeof BossNamesAndIds];

type LootItem = {
  id: string;
  name: string;
  bossId: BossIds;
  dropPercentage: number;
  thumbnailUrl: string;
  tooltipUrl: string;
};

type LootTable = {
  [id: string]: LootItem;
};

//generate a uuid online
//enter in by increasing rarity i.e. dropPercentage: 50, 20, 10, 10
export const lootTable: LootTable = {
  '827daafd-d992-4132-8553-e65999ece38a': {
    id: '827daafd-d992-4132-8553-e65999ece38a',
    name: 'Hunter pants',
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 50,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  'b5292c8c-dc77-4641-92d8-647444bc0501': {
    id: 'b5292c8c-dc77-4641-92d8-647444bc0501',
    name: 'Warrior Pants',
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 20,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  'd7b592c0-7c5b-4cf5-b674-71e9e8fde01c': {
    id: 'd7b592c0-7c5b-4cf5-b674-71e9e8fde01c',
    name: "Bonereaver's edge",
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 10,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  'c5ad3a1c-5b0c-4154-8e55-f2ec09becaf7': {
    id: 'c5ad3a1c-5b0c-4154-8e55-f2ec09becaf7',
    name: 'Crown of Destruction',
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 10,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  '5af28474-58b5-4e7f-9a60-e181fe0000b9': {
    id: '5af28474-58b5-4e7f-9a60-e181fe0000b9',
    name: 'Eye of Sulfuras',
    bossId: BossNamesAndIds.ragnarosTheFirelord,
    dropPercentage: 10,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
  'bd5f6736-0711-4b03-9d15-aaef510fa1b9': {
    id: 'bd5f6736-0711-4b03-9d15-aaef510fa1b9',
    name: "Deathwing's butt",
    bossId: BossNamesAndIds.deathwing,
    dropPercentage: 10,
    thumbnailUrl: '/onslaught_hexagon.png',
    tooltipUrl: '/onslaught_hexagon.png',
  },
};

function randomItem(bossId: string, lootTable: LootTable): LootItem {
  let randomRoll = Math.floor(Math.random() * 100);
  const lootItems = Object.values(lootTable).filter(
    (item) => item.bossId === bossId
  );
  for (let item of lootItems) {
    randomRoll = randomRoll - item.dropPercentage;
    if (randomRoll <= 0) return item;
  }
}

type HandlerEvent = {
  input: {
    bossId: string;
    sessionId: string;
  };
};

type HandlerError = {
  __typename: string;
  statusCode: number;
  error: string;
};

type HandlerSuccess = {
  __typename: string;
  lootItem: LootItem;
};

type HandlerResult = HandlerError | HandlerSuccess;

type Inventory = {
  [key: string]: number;
} | null;

type Session = {
  __typename: 'Session';
  id: string;
  inventory: Inventory;
};

export const handler: Handler<
  AppSyncResolverEvent<HandlerEvent>,
  HandlerResult
> = async (event) => {
  console.log(`event`, event);
  const bossId = event.arguments.input.bossId;
  console.log(`bossId`, bossId);
  const sessionId = event.arguments.input.sessionId;

  const sessionParams = {
    TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
    Key: {
      id: sessionId,
    },
  };

  const sessionPromise = ddb.get(sessionParams).promise();

  try {
    const { Item } = await sessionPromise;
    const session = Item as Session;

    //initialize inventory for this session
    let inventory = session.inventory || {};

    const lootItem = randomItem(bossId, lootTable);

    const lootItemId = lootItem.id;

    const updatedInventory = {
      ...inventory,
      [lootItemId]: inventory[lootItemId] ? inventory[lootItemId] + 1 : 1,
    };

    const updatedSessionParams = {
      TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
      Item: {
        ...session,
        updatedAt: new Date().toISOString(),
        inventory: updatedInventory,
      },
    };
    await ddb.put(updatedSessionParams).promise();

    return { __typename: 'LootItemResult', lootItem };
  } catch (error) {
    console.error(error);

    return {
      __typename: 'DdbError',
      statusCode: 500,
      error: error.message,
    };
  }
};
