(()=>{"use strict";var e={444:(e,s,o)=>{o.d(s,{z:()=>a});var r=o(806),t=o.n(r),n=o(657),i=o.n(n);const a=e=>t()(e).use(i()())},806:e=>{e.exports=require("@middy/core")},657:e=>{e.exports=require("@middy/http-json-body-parser")},480:e=>{e.exports=require("aws-sdk")},43:e=>{e.exports=require("source-map-support/register")}},s={};function o(r){var t=s[r];if(void 0!==t)return t.exports;var n=s[r]={exports:{}};return e[r](n,n.exports,o),n.exports}o.n=e=>{var s=e&&e.__esModule?()=>e.default:()=>e;return o.d(s,{a:s}),s},o.d=(e,s)=>{for(var r in s)o.o(s,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:s[r]})},o.o=(e,s)=>Object.prototype.hasOwnProperty.call(e,s),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{o.r(r),o.d(r,{main:()=>n}),o(43);var e=o(480),s=o(444);const t=new e.DynamoDB.DocumentClient({region:"us-west-2"}),n=(0,s.z)((async(e,s)=>{const o=e.body.bossId,r={TableName:"Question-zvmlbr6ejzh4xfqcfjgso77a5e-dev",IndexName:"gsi-BossQuestions",KeyConditionExpression:"questionBossId = :questionBossId",ExpressionAttributeValues:{":questionBossId":o}},n={TableName:"Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev",Key:{id:e.body.sessionId}},i=t.query(r).promise(),a=t.get(n).promise();try{const{Items:e}=await i,{Item:s}=await a,r=e,n=s;if(!r.length||!n)return{statusCode:400,body:JSON.stringify({message:"Missing boss questions or session"}),headers:{"Access-Control-Allow-Origin":"*"}};let d=n.seenQuestions||{[o]:{}};const u=r.length;u===Object.keys(d[o]).length&&(d={...d,[o]:{}});let l=Math.floor(1e3*Math.random())%u,c=r[l].id;for(;d[o][c]&&!isNaN(l);)l=Math.floor(1e3*Math.random())%u,c=r[l].id,console.log("infinite loop?");const p={...d,[o]:{...d[o],[c]:!0}},y={TableName:"Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev",Item:{...n,updatedAt:(new Date).toISOString(),seenQuestions:p}};return await t.put(y).promise(),{statusCode:200,body:JSON.stringify({question:r[l]}),headers:{"Access-Control-Allow-Origin":"*"}}}catch(e){return console.error(e),{statusCode:500,body:JSON.stringify({error:e.message,reference:s.awsRequestId}),headers:{"Access-Control-Allow-Origin":"*"}}}}))})();var t=exports;for(var n in r)t[n]=r[n];r.__esModule&&Object.defineProperty(t,"__esModule",{value:!0})})();
//# sourceMappingURL=handler.js.map