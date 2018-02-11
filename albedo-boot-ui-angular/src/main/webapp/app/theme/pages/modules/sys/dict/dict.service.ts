import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Rx'
import {CTX} from "../../../../../app.constants";
import {Dict} from "./dict.model";
import {createRequestOption} from "../../../../../shared/base/request.util";
import {DataService} from "../../../../../shared/base/service/data.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class DictService extends DataService<Dict>{

    constructor(protected http: HttpClient) {
        super(http, CTX + '/sys/dict')
    }


    codes(req?: any): Observable<any> {
        const options = createRequestOption(req)
        return this.http.get(this.resourceUrl + '/codes', options)
            .map((data: any) => data)
    }

}
