import { UpdateDataPathSiteDto } from "./dto/updateDataPath.site";
export declare class SiteService {
    constructor();
    private static siteInfo;
    static updateSiteCache(): any;
    get(): {
        statusCode: any;
        message: any;
        data: any;
    };
    getDataPath(): {
        statusCode: any;
        message: any;
        data: any;
    };
    updateDataPath(updateDataPathSiteDto: UpdateDataPathSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    static refreshAllCache(): {
        statusCode: any;
        message: any;
        data: any;
    };
}
