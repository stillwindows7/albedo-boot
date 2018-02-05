import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {CTX} from "../../../../../../app.constants"
import {DataService} from "../../../../../../shared/base/service/data.service";
import {TaskScheduleJob} from "./taskScheduleJob.model";


@Injectable()
export class TaskScheduleJobService extends DataService<TaskScheduleJob> {

    constructor(protected http: Http) {
        super(http, CTX + '/sys/taskScheduleJob')
    }

}