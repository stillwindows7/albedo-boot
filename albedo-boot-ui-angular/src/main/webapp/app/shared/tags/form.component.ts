import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import {Combo} from "../base/model/combo.model";

@Component({
    selector: 'alb-form',
    template: '<span id="form-{{id}}"></span>'
})
export class FormSelectComponent implements AfterViewInit {
    static BOX_TYPE_SELECT: "select";
    static BOX_TYPE_CHECKBOX: "checkbox";
    static BOX_TYPE_RADIO: "radio";
    data : string;
    dictCode : string;
    filter : string;
    combo : string;
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
    value: string;
    cssClass: string;
    dataOptions: string;
    boxType: string;
    data: string;

    // tslint:disable-next-line: no-unused-variable
    constructor() {



    }
/**/
    ngAfterViewInit(): void {

        let $formTag;
        if(this.boxType == FormSelectComponent.BOX_TYPE_SELECT){
            $formTag = $("<select class=\"form-control m-bootstrap-select\"\n" +
                "                id=\""+this.id+"\" name=\""+this.name+"\" searchItem=\""+this.searchItem+"\" \n" +
                "                attrType=\""+this.attrType+"\" operate=\""+this.operate+"\" \n" +
                "                analytiColumn=\""+this.analytiColumn+"\" analytiColumnPrefix=\""+this.analytiColumnPrefix+"\" \n" +
                "                class=\"form-control select2 "+this.cssClass+"\">\n" +
                "        </select>");
            /* "            <option *ngFor=\"let combo of comboData\" value=\""+this.combo+"\" \n" +
                "                    [ng.selected]=\"value == combo.id ? 'selected' : ''\" >\n" +
                "               "+this.combo.name+"\n" +
                "            </option>\n" +*/
            if (this.cssClass.indexOf("required")==-1) {
                $formTag.append($("<option value=\"\">请选择...</option>"))
            }

            this.comboData
        }

    }
}
