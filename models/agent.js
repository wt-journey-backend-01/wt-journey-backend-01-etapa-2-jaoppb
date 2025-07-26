"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var agent_exports = {};
__export(agent_exports, {
  default: () => agent_default
});
module.exports = __toCommonJS(agent_exports);
var import_zod = __toESM(require("zod"));
const agentId = import_zod.default.uuidv4().meta({
  description: "Unique identifier for the agent",
  example: "123e4567-e89b-12d3-a456-426614174000"
});
const nome = import_zod.default.string().min(2).max(100).meta({
  description: "Name of the agent",
  example: "John Doe"
});
const dataDeIncorporacao = import_zod.default.string().regex(/^\d{4}\/\d{2}\/\d{2}$/).meta({
  description: "Incorporation date of the agent",
  example: "2023/01/01"
});
const cargo = import_zod.default.string().min(2).max(100).meta({
  description: "Position of the agent",
  example: "Delegate"
});
const AgentSchema = import_zod.default.object({
  id: agentId,
  nome,
  dataDeIncorporacao,
  cargo
}).meta({
  id: "Agent",
  description: "Schema for an agent in the system",
  example: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    nome: "John Doe",
    dataDeIncorporacao: "2023/01/01",
    cargo: "Sales Manager"
  }
});
var agent_default = AgentSchema;
