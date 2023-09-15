"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathAuthorityValidation = void 0;
const path_1 = __importDefault(require("path"));
function pathAuthorityValidation(authorizedPath, reqPath, canEqual = false) {
    authorizedPath = path_1.default.normalize(authorizedPath + "/");
    reqPath = path_1.default.normalize(reqPath);
    if (canEqual)
        return reqPath.startsWith(authorizedPath);
    return reqPath.startsWith(authorizedPath) && (reqPath !== authorizedPath);
}
exports.pathAuthorityValidation = pathAuthorityValidation;
//# sourceMappingURL=pathAuthorityValidation.js.map