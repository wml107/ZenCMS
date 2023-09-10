import { Module } from "@nestjs/common";
import { StructureController } from "./structure.controller";
import { StructureService } from "./structure.service";

@Module({
    imports: [],
    controllers: [StructureController],
    providers: [StructureService]
})

export class StructureModule { }