import { ProfileSiteService } from "./profile.site.service";
import { UpdateNicknameProfileSiteDto } from "./dto/updateNickname.profile.site";
import { UpdateAvatarProfileSiteDto } from "./dto/updateAvatar.profile.site";
import { AddBioProfileSiteDto } from "./dto/addBio.profile.site";
import { DelBioProfileSiteDto } from "./dto/delBio.profile.site";
import { UpdateBioProfileSiteDto } from "./dto/updateBio.profile.site";
export declare class ProfileSiteController {
    private profileSiteService;
    constructor(profileSiteService: ProfileSiteService);
    updateNickname(updateNicknameProfileSiteDto: UpdateNicknameProfileSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    updateAvatar(updateAvatarProfileSiteDto: UpdateAvatarProfileSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    addBio(addBioProfileSiteDto: AddBioProfileSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    delBio(delBioProfileSiteDto: DelBioProfileSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
    updateBio(updateBioProfileSiteDto: UpdateBioProfileSiteDto): {
        statusCode: any;
        message: any;
        data: any;
    };
}
