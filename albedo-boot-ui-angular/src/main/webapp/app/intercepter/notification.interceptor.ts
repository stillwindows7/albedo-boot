import {JhiAlertService, JhiHttpInterceptor} from 'ng-jhipster';
import {RequestOptionsArgs, Response} from '@angular/http';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MSG_TYPE_ERROR, MSG_TYPE_INFO, MSG_TYPE_SUCCESS, MSG_TYPE_WARNING} from "../app.constants";

export class NotificationInterceptor extends JhiHttpInterceptor {

    private alertService: JhiAlertService;

    // tslint:disable-next-line: no-unused-variable
    constructor(private injector: Injector) {
        super();
        setTimeout(() => this.alertService = injector.get(JhiAlertService));
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        return observable.map((response: Response) => {
            const headers = [];
            response.headers.forEach((value, name) => {
                if (name.toLowerCase().endsWith('app-alert') || name.toLowerCase().endsWith('app-params')) {
                    headers.push(name);
                }
            });
            if (headers.length > 1) {
                headers.sort();
                const alertKey = response.headers.get(headers[0]);
                if (typeof alertKey === 'string') {
                    if (this.alertService) {
                        const alertParam = headers.length >= 2 ? response.headers.get(headers[1]) : null;
                        this.alertService.success(alertKey, {param: alertParam}, null);
                    }
                }
            }

            if (response.json()) {
                const reData = response.json();
                if (reData.status && reData.status != MSG_TYPE_SUCCESS) {
                    if (reData.status == MSG_TYPE_INFO) {
                        this.alertService.info(reData.msg, {}, null);
                    } else if (reData.status == MSG_TYPE_WARNING) {
                        this.alertService.warning(reData.msg, {}, null);
                    } else if (reData.status == MSG_TYPE_ERROR) {
                        this.alertService.error(reData.msg, {}, null);
                    }
                }
            }

            return response;
        }).catch((error) => {
            return Observable.throw(error); // here, response is an error
        });
    }
}
