import { Injectable } from "@nestjs/common";
import pkgJson from '../../../package.json';
import { UpdateNicknameProfileSiteDto } from "./dto/updateNickname.profile.site";
import { readFileSync, writeFileSync } from "fs";
import { SiteService } from "../site.service";
import { UpdateAvatarProfileSiteDto } from "./dto/updateAvatar.profile.site";
import { AddBioProfileSiteDto } from "./dto/addBio.profile.site";
import { DelBioProfileSiteDto } from "./dto/delBio.profile.site";
import { UpdateBioProfileSiteDto } from "./dto/updateBio.profile.site";
import { ResponseCode, generateResponse } from "src/utils/Response";

@Injectable()
export class ProfileSiteService {
    updateNickname(updateNicknameProfileSiteDto: UpdateNicknameProfileSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["profile"]["nickname"] = updateNicknameProfileSiteDto.nickName;
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    updateAvatar(updateAvatarProfileSiteDto: UpdateAvatarProfileSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["profile"]["avatar"] = updateAvatarProfileSiteDto.avatarPath;
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    addBio(addBioProfileSiteDto: AddBioProfileSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["profile"]["bio"].push(addBioProfileSiteDto.bioContent);
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    delBio(delBioProfileSiteDto: DelBioProfileSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["profile"]["bio"] = siteInfo["profile"]["bio"].filter(item => item !== delBioProfileSiteDto.bioContent);
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }

    updateBio(updateBioProfileSiteDto: UpdateBioProfileSiteDto) {
        let siteInfo = JSON.parse(readFileSync(pkgJson.dataPath + "/site/site.json", 'utf-8'));
        siteInfo["profile"]["bio"].forEach((item, index) => {
            if (item === updateBioProfileSiteDto.oldBio) siteInfo["profile"]["bio"][index] = updateBioProfileSiteDto.newBio;
        });
        writeFileSync(pkgJson.dataPath + "/site/site.json", JSON.stringify(siteInfo));
        return generateResponse(ResponseCode.OK, "", SiteService.updateSiteCache());
    }
}