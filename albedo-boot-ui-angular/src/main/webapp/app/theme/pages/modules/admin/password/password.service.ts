import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {CTX} from "../../../../../app.constants";
import {createRequestOption} from "../../../../../shared/base/request.util";

@Injectable()
export class PasswordService {

    constructor(private http: HttpClient) {}

    save(newPassword: string, oldPassword: string): Observable<any> {
        var options = {
            newPassword: newPassword,
            oldPassword: oldPassword,
        };
        return this.http.post(CTX + 'api/account/change-password',
            createRequestOption(options));
    }
}
