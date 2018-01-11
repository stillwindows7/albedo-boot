import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from '../../app.constants';

@Injectable()
export class AccountService {
    constructor(private http: Http) {
    }

    get(): Observable<any> {
        return this.http.get(SERVER_API_URL + '/account').map((res: any) => res);
    }

    save(account: any): Observable<any> {
        return this.http.post(SERVER_API_URL + '/account', account);
    }
}
