import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import {Combo} from "../../base/model/combo.model";

@Component({
    selector: 'alb-form-select',
    template: `
        <select class="form-control m-bootstrap-select"
                id="{{id}}" name="{{name}}" searchItem="{{searchItem}}" 
                attrType="{{attrType}}" operate="{{operate}}" 
                analytiColumn="{{analytiColumn}}" analytiColumnPrefix="{{analytiColumnPrefix}}" 
                class="form-control select2 {{cssClass}}">
            <option *ngFor="let combo of comboData" value="">
                All
            </option>
        </select>`
})
export class FormSelectComponent implements OnDestroy {

    comboData: Combo[];
    name: string;
    searchItem: string;
    operate: string;
    analytiColumn: string;
    analytiColumnPrefix: string;
    itemLabel: string;
    itemValue: string;
    attrType: string;
    id: string;
    cssClass: string;
    dataOptions: string;
    boxType: string;
    data: string;

    // tslint:disable-next-line: no-unused-variable
    constructor() {

    }

    ngOnDestroy() {

    }

    addErrorAlert(message, key?, data?) {

    }


}
