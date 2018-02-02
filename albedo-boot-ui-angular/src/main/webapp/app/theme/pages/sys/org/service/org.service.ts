import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { CTX } from "../../../../../app.constants"
import { DataService } from "../../../../../shared/base/service/data.service"
import { Org } from "./org.model"


@Injectable()
export class OrgService extends DataService<Org> {

    constructor(protected http: Http) {
        super(http, CTX + '/sys/org')
    }

    treeData(): Observable<any> {
        return this.http.get(this.resourceUrl + '/findTreeData')
            .map((data: any) => data)
    }

}
