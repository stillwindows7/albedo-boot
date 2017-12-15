import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from "../../../app.constants";
import { ResponseWrapper } from "../../base/model/response-wrapper.model";
import {DataService} from "../../base/service/data.service";
import {Dict} from "./dict.model";
import {createRequestOption} from "../../base/request-util";


@Injectable()
export class DictService extends DataService<Dict>{

    constructor(protected http: Http) {
        super(http, SERVER_API_URL + 'sys/dict');
    }


    dataList(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/codes', options)
            .map((res: Response) => this.convertResponse(res));
    }

}
