import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {CTX} from "../../../../../../app.constants"
import {GenScheme} from "./genScheme.model"
import {DataService} from "../../../../../../shared/base/service/data.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class GenSchemeService extends DataService<GenScheme> {

    constructor(protected http: HttpClient) {
        super(http, CTX + '/gen/genScheme')
    }
    formData(params: any) {
        return this.queryUrl(params, 'formData')
    }
}
