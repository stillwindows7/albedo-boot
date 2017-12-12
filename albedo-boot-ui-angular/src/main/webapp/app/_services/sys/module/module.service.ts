import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from "../../../app.constants";
import { ResponseWrapper } from "../model/response-wrapper.model";
import { createRequestOption } from "../model/request-util";
import { Module } from "./module.model";


@Injectable()
export class ModuleService {
    private resourceUrl = SERVER_API_URL + 'api/sys/module';

    constructor(private http: Http) { }

    save(user: Module): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, user)
            .map((res: Response) => this.convertResponse(res));
    }

    // update(user: Module): Observable<ResponseWrapper> {
    //     return this.http.put(this.resourceUrl, user)
    //         .map((res: Response) => this.convertResponse(res));
    // }

    find(login: string): Observable<Module> {
        return this.http.get(`${this.resourceUrl}/${login}`).map((res: Response) => res.json());
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    menus(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + '/menus')
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
}
