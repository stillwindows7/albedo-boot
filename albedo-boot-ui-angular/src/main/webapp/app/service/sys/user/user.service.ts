import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CTX } from "../../../app.constants";
import { User } from "./user.model";
import { DataService } from "../../../shared";


@Injectable()
export class UserService extends DataService<User> {

    constructor(protected http: Http) {
        super(http, CTX + '/sys/user');
    }





}
