import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReqLog } from "./entities/ReqLog.entities";
import { Repository } from "typeorm";

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(ReqLog) private reqLogRepository: Repository<ReqLog>
    ) { }

    async logReq(reqLog) {
        await this.reqLogRepository.insert(reqLog);
    }
}