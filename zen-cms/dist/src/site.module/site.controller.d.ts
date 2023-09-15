import { SiteService } from "./site.service";
import { UpdateDataPathSiteDto } from "./dto/updateDataPath.site";
export declare class SiteController {
    private siteService;
    constructor(siteService: SiteService);
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
    refreshCache(): {
        statusCode: any;
        message: any;
        data: any;
    };
}
