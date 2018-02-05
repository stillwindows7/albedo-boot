import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {CTX} from "../../../../../../app.constants"
import {GenTable} from "./genTable.model"
import {DataService} from "../../../../../../shared/base/service/data.service";


@Injectable()
export class GenTableService extends DataService<GenTable> {

    constructor(protected http: Http) {
        super(http, CTX + '/gen/genTable')
    }

    formData(params: any) {
        return this.queryUrl(params, 'formData')
    }
}
