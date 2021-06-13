"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = exports.lootTable = void 0;
var AWS = require("aws-sdk");
require("source-map-support/register");
var ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
var BossNamesAndIds = {
    ragnarosTheFirelord: 'be6eac33-15dd-4288-96ed-04a1ced2a3b0',
    deathwing: '3271280a-dca4-4637-a1a2-ead56ddc5cb6'
};
//generate a uuid online
//enter in by increasing rarity i.e. dropPercentage: 50, 20, 10, 10
exports.lootTable = {
    '827daafd-d992-4132-8553-e65999ece38a': {
        id: '827daafd-d992-4132-8553-e65999ece38a',
        name: 'Hunter pants',
        bossId: BossNamesAndIds.ragnarosTheFirelord,
        dropPercentage: 50,
        thumbnailUrl: '/onslaught_hexagon.png',
        tooltipUrl: '/onslaught_hexagon.png'
    },
    'b5292c8c-dc77-4641-92d8-647444bc0501': {
        id: 'b5292c8c-dc77-4641-92d8-647444bc0501',
        name: 'Warrior Pants',
        bossId: BossNamesAndIds.ragnarosTheFirelord,
        dropPercentage: 20,
        thumbnailUrl: '/onslaught_hexagon.png',
        tooltipUrl: '/onslaught_hexagon.png'
    },
    'd7b592c0-7c5b-4cf5-b674-71e9e8fde01c': {
        id: 'd7b592c0-7c5b-4cf5-b674-71e9e8fde01c',
        name: "Bonereaver's edge",
        bossId: BossNamesAndIds.ragnarosTheFirelord,
        dropPercentage: 10,
        thumbnailUrl: '/onslaught_hexagon.png',
        tooltipUrl: '/onslaught_hexagon.png'
    },
    'c5ad3a1c-5b0c-4154-8e55-f2ec09becaf7': {
        id: 'c5ad3a1c-5b0c-4154-8e55-f2ec09becaf7',
        name: 'Crown of Destruction',
        bossId: BossNamesAndIds.ragnarosTheFirelord,
        dropPercentage: 10,
        thumbnailUrl: '/onslaught_hexagon.png',
        tooltipUrl: '/onslaught_hexagon.png'
    },
    '5af28474-58b5-4e7f-9a60-e181fe0000b9': {
        id: '5af28474-58b5-4e7f-9a60-e181fe0000b9',
        name: 'Eye of Sulfuras',
        bossId: BossNamesAndIds.ragnarosTheFirelord,
        dropPercentage: 10,
        thumbnailUrl: '/onslaught_hexagon.png',
        tooltipUrl: '/onslaught_hexagon.png'
    },
    'bd5f6736-0711-4b03-9d15-aaef510fa1b9': {
        id: 'bd5f6736-0711-4b03-9d15-aaef510fa1b9',
        name: "Deathwing's butt",
        bossId: BossNamesAndIds.deathwing,
        dropPercentage: 10,
        thumbnailUrl: '/onslaught_hexagon.png',
        tooltipUrl: '/onslaught_hexagon.png'
    }
};
function randomItem(bossId, lootTable) {
    var randomRoll = Math.floor(Math.random() * 100);
    var lootItems = Object.values(lootTable).filter(function (item) { return item.bossId === bossId; });
    for (var _i = 0, lootItems_1 = lootItems; _i < lootItems_1.length; _i++) {
        var item = lootItems_1[_i];
        randomRoll = randomRoll - item.dropPercentage;
        if (randomRoll <= 0)
            return item;
    }
}
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var bossId, sessionId, sessionParams, sessionPromise, Item, session, inventory, lootItem, lootItemId, updatedInventory, updatedSessionParams, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("event", event);
                bossId = event.arguments.input.bossId;
                console.log("bossId", bossId);
                sessionId = event.arguments.input.sessionId;
                sessionParams = {
                    TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
                    Key: {
                        id: sessionId
                    }
                };
                sessionPromise = ddb.get(sessionParams).promise();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, sessionPromise];
            case 2:
                Item = (_b.sent()).Item;
                session = Item;
                inventory = session.inventory || {};
                lootItem = randomItem(bossId, exports.lootTable);
                lootItemId = lootItem.id;
                updatedInventory = __assign(__assign({}, inventory), (_a = {}, _a[lootItemId] = inventory[lootItemId] ? inventory[lootItemId] + 1 : 1, _a));
                updatedSessionParams = {
                    TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
                    Item: __assign(__assign({}, session), { updatedAt: new Date().toISOString(), inventory: updatedInventory })
                };
                return [4 /*yield*/, ddb.put(updatedSessionParams).promise()];
            case 3:
                _b.sent();
                return [2 /*return*/, { __typename: 'LootItemResult', lootItem: lootItem }];
            case 4:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, {
                        __typename: 'DdbError',
                        statusCode: 500,
                        error: error_1.message
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
