import {Injectable} from '@angular/core'
import {CTX} from "../../../../../app.constants"
import {Role} from "./role.model"
import {DataService} from "../../../../../shared/base/service/data.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class RoleService extends DataService<Role> {

    constructor(protected http: HttpClient) {
        super(http, CTX + '/sys/role')
    }




}
