
import { ProfileSiteService } from "./profile.site.service";import { Body, Controller, Post } from "@nestjs/common";
import { UpdateNicknameProfileSiteDto } from "./dto/updateNickname.profile.site";
import { UpdateAvatarProfileSiteDto } from "./dto/updateAvatar.profile.site";
import { AddBioProfileSiteDto } from "./dto/addBio.profile.site";
import { DelBioProfileSiteDto } from "./dto/delBio.profile.site";
import { UpdateBioProfileSiteDto } from "./dto/updateBio.profile.site";
import { SiteW } from "src/auth/authorization.decorator";

@Controller('site/profile')
export class ProfileSiteController {
    constructor(private profileSiteService: ProfileSiteService) { }

    @Post('updateNickname')
    @SiteW()
    updateNickname(@Body() updateNicknameProfileSiteDto: UpdateNicknameProfileSiteDto) {
        return this.profileSiteService.updateNickname(updateNicknameProfileSiteDto);
    }

    @Post('updateAvatar')
    @SiteW()
    updateAvatar(@Body() updateAvatarProfileSiteDto: UpdateAvatarProfileSiteDto){
        return this.profileSiteService.updateAvatar(updateAvatarProfileSiteDto);
    }

    @Post('addBio')
    @SiteW()
    addBio(@Body() addBioProfileSiteDto: AddBioProfileSiteDto){
        return this.profileSiteService.addBio(addBioProfileSiteDto);
    }

    @Post('delBio')
    @SiteW()
    delBio(@Body() delBioProfileSiteDto: DelBioProfileSiteDto){
        return this.profileSiteService.delBio(delBioProfileSiteDto);
    }

    @Post('updateBio')
    @SiteW()
    updateBio(@Body() updateBioProfileSiteDto: UpdateBioProfileSiteDto){
        return this.profileSiteService.updateBio(updateBioProfileSiteDto);
    }
}