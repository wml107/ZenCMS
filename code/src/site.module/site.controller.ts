import { Body, Controller, Get, Post } from "@nestjs/common";
import { SiteService } from "./site.service";
import { UpdateDataPathSiteDto } from "./dto/updateDataPath.site";
import { SiteR, SiteW } from "src/auth/authorization.decorator";

@Controller('site')
export class SiteController {
    constructor(private siteService: SiteService) { }

    @Get('get')
    @SiteR()
    get() {
        return this.siteService.get();
    }

    @Get('getDataPath')
    @SiteR()
    getDataPath() {
        return this.siteService.getDataPath();
    }

    @Post('updateDataPath')
    @SiteW()
    updateDataPath(@Body() updateDataPathSiteDto: UpdateDataPathSiteDto) {
        return this.siteService.updateDataPath(updateDataPathSiteDto);
    }

    @Get('refreshCache')
    @SiteW()
    refreshCache() {
        return SiteService.refreshAllCache();
    }
}