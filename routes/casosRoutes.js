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
var casosRoutes_exports = {};
__export(casosRoutes_exports, {
  caseApi: () => caseApi,
  default: () => casosRoutes_default
});
module.exports = __toCommonJS(casosRoutes_exports);
var import_express = __toESM(require("express"));
var import_casosController = __toESM(require("../controllers/casosController"));
var import_zod = __toESM(require("zod"));
var import_case = __toESM(require("../models/case"));
var import_agent = __toESM(require("../models/agent"));
const router = import_express.default.Router();
const getAllApi = {
  summary: "Get all cases",
  responses: {
    200: {
      description: "List of cases",
      parameters: [
        {
          name: "status",
          in: "query",
          schema: import_case.default.shape.status
        },
        {
          name: "agente_id",
          in: "query",
          schema: import_agent.default.shape.id
        }
      ],
      content: {
        "application/json": {
          schema: import_zod.default.array(import_case.default)
        }
      }
    }
  }
};
router.get("/casos", import_casosController.default.getAllCases);
const searchApi = {
  summary: "Search cases by text",
  parameters: [
    {
      name: "q",
      in: "query",
      required: true,
      schema: { type: "string" }
    }
  ],
  responses: {
    200: {
      description: "List of cases matching the search text",
      content: {
        "application/json": {
          schema: import_zod.default.array(import_case.default)
        }
      }
    }
  }
};
router.get("/casos/search", import_casosController.default.getAllCasesWithText);
const getByIdApi = {
  summary: "Get a case by ID",
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
      description: "Case found",
      content: {
        "application/json": {
          schema: import_case.default
        }
      }
    },
    404: {
      description: "Case not found"
    }
  }
};
router.get("/casos/:id", import_casosController.default.getCaseById);
const getAgentByCaseIdApi = {
  summary: "Get agent by case ID",
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
router.get("/casos/:id/agente", import_casosController.default.getAgentByCaseId);
const postApi = {
  summary: "Create a new case",
  requestBody: {
    content: {
      "application/json": {
        schema: import_case.default
      }
    }
  },
  responses: {
    201: {
      description: "Case created successfully",
      content: {
        "application/json": {
          schema: import_case.default
        }
      }
    }
  }
};
router.post("/casos", import_casosController.default.createCase);
const putApi = {
  summary: "Overwrite a case by ID",
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
        schema: import_case.default.omit({ id: true })
      }
    }
  },
  responses: {
    200: {
      description: "Case updated successfully",
      content: {
        "application/json": {
          schema: import_case.default
        }
      }
    }
  }
};
router.put("/casos/:id", import_casosController.default.overwriteCase);
const patchApi = {
  summary: "Update a case by ID",
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
        schema: import_case.default.omit({ id: true }).partial()
      }
    }
  },
  responses: {
    200: {
      description: "Case updated successfully",
      content: {
        "application/json": {
          schema: import_case.default
        }
      }
    }
  }
};
router.patch("/casos/:id", import_casosController.default.updateCase);
const deleteApi = {
  summary: "Delete a case by ID",
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
      description: "Case deleted successfully"
    }
  }
};
router.delete("/casos/:id", import_casosController.default.deleteCase);
const caseApi = {
  "/casos": {
    get: getAllApi,
    post: postApi
  },
  "/casos/:id": {
    get: getByIdApi,
    put: putApi,
    patch: patchApi,
    delete: deleteApi
  },
  "/casos/:id/agente": {
    get: getAgentByCaseIdApi
  },
  "/casos/search": {
    get: searchApi
  }
};
var casosRoutes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  caseApi
});
