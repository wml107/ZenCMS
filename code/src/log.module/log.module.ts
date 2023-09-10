import { Module } from "@nestjs/common";
import { LogService } from "./log.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReqLog } from "./entities/ReqLog.entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReqLog]),
    ],
    controllers: [],
    providers: [LogService],
    exports: [LogService]
})

export class LogModule { }