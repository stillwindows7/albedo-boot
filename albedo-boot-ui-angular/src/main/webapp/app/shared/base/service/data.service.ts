import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ResponseWrapper } from "../../base/model/response-wrapper.model";
import { Data } from "../model/data.model";
import { createRequestOption, convertResponse } from "../request.util";


@Injectable()
export class DataService<T extends Data> {

    constructor(protected http: Http, protected resourceUrl) { }

    save(entity: T): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, entity)
            .map((data: any) => convertResponse(data));
    }

    find(id: string): Observable<T> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((data: any) => {
            return data;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


}
