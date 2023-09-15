import { FooterSiteService } from "./footer.site.service";
import { AddFooterSiteDto } from "./dto/add.footer.site";
import { UpdateFooterSiteDto } from "./dto/update.footer.site";
import { DelFooterSiteDto } from "./dto/del.footer.site";
import { SwapFooterSiteDto } from "./dto/swap.footer.site";
import { AddIgnoreFooterSiteDto } from "./dto/addIgnore.footer.site";
import { DelIgnoreFooterSiteDto } from "./dto/delIgnore.footer.site";
export declare class FooterSiteController {
    private footerSiteService;
    constructor(footerSiteService: FooterSiteService);
    add(addFooterSiteDto: AddFooterSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    update(updateFooterSiteDto: UpdateFooterSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    del(delFooterSiteDto: DelFooterSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    swap(swapFooterSiteDto: SwapFooterSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    addIgnore(addIgnoreFooterSiteDto: AddIgnoreFooterSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    delIgnore(delIgnoreFooterSiteDto: DelIgnoreFooterSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
}
