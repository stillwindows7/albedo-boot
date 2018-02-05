import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {CTX} from "../../../../../../app.constants"
import {DataService} from "../../../../../../shared/base/service/data.service";
import {User} from "./user.model";


@Injectable()
export class UserService extends DataService<User> {

    constructor(protected http: Http) {
        super(http, CTX + '/sys/user')
    }





}
