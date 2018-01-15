import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CTX } from "../../../app.constants";
import { User } from "./user.model";
import { DataService } from "../../base/service/data.service";

import { convertResponse } from "../../base/request-util";

@Injectable()
export class UserService extends DataService<User> {

    constructor(protected http: Http) {
        super(http, CTX + '/sys/user');
    }


    authorities(): Observable<string[]> {
        return this.http.get(CTX + '/sys/user/authorities').map((res: Response) => {
            const json = res.json();
            return <string[]>json;
        });
    }


}
