import {JhiAlertService, JhiHttpInterceptor} from 'ng-jhipster';
import {RequestOptionsArgs, Response} from '@angular/http';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MSG_TYPE_ERROR, MSG_TYPE_INFO, MSG_TYPE_SUCCESS, MSG_TYPE_WARNING} from "../app.constants";

export class NotificationInterceptor extends JhiHttpInterceptor {

    // private alertService: JhiAlertService;

    // tslint:disable-next-line: no-unused-variable
    constructor(private injector: Injector) {
        super();
        // setTimeout(() => toastr = injector.get(JhiAlertService));
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        return observable.map((response: any) => {
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
                    if (toastr) {
                        const alertParam = headers.length >= 2 ? response.headers.get(headers[1]) : null;
                        toastr.success(alertKey, {param: alertParam});
                    }
                }
            }
            var obj = response.json();
            if (obj) {
                // toastr.info(reData.msg, {});
                if (obj.status && obj.status != MSG_TYPE_SUCCESS) {
                    if (obj.status == MSG_TYPE_INFO) {
                        toastr.info(obj.msg);
                    } else if (obj.status == MSG_TYPE_WARNING) {
                        toastr.warning(obj.msg);
                    } else if (obj.status == MSG_TYPE_ERROR) {
                        toastr.error(obj.msg);
                    }
                }
            }
            return obj.data ? obj.data : obj;
        }).catch((error) => {
            toastr && toastr.error('网络异常，请检查您的网络连接！', {closeButton: true, positionClass: 'toast-bottom-right'})
            return Observable.throw(error); // here, response is an error
        });
    }
}
