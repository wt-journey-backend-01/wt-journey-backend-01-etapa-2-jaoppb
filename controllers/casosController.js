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
var casosController_exports = {};
__export(casosController_exports, {
  default: () => casosController_default
});
module.exports = __toCommonJS(casosController_exports);
var import_casosRepository = __toESM(require("../repositories/casosRepository"));
var import_case = __toESM(require("../models/case"));
var import_agentesRepository = __toESM(require("../repositories/agentesRepository"));
var import_requiredParam = require("../errors/requiredParam");
var import_zod = __toESM(require("zod"));
var import_invalidID = require("../errors/invalidID");
function getAllCases(req, res) {
  const filters = req.query;
  if (filters.status) {
    import_case.default.shape.status.parse(filters.status);
  }
  if (filters.agente_id) {
    import_case.default.shape.agente_id.parse(filters.agente_id);
  }
  const cases = import_casosRepository.default.findAll(filters);
  res.json(cases);
}
function getAllCasesWithText(req, res) {
  const text = req.query.q;
  if (!text) throw new import_requiredParam.RequiredParamError("q");
  const cases = import_casosRepository.default.findAllWithText(text);
  res.json(cases);
}
function getAgentByCaseId(req, res) {
  const caseId = req.params.id;
  if (!import_zod.default.uuid().safeParse(caseId).success) {
    throw new import_invalidID.InvalidIDError("case", caseId);
  }
  const foundCase = import_casosRepository.default.findById(caseId);
  const agent = import_agentesRepository.default.findById(foundCase.agente_id);
  res.json(agent);
}
function getCaseById(req, res) {
  const caseId = req.params.id;
  if (!import_zod.default.uuid().safeParse(caseId).success) {
    throw new import_invalidID.InvalidIDError("case", caseId);
  }
  const foundCase = import_casosRepository.default.findById(caseId);
  res.json(foundCase);
}
function createCase(req, res) {
  const newCase = import_case.default.omit({ id: true }).parse(req.body);
  const createdCase = import_casosRepository.default.createCase(newCase);
  res.status(201).json(createdCase);
}
function overwriteCase(req, res) {
  const caseId = req.params.id;
  if (!import_zod.default.uuid().safeParse(caseId).success) {
    throw new import_invalidID.InvalidIDError("case", caseId);
  }
  const existingCase = import_casosRepository.default.findById(caseId);
  const updatedData = import_case.default.omit({ id: true }).parse(req.body);
  const updatedCase = import_casosRepository.default.updateCase(existingCase, updatedData);
  res.json(updatedCase);
}
function updateCase(req, res) {
  const caseId = req.params.id;
  if (!import_zod.default.uuid().safeParse(caseId).success) {
    throw new import_invalidID.InvalidIDError("case", caseId);
  }
  const existingCase = import_casosRepository.default.findById(caseId);
  const updatedData = import_case.default.omit({ id: true }).partial().parse(req.body);
  const updatedCase = import_casosRepository.default.updateCase(existingCase, updatedData);
  res.json(updatedCase);
}
function deleteCase(req, res) {
  const caseId = req.params.id;
  if (!import_zod.default.uuid().safeParse(caseId).success) {
    throw new import_invalidID.InvalidIDError("case", caseId);
  }
  import_casosRepository.default.deleteCase(caseId);
  res.status(204).send();
}
var casosController_default = {
  getAllCases,
  getAllCasesWithText,
  getCaseById,
  getAgentByCaseId,
  createCase,
  overwriteCase,
  updateCase,
  deleteCase
};
