import { ReqLog } from "./entities/ReqLog.entities";
import { Repository } from "typeorm";
export declare class LogService {
    private reqLogRepository;
    constructor(reqLogRepository: Repository<ReqLog>);
    logReq(reqLog: any): Promise<void>;
}
