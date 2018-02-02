import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {CTX} from "../../../../../app.constants"
import {GenScheme} from "./genScheme.model"
import {DataService} from "../../../../../shared/index"
import {createRequestOption} from "../../../../../shared/base/request.util"
import {Observable} from "rxjs/Rx"


@Injectable()
export class GenSchemeService extends DataService<GenScheme> {

    constructor(protected http: Http) {
        super(http, CTX + '/gen/genScheme')
    }
    formData(params: any) {
        return this.queryUrl(params, 'formData')
    }
}
