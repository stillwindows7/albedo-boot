import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from "../../../app.constants";
import {ResponseWrapper} from "../../base/model/response-wrapper.model";
import {DataService} from "../../base/service/data.service";
import {Module} from "./module.model";


@Injectable()
export class ModuleService extends DataService<Module> {

    constructor(protected http: Http) {
        super(http, SERVER_API_URL + 'sys/module');
    }


    menus(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + '/menus')
            .map((res: Response) => this.convertResponse(res));
    }

}
