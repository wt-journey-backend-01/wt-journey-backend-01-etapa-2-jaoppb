"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var swagger_exports = {};
__export(swagger_exports, {
  swaggerDocument: () => swaggerDocument
});
module.exports = __toCommonJS(swagger_exports);
var import_zod_openapi = require("zod-openapi");
var import_agentesRoutes = require("../routes/agentesRoutes");
var import_casosRoutes = require("../routes/casosRoutes");
const swaggerDocument = (0, import_zod_openapi.createDocument)({
  openapi: "3.1.1",
  info: {
    title: "WT Journey API - Etapa 2",
    version: "1.0.0"
  },
  paths: {
    ...import_agentesRoutes.agentApi,
    ...import_casosRoutes.caseApi
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  swaggerDocument
});
