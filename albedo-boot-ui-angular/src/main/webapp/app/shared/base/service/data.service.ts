import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from "../../../app.constants";
import { ResponseWrapper } from "../../base/model/response-wrapper.model";
import { createRequestOption } from "../../base/request-util";
import {Data} from "../model/data.model";


@Injectable()
export class DataService<T extends Data> {

    constructor(protected http: Http,protected resourceUrl) { }

    save(entity: T): Observable<ResponseWrapper> {
        return this.http.post(this.resourceUrl, entity)
            .map((res: Response) => this.convertResponse(res));
    }

    find(id: string): Observable<T> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => res.json());
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
}
