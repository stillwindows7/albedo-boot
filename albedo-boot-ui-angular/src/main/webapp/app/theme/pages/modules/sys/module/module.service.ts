import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { CTX } from "../../../../../app.constants"
import { DataService } from "../../../../../shared/base/service/data.service"
import { Module } from "./module.model"
import { createRequestOption } from "../../../../../shared/base/request.util";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ModuleService extends DataService<Module> {

    constructor(protected http: HttpClient) {
        super(http, CTX + '/sys/module')
    }



    formData(id?: String, parentId?: String): Observable<Module> {
        let params = {};
        if (id) params["id"] = id;
        if (parentId) params["parentId"] = parentId;
        return this.http.get(this.resourceUrl + `/formData`, createRequestOption(params)).map((res: any) => {
            return res && res.data
        })
    }

    menus(): Observable<any> {
        return this.data(createRequestOption({ type: 'menu' }))
    }

    data(params?: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/data', params)
            .map((res: any) => res && res.data)
    }

    treeData(): Observable<any> {
        return this.http.get(this.resourceUrl + '/findTreeData')
            .map((res: any) => res && res.data)
    }



}
