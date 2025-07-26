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
var utils_exports = {};
__export(utils_exports, {
  errorHandler: () => errorHandler
});
module.exports = __toCommonJS(utils_exports);
var import_zod = require("zod");
var import_duplicateID = require("./errors/duplicateID");
var import_notFound = require("./errors/notFound");
var import_requiredParam = require("./errors/requiredParam");
var import_invalidID = require("./errors/invalidID");
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  switch (true) {
    case err instanceof import_zod.ZodError:
      return res.status(400).json({
        message: "Validation error",
        errors: err.issues
      });
    case err instanceof import_duplicateID.DuplicateIDError:
      return res.status(409).json({
        message: err.message
      });
    case (err instanceof import_notFound.NotFoundError || err instanceof import_invalidID.InvalidIDError):
      return res.status(404).json({
        message: err.message
      });
    case err instanceof import_requiredParam.RequiredParamError:
      return res.status(400).json({
        message: err.message
      });
    default:
      return res.status(500).json({
        message: "Internal server error"
      });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandler
});
