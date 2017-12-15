import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import {Combo, ComboSearch} from "../base/model/combo.search.model";
import {ScriptLoaderService} from "../base/service/script-loader.service";
import {DictService} from "../sys/dict/dict.service";
import {DictQuery} from "../sys/dict/dict.Query.model";
import {ComboData} from "../base/model/combo.data.model";

@Component({
    selector: 'alb-form',
    template: '<span id="form-item-{{id}}"></span>'
})
export class FormSelectComponent implements OnInit, AfterViewInit {

    static BOX_TYPE_SELECT: "select";
    static BOX_TYPE_CHECKBOX: "checkbox";
    static BOX_TYPE_RADIO: "radio";
    data : string;
    dictQuery : DictQuery;
    comboSearch : ComboSearch;
    comboData: ComboData[];
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
    private afterViewInit = false;

    // tslint:disable-next-line: no-unused-variable
    constructor(private dictService: DictService) {



    }

    ngOnInit(): void {
        let params = this.dictQuery!=null? this.dictQuery : this.comboSearch;
        this.dictService.codes(params).map(item=>{
            this.comboData=item.json.data;
            this.initTags();
        });

    }


/**/
    ngAfterViewInit(): void {
        this.afterViewInit=true;
        this.initTags();
    }


    private initTags(){
        if(this.afterViewInit!=true || this.comboData==null)return;
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
            this.comboData.forEach(item=>{
                $formTag.append($("<option value=\""+item.id+"\" "+(this.value==item.id?"selected='selected'":"")+">"+item.name+"</option>"))
            })
        }
        $("#form-item-"+this.id).before($formTag);
        $("#form-item-"+this.id).remove();
    }

}
