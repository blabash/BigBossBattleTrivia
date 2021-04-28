/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/getBossQuestion/handler.ts":
/*!**************************************************!*\
  !*** ./src/functions/getBossQuestion/handler.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n\n\nconst ddb = new aws_sdk__WEBPACK_IMPORTED_MODULE_1__.DynamoDB.DocumentClient({ region: 'us-west-2' });\n\nconst getBossQuestion = async (event, context) => {\n    const bossId = event.body.bossId;\n    const sessionId = event.body.sessionId;\n    console.log(`bossId`, bossId);\n    console.log(`sessionId`, sessionId);\n    const questionParams = {\n        TableName: 'Question-zvmlbr6ejzh4xfqcfjgso77a5e-dev',\n        IndexName: 'gsi-BossQuestions',\n        KeyConditionExpression: 'questionBossId = :questionBossId',\n        ExpressionAttributeValues: {\n            ':questionBossId': bossId,\n        },\n    };\n    const sessionParams = {\n        TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',\n        Key: {\n            id: sessionId,\n        },\n    };\n    const questionsPromise = ddb.query(questionParams).promise();\n    const sessionPromise = ddb.get(sessionParams).promise();\n    try {\n        const { Items } = await questionsPromise;\n        const { Item } = await sessionPromise;\n        console.log(`Item`, Item);\n        const bossQuestions = Items;\n        const session = Item;\n        if (!bossQuestions.length || !session) {\n            return {\n                statusCode: 400,\n                body: JSON.stringify({\n                    message: 'Missing boss questions or session',\n                }),\n                headers: {\n                    'Access-Control-Allow-Origin': '*',\n                },\n            };\n        }\n        let seenQuestions = session.seenQuestions || {\n            [bossId]: {},\n        };\n        const bossQuestionsLength = bossQuestions.length;\n        if (bossQuestionsLength === Object.keys(seenQuestions[bossId]).length) {\n            seenQuestions = {\n                ...seenQuestions,\n                [bossId]: {},\n            };\n        }\n        let randomIdx = Math.floor(Math.random() * 1000) % bossQuestionsLength;\n        let randomQuestionId = bossQuestions[randomIdx].id;\n        while (seenQuestions[bossId][randomQuestionId] && !isNaN(randomIdx)) {\n            randomIdx = Math.floor(Math.random() * 1000) % bossQuestionsLength;\n            randomQuestionId = bossQuestions[randomIdx].id;\n            console.log('infinite loop?');\n        }\n        const updatedSeenQuestions = {\n            ...seenQuestions,\n            [bossId]: {\n                ...seenQuestions[bossId],\n                [randomQuestionId]: true,\n            },\n        };\n        const updatedSessionParams = {\n            TableName: 'Session-zvmlbr6ejzh4xfqcfjgso77a5e-dev',\n            Item: {\n                ...session,\n                updatedAt: new Date().toISOString(),\n                seenQuestions: updatedSeenQuestions,\n            },\n        };\n        await ddb.put(updatedSessionParams).promise();\n        return {\n            statusCode: 200,\n            body: JSON.stringify({\n                question: bossQuestions[randomIdx],\n            }),\n            headers: {\n                'Access-Control-Allow-Origin': '*',\n            },\n        };\n    }\n    catch (error) {\n        console.error(error);\n        return {\n            statusCode: 500,\n            body: JSON.stringify({\n                Error: error.message,\n                Reference: context.awsRequestId,\n            }),\n            headers: {\n                'Access-Control-Allow-Origin': '*',\n            },\n        };\n    }\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(getBossQuestion);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2dldEJvc3NRdWVzdGlvbi9oYW5kbGVyLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmJidHNlcnZpY2UvLi9zcmMvZnVuY3Rpb25zL2dldEJvc3NRdWVzdGlvbi9oYW5kbGVyLnRzPzcxMDIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuY29uc3QgZGRiID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7IHJlZ2lvbjogJ3VzLXdlc3QtMicgfSk7XG5pbXBvcnQgeyBMaXN0UXVlc3Rpb25zUXVlcnkgfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvQVBJJztcbmltcG9ydCB0eXBlIHsgVmFsaWRhdGVkRXZlbnRBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gJ0BsaWJzL2FwaUdhdGV3YXknO1xuaW1wb3J0IHsgbWlkZHlmeSB9IGZyb20gJ0BsaWJzL2xhbWJkYSc7XG5cbmltcG9ydCBzY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuXG5jb25zdCBnZXRCb3NzUXVlc3Rpb246IFZhbGlkYXRlZEV2ZW50QVBJR2F0ZXdheVByb3h5RXZlbnQ8XG4gIHR5cGVvZiBzY2hlbWFcbj4gPSBhc3luYyAoZXZlbnQsIGNvbnRleHQpID0+IHtcbiAgY29uc3QgYm9zc0lkID0gZXZlbnQuYm9keS5ib3NzSWQ7XG4gIGNvbnN0IHNlc3Npb25JZCA9IGV2ZW50LmJvZHkuc2Vzc2lvbklkO1xuICBjb25zb2xlLmxvZyhgYm9zc0lkYCwgYm9zc0lkKTtcbiAgY29uc29sZS5sb2coYHNlc3Npb25JZGAsIHNlc3Npb25JZCk7XG5cbiAgY29uc3QgcXVlc3Rpb25QYXJhbXMgPSB7XG4gICAgVGFibGVOYW1lOiAnUXVlc3Rpb24tenZtbGJyNmVqemg0eGZxY2ZqZ3NvNzdhNWUtZGV2JyxcbiAgICBJbmRleE5hbWU6ICdnc2ktQm9zc1F1ZXN0aW9ucycsXG4gICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJ3F1ZXN0aW9uQm9zc0lkID0gOnF1ZXN0aW9uQm9zc0lkJyxcbiAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAnOnF1ZXN0aW9uQm9zc0lkJzogYm9zc0lkLFxuICAgIH0sXG4gIH07XG4gIGNvbnN0IHNlc3Npb25QYXJhbXMgPSB7XG4gICAgVGFibGVOYW1lOiAnU2Vzc2lvbi16dm1sYnI2ZWp6aDR4ZnFjZmpnc283N2E1ZS1kZXYnLFxuICAgIEtleToge1xuICAgICAgaWQ6IHNlc3Npb25JZCxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHF1ZXN0aW9uc1Byb21pc2UgPSBkZGIucXVlcnkocXVlc3Rpb25QYXJhbXMpLnByb21pc2UoKTtcbiAgY29uc3Qgc2Vzc2lvblByb21pc2UgPSBkZGIuZ2V0KHNlc3Npb25QYXJhbXMpLnByb21pc2UoKTtcblxuICB0cnkge1xuICAgIC8vIGNvbnN0IHsgSXRlbXM6IGJvc3NRdWVzdGlvbnMgfSA9IGF3YWl0IHF1ZXN0aW9uc1Byb21pc2U7XG4gICAgLy8gY29uc3QgeyBJdGVtOiBzZXNzaW9uIH0gPSBhd2FpdCBzZXNzaW9uUHJvbWlzZTtcbiAgICBjb25zdCB7IEl0ZW1zIH0gPSBhd2FpdCBxdWVzdGlvbnNQcm9taXNlO1xuICAgIGNvbnN0IHsgSXRlbSB9ID0gYXdhaXQgc2Vzc2lvblByb21pc2U7XG4gICAgY29uc29sZS5sb2coYEl0ZW1gLCBJdGVtKTtcbiAgICBjb25zdCBib3NzUXVlc3Rpb25zID0gSXRlbXMgYXMgTGlzdFF1ZXN0aW9uc1F1ZXJ5WydsaXN0UXVlc3Rpb25zJ11bJ2l0ZW1zJ107XG4gICAgY29uc3Qgc2Vzc2lvbiA9IEl0ZW0gYXMge1xuICAgICAgX190eXBlbmFtZTogJ1Nlc3Npb24nO1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHNlZW5RdWVzdGlvbnM6IHsgW2tleTogc3RyaW5nXTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gfSB8IG51bGw7XG4gICAgfSB8IG51bGw7XG5cbiAgICBpZiAoIWJvc3NRdWVzdGlvbnMubGVuZ3RoIHx8ICFzZXNzaW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBtZXNzYWdlOiAnTWlzc2luZyBib3NzIHF1ZXN0aW9ucyBvciBzZXNzaW9uJyxcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgc2VlblF1ZXN0aW9ucyA9IHNlc3Npb24uc2VlblF1ZXN0aW9ucyB8fCB7XG4gICAgICBbYm9zc0lkXToge30sXG4gICAgfTtcblxuICAgIGNvbnN0IGJvc3NRdWVzdGlvbnNMZW5ndGggPSBib3NzUXVlc3Rpb25zLmxlbmd0aDtcblxuICAgIGlmIChib3NzUXVlc3Rpb25zTGVuZ3RoID09PSBPYmplY3Qua2V5cyhzZWVuUXVlc3Rpb25zW2Jvc3NJZF0pLmxlbmd0aCkge1xuICAgICAgc2VlblF1ZXN0aW9ucyA9IHtcbiAgICAgICAgLi4uc2VlblF1ZXN0aW9ucyxcbiAgICAgICAgW2Jvc3NJZF06IHt9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgcmFuZG9tSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCkgJSBib3NzUXVlc3Rpb25zTGVuZ3RoO1xuICAgIGxldCByYW5kb21RdWVzdGlvbklkID0gYm9zc1F1ZXN0aW9uc1tyYW5kb21JZHhdLmlkO1xuICAgIHdoaWxlIChzZWVuUXVlc3Rpb25zW2Jvc3NJZF1bcmFuZG9tUXVlc3Rpb25JZF0gJiYgIWlzTmFOKHJhbmRvbUlkeCkpIHtcbiAgICAgIHJhbmRvbUlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApICUgYm9zc1F1ZXN0aW9uc0xlbmd0aDtcbiAgICAgIHJhbmRvbVF1ZXN0aW9uSWQgPSBib3NzUXVlc3Rpb25zW3JhbmRvbUlkeF0uaWQ7XG4gICAgICBjb25zb2xlLmxvZygnaW5maW5pdGUgbG9vcD8nKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVkU2VlblF1ZXN0aW9ucyA9IHtcbiAgICAgIC4uLnNlZW5RdWVzdGlvbnMsXG4gICAgICBbYm9zc0lkXToge1xuICAgICAgICAuLi5zZWVuUXVlc3Rpb25zW2Jvc3NJZF0sXG4gICAgICAgIFtyYW5kb21RdWVzdGlvbklkXTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCB1cGRhdGVkU2Vzc2lvblBhcmFtcyA9IHtcbiAgICAgIFRhYmxlTmFtZTogJ1Nlc3Npb24tenZtbGJyNmVqemg0eGZxY2ZqZ3NvNzdhNWUtZGV2JyxcbiAgICAgIEl0ZW06IHtcbiAgICAgICAgLi4uc2Vzc2lvbixcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIHNlZW5RdWVzdGlvbnM6IHVwZGF0ZWRTZWVuUXVlc3Rpb25zLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGF3YWl0IGRkYi5wdXQodXBkYXRlZFNlc3Npb25QYXJhbXMpLnByb21pc2UoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHF1ZXN0aW9uOiBib3NzUXVlc3Rpb25zW3JhbmRvbUlkeF0sXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIEVycm9yOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICBSZWZlcmVuY2U6IGNvbnRleHQuYXdzUmVxdWVzdElkLFxuICAgICAgfSksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBtYWluID0gbWlkZHlmeShnZXRCb3NzUXVlc3Rpb24pO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUlBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/getBossQuestion/handler.ts\n");

/***/ }),

