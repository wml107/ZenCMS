export declare const ResponseCode: {
    OK: number;
    EXISTED_NAME_SUCC: number;
    NO_SUCH_FILE_BUT_CREATE: number;
    BAD_PATH_RECOVERY: number;
    BAD_PATH: number;
    NEED_FILE: number;
    EXISTED_NAME_FAIL: number;
    OUT_OF_BOUNDS_PATH: number;
    BAD_SEGMENT: number;
    REFERENCED: number;
};
export declare function generateResponse(statusCode: any, msg: any, data: any): {
    statusCode: any;
    message: any;
    data: any;
};
