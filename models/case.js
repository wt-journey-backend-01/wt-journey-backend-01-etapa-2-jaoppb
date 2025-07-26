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
var case_exports = {};
__export(case_exports, {
  default: () => case_default
});
module.exports = __toCommonJS(case_exports);
var import_zod = __toESM(require("zod"));
var import_agent = __toESM(require("./agent"));
const caseId = import_zod.default.uuidv4().meta({
  description: "Unique identifier for the case",
  example: "123e4567-e89b-12d3-a456-426614174000"
});
const titulo = import_zod.default.string().min(2).max(100).meta({
  description: "Title of the case",
  example: "Case Title"
});
const descricao = import_zod.default.string().min(10).max(1e3).meta({
  description: "Description of the case",
  example: "Detailed description of the case"
});
const status = import_zod.default.enum(["aberto", "solucionado"]).meta({
  description: "Status of the case",
  example: "aberto"
});
const CaseSchema = import_zod.default.object({
  id: caseId,
  titulo,
  descricao,
  status,
  agente_id: import_agent.default.shape.id
}).meta({
  id: "Case",
  description: "Schema for a case in the system",
  example: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    titulo: "Case Title",
    descricao: "Detailed description of the case",
    status: "aberto",
    agente_id: "123e4567-e89b-12d3-a456-426614174000"
  }
}).strict();
var case_default = CaseSchema;
