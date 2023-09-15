"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = exports.ResponseCode = void 0;
exports.ResponseCode = {
    OK: 200,
    EXISTED_NAME_SUCC: 230,
    NO_SUCH_FILE_BUT_CREATE: 231,
    BAD_PATH_RECOVERY: 232,
    BAD_PATH: 460,
    NEED_FILE: 461,
    EXISTED_NAME_FAIL: 462,
    OUT_OF_BOUNDS_PATH: 463,
    BAD_SEGMENT: 464,
    REFERENCED: 465,
};
function generateResponse(statusCode, msg, data) {
    return {
        statusCode: statusCode,
        message: msg,
        data: data
    };
}
exports.generateResponse = generateResponse;
//# sourceMappingURL=Response.js.map