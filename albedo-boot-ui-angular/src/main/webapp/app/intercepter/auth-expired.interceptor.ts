import { HttpInterceptor } from 'ng-jhipster';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';
import {Principal} from "../auth/_services/principal.service";
import {AuthService} from "../auth/_services/auth.service";

export class AuthExpiredInterceptor extends HttpInterceptor {

    constructor(private injector: Injector) {
        super();
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        let self = this;

        return <Observable<Response>>observable.catch((error, source) => {
            if (error.status === 401) {
                let principal: Principal = self.injector.get(Principal);

                if (principal.isAuthenticated()) {
                    let auth: AuthService = self.injector.get(AuthService);
                    auth.authorize(true);
                }
            }
            return Observable.throw(error);
        });
    }
}
