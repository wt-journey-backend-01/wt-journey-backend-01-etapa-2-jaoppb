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
var agentesRepository_exports = {};
__export(agentesRepository_exports, {
  default: () => agentesRepository_default
});
module.exports = __toCommonJS(agentesRepository_exports);
var import_duplicateID = require("../errors/duplicateID");
var import_notFound = require("../errors/notFound");
var import_uuid = require("uuid");
const agents = [
  {
    id: (0, import_uuid.v4)(),
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992-10-04",
    cargo: "Investigador"
  },
  {
    id: (0, import_uuid.v4)(),
    nome: "Ana Paula Silva",
    dataDeIncorporacao: "1995-05-15",
    cargo: "Delegado"
  }
];
function findAll(filters) {
  let agentsList = agents;
  if (filters?.cargo) {
    agentsList = agentsList.filter((a) => a.cargo === filters.cargo);
  }
  if (filters?.sort) {
    agentsList.sort((a, b) => {
      if (filters.sort === "dataDeIncorporacao") {
        return new Date(a.dataDeIncorporacao).getTime() - new Date(b.dataDeIncorporacao).getTime();
      } else if (filters.sort === "-dataDeIncorporacao") {
        return new Date(b.dataDeIncorporacao).getTime() - new Date(a.dataDeIncorporacao).getTime();
      }
      return 0;
    });
  }
  return agentsList;
}
function findById(id) {
  const foundAgent = agents.find((a) => a.id === id);
  if (foundAgent === void 0) throw new import_notFound.NotFoundError("Agent", id);
  return foundAgent;
}
function createAgent(newAgent) {
  const agentWithId = {
    ...newAgent,
    id: (0, import_uuid.v4)()
  };
  try {
    findById(agentWithId.id);
  } catch (error) {
    if (error instanceof import_notFound.NotFoundError)
      throw new import_duplicateID.DuplicateIDError(agentWithId.id);
    else throw error;
  }
  agents.push(agentWithId);
  return agentWithId;
}
function updateAgent(agent, updatedAgent) {
  Object.assign(agent, updatedAgent);
  return agent;
}
function deleteAgent(id) {
  const index = agents.findIndex((a) => a.id === id);
  if (index === -1) throw new import_notFound.NotFoundError("Agent", id);
  agents.splice(index, 1);
}
var agentesRepository_default = {
  findAll,
  findById,
  createAgent,
  updateAgent,
  deleteAgent
};
