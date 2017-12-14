import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from "../../../app.constants";
import { User } from "./user.model";
import { ResponseWrapper } from "../../base/model/response-wrapper.model";
import { createRequestOption } from "../../base/request-util";
import {DataService} from "../../base/service/data.service";
import {Module} from "../module/module.model";


@Injectable()
export class UserService extends DataService<User> {

    constructor(protected http: Http) {
        super(http, SERVER_API_URL + 'sys/user');
    }


    authorities(): Observable<string[]> {
        return this.http.get(SERVER_API_URL + 'api/users/authorities').map((res: Response) => {
            const json = res.json();
            return <string[]>json;
        });
    }


}
