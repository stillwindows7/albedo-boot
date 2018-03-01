import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { CTX } from "../../../../../app.constants"
import { DataService } from "../../../../../shared/base/service/data.service"
import { Org } from "./org.model"
import { HttpClient } from "@angular/common/http";


@Injectable()
export class OrgService extends DataService<Org> {

    constructor(protected http: HttpClient) {
        super(http, CTX + '/sys/org')
    }

}
