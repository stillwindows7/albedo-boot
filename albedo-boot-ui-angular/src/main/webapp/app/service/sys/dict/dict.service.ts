import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CTX } from "../../../app.constants";
import { DataService } from "../../../shared/base/service/data.service";
import { Dict } from "./dict.model";
import { createRequestOption } from "../../../shared/base/request.util";


@Injectable()
export class DictService extends DataService<Dict>{

    constructor(protected http: Http) {
        super(http, CTX + '/sys/dict');
    }


    codes(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/codes', options)
            .map((data: any) => data);
    }

}
