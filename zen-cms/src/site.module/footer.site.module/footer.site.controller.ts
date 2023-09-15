import { Body, Controller, Post } from "@nestjs/common";
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

    @Post('update')
    @SiteW()
    update(@Body() updateFooterSiteDto: UpdateFooterSiteDto){
        return this.footerSiteService.update(updateFooterSiteDto);
    }

    @Post('del')
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

    @Post('delIgnore')
    @SiteW()
    delIgnore(@Body() delIgnoreFooterSiteDto: DelIgnoreFooterSiteDto){
        return this.footerSiteService.delIgnore(delIgnoreFooterSiteDto);
    }
}