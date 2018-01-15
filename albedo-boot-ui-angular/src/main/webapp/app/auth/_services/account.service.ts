import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {CTX} from '../../app.constants';

@Injectable()
export class AccountService {
    constructor(private http: Http) {
    }

    get(): Observable<any> {
        return this.http.get(CTX + '/account').map((res: any) => res);
    }

    save(account: any): Observable<any> {
        return this.http.post(CTX + '/account', account);
    }
}
