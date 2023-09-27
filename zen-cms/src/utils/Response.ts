export const ResponseCode = {
    //succ
    OK: 200,
    EXISTED_NAME_SUCC: 230,
    NO_SUCH_FILE_BUT_CREATE: 231,
    BAD_PATH_RECOVERY: 232,
    //client error
    BAD_PATH: 460,
    NEED_FILE: 461,
    EXISTED_NAME_FAIL: 462,
    OUT_OF_BOUNDS_PATH: 463,
    BAD_SEGMENT: 464,
    REFERENCED: 465,
}

export function generateResponse(statusCode, message, data){
    return {
        statusCode: statusCode,
        message: message,
        data: data
    }
}