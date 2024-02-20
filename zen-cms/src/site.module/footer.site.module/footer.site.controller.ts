import { Body, Controller, Post, Put, Delete } from "@nestjs/common";
import { FooterSiteService } from "./footer.site.service";
import { AddFooterSiteDto } from "./dto/add.footer.site";
import { UpdateFooterSiteDto } from "./dto/update.footer.site";
import { DelFooterSiteDto } from "./dto/del.footer.site";
import { SwapFooterSiteDto } from "./dto/swap.footer.site";
import { AddIgnoreFooterSiteDto } from "./dto/addIgnore.footer.site";
import { DelIgnoreFooterSiteDto } from "./dto/delIgnore.footer.site";
import { SiteW } from "src/auth/authorization.decorator";

@Controller('site/footer')
export class FooterSiteController {
    constructor(private footerSiteService: FooterSiteService) { }

    @Post('add')
    @SiteW()
    add(@Body() addFooterSiteDto: AddFooterSiteDto){
        return this.footerSiteService.add(addFooterSiteDto);
    }

    @Put('update')
    @SiteW()
    update(@Body() updateFooterSiteDto: UpdateFooterSiteDto){
        return this.footerSiteService.update(updateFooterSiteDto);
    }

    @Delete('del')
    @SiteW()
    del(@Body() delFooterSiteDto: DelFooterSiteDto){
        return this.footerSiteService.del(delFooterSiteDto);
    }

    @Post('swap')
    @SiteW()
    swap(@Body() swapFooterSiteDto: SwapFooterSiteDto){
        return this.footerSiteService.swap(swapFooterSiteDto);
    }

    @Post('addIgnore')
    @SiteW()
    addIgnore(@Body() addIgnoreFooterSiteDto: AddIgnoreFooterSiteDto){
        return this.footerSiteService.addIgnore(addIgnoreFooterSiteDto);
    }

    //这里是拿index作为依据来删除的，非幂等，用POST
    @Post('delIgnore')
    @SiteW()
    delIgnore(@Body() delIgnoreFooterSiteDto: DelIgnoreFooterSiteDto){
        return this.footerSiteService.delIgnore(delIgnoreFooterSiteDto);
    }
}