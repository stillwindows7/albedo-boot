import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from "../../../app.constants";
import { ResponseWrapper } from "../../base/model/response-wrapper.model";
import { DataService } from "../../base/service/data.service";
import { Module } from "./module.model";
import { createRequestOption } from "../../";
import { convertResponse } from "../../base/request-util";


@Injectable()
export class ModuleService extends DataService<Module> {

    constructor(protected http: Http) {
        super(http, SERVER_API_URL + '/sys/module');
    }


    menus(): Observable<any> {
        return this.data(createRequestOption({ type: 'menu' }));
    }

    data(params?: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/data', params)
            .map((data: any) => data);

    }


}
