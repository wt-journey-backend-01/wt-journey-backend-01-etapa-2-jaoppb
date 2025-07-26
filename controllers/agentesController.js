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
var agentesController_exports = {};
__export(agentesController_exports, {
  default: () => agentesController_default,
  sortFilter: () => sortFilter
});
module.exports = __toCommonJS(agentesController_exports);
var import_agentesRepository = __toESM(require("../repositories/agentesRepository"));
var import_agent = __toESM(require("../models/agent"));
var import_zod = __toESM(require("zod"));
const sortFilter = import_zod.default.enum(["dataDeIncorporacao", "-dataDeIncorporacao"]);
function getAllAgents(req, res) {
  const filters = req.query;
  if (filters.cargo !== void 0)
    import_agent.default.shape.cargo.parse(filters.cargo);
  if (filters.sort !== void 0) sortFilter.parse(filters.sort);
  const agents = import_agentesRepository.default.findAll({
    cargo: filters.cargo,
    sort: filters.sort
  });
  res.json(agents);
}
function getAgentById(req, res) {
  const agentId = req.params.id;
  const foundAgent = import_agentesRepository.default.findById(agentId);
  res.json(foundAgent);
}
function createAgent(req, res) {
  const newAgent = import_agent.default.omit({ id: true }).parse(req.body);
  const createdAgent = import_agentesRepository.default.createAgent(newAgent);
  res.status(201).json(createdAgent);
}
function overwriteAgent(req, res) {
  const agentId = req.params.id;
  const existingAgent = import_agentesRepository.default.findById(agentId);
  const updatedData = import_agent.default.omit({ id: true }).parse(req.body);
  const updatedAgent = import_agentesRepository.default.updateAgent(
    existingAgent,
    updatedData
  );
  res.json(updatedAgent);
}
function updateAgent(req, res) {
  const agentId = req.params.id;
  const existingAgent = import_agentesRepository.default.findById(agentId);
  const updatedData = import_agent.default.omit({ id: true }).partial().parse(req.body);
  const updatedAgent = import_agentesRepository.default.updateAgent(
    existingAgent,
    updatedData
  );
  res.json(updatedAgent);
}
function deleteAgent(req, res) {
  const agentId = req.params.id;
  try {
    import_agentesRepository.default.deleteAgent(agentId);
  } catch {
  }
  res.status(204).send();
}
var agentesController_default = {
  getAllAgents,
  getAgentById,
  createAgent,
  overwriteAgent,
  updateAgent,
  deleteAgent
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sortFilter
});
