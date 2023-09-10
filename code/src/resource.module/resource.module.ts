import { Module } from "@nestjs/common";
import { ResourceService } from "./resource.service";
import { ResourceController } from "./resource.controller";

@Module({
    imports: [],
    controllers: [ResourceController],
    providers: [ResourceService],
})
export class ResourceModule { }