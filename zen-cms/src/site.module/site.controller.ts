import { Body, Controller, Get, Put, Post, Patch } from "@nestjs/common";
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

    @Put('updateDataPath')
    @SiteW()
    updateDataPath(@Body() updateDataPathSiteDto: UpdateDataPathSiteDto) {
        return this.siteService.updateDataPath(updateDataPathSiteDto);
    }

    @Patch('refreshCache')
    @SiteW()
    refreshCache() {
        return SiteService.refreshAllCache();
    }
}