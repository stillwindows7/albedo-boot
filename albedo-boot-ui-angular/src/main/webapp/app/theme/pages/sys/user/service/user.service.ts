import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {User} from "./user.model"
import {DataService} from "../../../../../shared"
import {CTX} from "../../../../../app.constants"


@Injectable()
export class UserService extends DataService<User> {

    constructor(protected http: Http) {
        super(http, CTX + '/sys/user')
    }





}
