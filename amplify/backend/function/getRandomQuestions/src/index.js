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
exports.handler = void 0;
var AWS = require("aws-sdk");
require("source-map-support/register");
var ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
function grabNewQuestionsAndTheirIds(bossQuestions, seenQuestionsForBoss, numQuestionsForRound) {
    var newQuestionIds = {};
    var newQuestions = [];
    for (var i = 0; i < numQuestionsForRound; i++) {
        var randomIdx = Math.floor(Math.random() * 1000) % bossQuestions.length;
        var randomQuestionId = bossQuestions[randomIdx].id;
        while ((seenQuestionsForBoss[randomQuestionId] ||
            newQuestionIds[randomQuestionId]) &&
            !isNaN(randomIdx)) {
            randomIdx = Math.floor(Math.random() * 1000) % bossQuestions.length;
            randomQuestionId = bossQuestions[randomIdx].id;
            console.log('infinite loop?');
        }
        newQuestionIds[randomQuestionId] = true;
        newQuestions = newQuestions.concat(bossQuestions[randomIdx]);
    }
    return { newQuestionIds: newQuestionIds, newQuestions: newQuestions };
}
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var bossId, sessionId, numQuestionsForRound, questionParams, sessionParams, questionsPromise, sessionPromise, Items, Item, bossQuestions, session, seenQuestions, _a, newQuestions, newQuestionIds, updatedSeenQuestions, updatedSessionParams, error_1;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                console.log("event", event);
                bossId = event.arguments.input.bossId;
                console.log("bossId", bossId);
                sessionId = event.arguments.input.sessionId;
                numQuestionsForRound = event.arguments.input.numQuestionsForRound;
                questionParams = {
                    TableName: 'Question-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
                    IndexName: 'gsi-BossQuestions',
                    KeyConditionExpression: 'questionBossId = :questionBossId',
                    ExpressionAttributeValues: {
                        ':questionBossId': bossId
                    }
                };
                sessionParams = {
                    TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
                    Key: {
                        id: sessionId
                    }
                };
                questionsPromise = ddb.query(questionParams).promise();
                sessionPromise = ddb.get(sessionParams).promise();
                _e.label = 1;
            case 1:
                _e.trys.push([1, 5, , 6]);
                return [4 /*yield*/, questionsPromise];
            case 2:
                Items = (_e.sent()).Items;
                return [4 /*yield*/, sessionPromise];
            case 3:
                Item = (_e.sent()).Item;
                bossQuestions = Items;
                session = Item;
                if (!bossQuestions.length || !session) {
                    return [2 /*return*/, {
                            __typename: 'DdbError',
                            statusCode: 400,
                            error: 'Missing boss questions or session'
                        }];
                }
                seenQuestions = session.seenQuestions || (_b = {},
                    _b[bossId] = {},
                    _b);
                //check if player will see more than total available questions for this boss
                if (Object.keys(seenQuestions[bossId]).length + numQuestionsForRound >
                    bossQuestions.length) {
                    seenQuestions = __assign(__assign({}, seenQuestions), (_c = {}, _c[bossId] = {}, _c));
                }
                _a = grabNewQuestionsAndTheirIds(bossQuestions, seenQuestions[bossId], numQuestionsForRound), newQuestions = _a.newQuestions, newQuestionIds = _a.newQuestionIds;
                updatedSeenQuestions = __assign(__assign({}, seenQuestions), (_d = {}, _d[bossId] = __assign(__assign({}, seenQuestions[bossId]), newQuestionIds), _d));
                updatedSessionParams = {
                    TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',
                    Item: __assign(__assign({}, session), { updatedAt: new Date().toISOString(), seenQuestions: updatedSeenQuestions })
                };
                return [4 /*yield*/, ddb.put(updatedSessionParams).promise()];
            case 4:
                _e.sent();
                console.log("newQuestions", newQuestions);
                return [2 /*return*/, { __typename: 'NewQuestions', newQuestions: newQuestions }];
            case 5:
                error_1 = _e.sent();
                console.error(error_1);
                return [2 /*return*/, {
                        __typename: 'DdbError',
                        statusCode: 500,
                        error: error_1.message
                    }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
