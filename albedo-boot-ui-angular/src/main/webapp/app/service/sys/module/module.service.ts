import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {CTX} from "../../../app.constants";
import {DataService} from "../../../shared/base/service/data.service";
import {Module} from "./module.model";
import {createRequestOption} from "../../../shared";


@Injectable()
export class ModuleService extends DataService<Module> {

    constructor(protected http: Http) {
        super(http, CTX + '/sys/module');
    }


    menus(): Observable<any> {
        return this.data(createRequestOption({ type: 'menu' }));
    }

    data(params?: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/data', params)
            .map((data: any) => data);
    }

    treeData(): Observable<any> {
        return this.http.get(this.resourceUrl + '/findTreeData')
            .map((data: any) => data);
    }



}
