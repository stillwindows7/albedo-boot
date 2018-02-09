/**
 * Copyright &copy; 2018 <a href="https://github.com/somewhereMrli/albedo-boot">albedo-boot</a> All rights reserved.
 */
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {CTX} from "../../../../../../app.constants"
import {DataService} from "../../../../../../shared/base/service/data.service";
import {Area} from "./area.model";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AreaService extends DataService<Area> {

    constructor(protected http: HttpClient) {
        super(http, CTX + '/sys/area')
    }

}
