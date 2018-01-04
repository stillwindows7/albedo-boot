import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from "../../../app.constants";
import {DataService} from "../../base/service/data.service";
import {Role} from "./role.model";
import {ResponseWrapper} from "../../base/model/response-wrapper.model";
import {convertResponse} from "../../base/request-util";


@Injectable()
export class RoleService extends DataService<Role> {

    constructor(protected http: Http) {
        super(http, SERVER_API_URL + '/sys/role');
    }


    comboData(): Observable<ResponseWrapper> {


        return this.http.get(this.resourceUrl + '/comboData')
            .map((res: Response) => convertResponse(res) );
    }


}
