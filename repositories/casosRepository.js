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
var casosRepository_exports = {};
__export(casosRepository_exports, {
  default: () => casosRepository_default
});
module.exports = __toCommonJS(casosRepository_exports);
var import_duplicateID = require("../errors/duplicateID");
var import_notFound = require("../errors/notFound");
var import_agentesRepository = __toESM(require("./agentesRepository"));
const cases = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio",
    descricao: "Disparos foram reportados \xE0s 22:33 do dia 10/07/2007 na regi\xE3o do bairro Uni\xE3o, resultando na morte da v\xEDtima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
  },
  {
    id: "a2b3c4d5-e6f7-8a9b-0c1d-2e3f4g5h6i7j",
    titulo: "furto",
    descricao: "Relato de furto de ve\xEDculo \xE0s 14:20 do dia 12/07/2007 na regi\xE3o do bairro Centro.",
    status: "solucionado",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
  }
];
function findAll(filters) {
  let casesList = cases;
  if (filters?.status) {
    casesList = casesList.filter((c) => c.status === filters.status);
  }
  if (filters?.agente_id) {
    casesList = casesList.filter((c) => c.agente_id === filters.agente_id);
  }
  return casesList;
}
function findAllWithText(text) {
  const normalized = text.toLowerCase().normalize();
  return cases.filter(
    (c) => c.titulo.toLowerCase().normalize().includes(normalized) || c.descricao.toLowerCase().normalize().includes(normalized)
  );
}
function findById(id) {
  const foundCase = cases.find((c) => c.id === id);
  if (foundCase === void 0) throw new import_notFound.NotFoundError("Case", id);
  return foundCase;
}
function createCase(newCase) {
  try {
    findById(newCase.id);
  } catch (error) {
    if (error instanceof import_notFound.NotFoundError)
      throw new import_duplicateID.DuplicateIDError(newCase.id);
    else throw error;
  }
  import_agentesRepository.default.findById(newCase.agente_id);
  cases.push(newCase);
  return newCase;
}
function updateCase(case_, updatedCase) {
  if (updatedCase.agente_id) {
    import_agentesRepository.default.findById(updatedCase.agente_id);
  }
  Object.assign(case_, updatedCase);
  return case_;
}
function deleteCase(id) {
  const index = cases.findIndex((c) => c.id === id);
  if (index === -1) throw new import_notFound.NotFoundError("Case", id);
  cases.splice(index, 1);
}
var casosRepository_default = {
  findAll,
  findAllWithText,
  findById,
  createCase,
  updateCase,
  deleteCase
};
