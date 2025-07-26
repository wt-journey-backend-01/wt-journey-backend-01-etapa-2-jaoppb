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
var agentesRoutes_exports = {};
__export(agentesRoutes_exports, {
  agentApi: () => agentApi,
  default: () => agentesRoutes_default
});
module.exports = __toCommonJS(agentesRoutes_exports);
var import_express = __toESM(require("express"));
var import_agentesController = __toESM(require("../controllers/agentesController"));
var import_zod = __toESM(require("zod"));
var import_agent = __toESM(require("../models/agent"));
const router = import_express.default.Router();
const getAllApi = {
  summary: "Get all agents",
  responses: {
    200: {
      description: "List of agents",
      parameters: [
        {
          name: "cargo",
          in: "query",
          schema: import_agent.default.shape.cargo
        },
        {
          name: "sort",
          in: "query",
          schema: import_agentesController.sortFilter
        }
      ],
      content: {
        "application/json": {
          schema: import_zod.default.array(import_agent.default)
        }
      }
    }
  }
};
router.get("/agentes", import_agentesController.default.getAllAgents);
const getByIdApi = {
  summary: "Get an agent by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string", format: "uuid" }
    }
  ],
  responses: {
    200: {
      description: "Agent found",
      content: {
        "application/json": {
          schema: import_agent.default
        }
      }
    },
    404: {
      description: "Agent not found"
    }
  }
};
router.get("/agentes/:id", import_agentesController.default.getAgentById);
const postApi = {
  summary: "Create a new agent",
  requestBody: {
    content: {
      "application/json": {
        schema: import_agent.default
      }
    }
  },
  responses: {
    201: {
      description: "Agent created",
      content: {
        "application/json": {
          schema: import_agent.default
        }
      }
    }
  }
};
router.post("/agentes", import_agentesController.default.createAgent);
const putApi = {
  summary: "Overwrite an existing agent",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string", format: "uuid" }
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: import_agent.default.omit({ id: true })
      }
    }
  },
  responses: {
    200: {
      description: "Agent updated",
      content: {
        "application/json": {
          schema: import_agent.default
        }
      }
    }
  }
};
router.put("/agentes/:id", import_agentesController.default.overwriteAgent);
const patchApi = {
  summary: "Update an existing agent",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string", format: "uuid" }
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: import_agent.default.omit({ id: true }).partial()
      }
    }
  },
  responses: {
    200: {
      description: "Agent updated",
      content: {
        "application/json": {
          schema: import_agent.default
        }
      }
    }
  }
};
router.patch("/agentes/:id", import_agentesController.default.updateAgent);
const deleteApi = {
  summary: "Delete an agent",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string", format: "uuid" }
    }
  ],
  responses: {
    204: {
      description: "Agent deleted successfully"
    }
  }
};
router.delete("/agentes/:id", import_agentesController.default.deleteAgent);
const agentApi = {
  "/agentes": {
    get: getAllApi,
    post: postApi
  },
  "/agentes/:id": {
    get: getByIdApi,
    put: putApi,
    patch: patchApi,
    delete: deleteApi
  }
};
var agentesRoutes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  agentApi
});
