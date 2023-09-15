import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata("isPublic", true);

export const PostW = () => SetMetadata("claim", "PostW");

export const ResourceR = () => SetMetadata("claim", "ResourceR");

export const ResourceW = () => SetMetadata("claim", "ResourceW");

export const SiteR = () => SetMetadata("claim", "SiteR");

export const SiteW = () => SetMetadata("claim", "SiteW");

export const StructureW = () => SetMetadata("claim", "StructureW");

export const UserR = () => SetMetadata("claim", "UserR");

export const UserW = () => SetMetadata("claim", "UserW");