/***/ "./src/libs/lambda.ts":
/*!****************************!*\
  !*** ./src/libs/lambda.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"middyfy\": () => (/* binding */ middyfy)\n/* harmony export */ });\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/http-json-body-parser */ \"@middy/http-json-body-parser\");\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst middyfy = (handler) => {\n    return _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler).use(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default()());\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9sYW1iZGEudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYmJ0c2VydmljZS8uL3NyYy9saWJzL2xhbWJkYS50cz82YjI1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtaWRkeSBmcm9tIFwiQG1pZGR5L2NvcmVcIlxuaW1wb3J0IG1pZGR5SnNvbkJvZHlQYXJzZXIgZnJvbSBcIkBtaWRkeS9odHRwLWpzb24tYm9keS1wYXJzZXJcIlxuXG5leHBvcnQgY29uc3QgbWlkZHlmeSA9IChoYW5kbGVyKSA9PiB7XG4gIHJldHVybiBtaWRkeShoYW5kbGVyKS51c2UobWlkZHlKc29uQm9keVBhcnNlcigpKVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/libs/lambda.ts\n");

/***/ }),

/***/ "@middy/core":
/*!******************************!*\
  !*** external "@middy/core" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@middy/core");;

/***/ }),

/***/ "@middy/http-json-body-parser":
/*!***********************************************!*\
  !*** external "@middy/http-json-body-parser" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@middy/http-json-body-parser");;

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");;

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("source-map-support/register");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/getBossQuestion/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;