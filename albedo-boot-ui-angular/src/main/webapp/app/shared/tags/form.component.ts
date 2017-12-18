import {AfterViewInit, Component, Directive, Input, OnInit} from '@angular/core';
import {ComboSearch} from "../base/model/combo.search.model";
import {DictService} from "../sys/dict/dict.service";
import {DictQuery} from "../sys/dict/dict.query.model";
import {ComboData} from "../base/model/combo.data.model";
import {ResponseWrapper} from "../base/model/response-wrapper.model";
import {ScriptLoaderService} from "../base/service/script-loader.service";

@Component({
    selector: "alb-form",
    template: "<span id=\"form-item-{{id}}\"></span>"
})
export class AlbFormComponent implements OnInit, AfterViewInit {

    static BOX_TYPE_SELECT = "select";
    static BOX_TYPE_CHECKBOX = "checkbox";
    static BOX_TYPE_RADIO = "radio";
    @Input()
    public data?: string;
    @Input()
    public dictQuery?: DictQuery;
    @Input()
    public comboSearch?: ComboSearch;
    @Input()
    public comboData?: ComboData[];
    @Input()
    public name?: string;
    @Input()
    public searchItem?: string;
    @Input()
    operate?: string;
    @Input()
    analytiColumn?: string;
    @Input()
    analytiColumnPrefix?: string;
    @Input()
    itemLabel?: string;
    @Input()
    itemValue?: string;
    @Input()
    attrType?: string;
    @Input()
    id?: string;
    @Input()
    value?: string;
    @Input()
    cssClass?: string;
    @Input()
    dataOptions?: string;
    @Input()
    boxType?: string;
    private afterViewInit = false;

    // tslint:disable-next-line: no-unused-variable
    constructor(private dictService: DictService,
                private scriptLoaderService: ScriptLoaderService) {



    }

    ngOnInit(): void {
        if (!this.comboData) {
            let params = this.dictQuery != null ? this.dictQuery : this.comboSearch;
            this.dictService.codes(params).subscribe(
                (res: ResponseWrapper) => {
                    this.comboData = res.json.data;
                    this.initTags();
                }
            );
        }
    }


    /**/
    ngAfterViewInit(): void {
        this.afterViewInit = true;
        this.initTags();
    }


    private initTags() {
        if (this.afterViewInit != true || this.comboData == null) return;
        let $formTag;
        this.attrType = this.attrType ? this.attrType : 'like';
        if (this.boxType == AlbFormComponent.BOX_TYPE_SELECT) {
            $formTag = $("<select class=\"form-control m-bootstrap-select\" " +
                "id=\"" + this.id + "\" " +
                "name=\"" + this.name + "\" " +
                "searchItem=\"" + this.searchItem + "\" " +
                "attrType=\"" + this.attrType + "\" " +
                "operate=\"" + this.operate + "\" " +
                "analytiColumn=\"" + this.analytiColumn + "\" " +
                "analytiColumnPrefix=\"" + this.analytiColumnPrefix + "\" " +
                "class=\"form-control select2 " + this.cssClass + "\">" +
                "</select>");

            if (this.cssClass && this.cssClass.indexOf("required") == -1) {
                $formTag.append($("<option value=\"\">请选择...</option>"))
            }
            this.comboData.forEach(item => {
                $formTag.append($("<option value=\"" + item.id + "\" " + (this.value == item.id ? "selected='selected'" : "") + ">" + item.name + "</option>"))
            })
        } else {
            $formTag = $("<div class=\"m-" + this.boxType + "-inline\"></div>");
            let i = 1;
            this.comboData.forEach(item => {
                let valLabel = item.id, nameLabel = item.name;
                $formTag.append($("<label class=\"m-" + this.boxType + "\">" +
                    "<input type=\"" + (AlbFormComponent.BOX_TYPE_CHECKBOX == this.boxType ? AlbFormComponent.BOX_TYPE_CHECKBOX : AlbFormComponent.BOX_TYPE_RADIO) + "\" " +
                    "id=\")" + (this.id ? this.name : this.id) + (i) + "\" " +
                    "name=\"" + name + "\" " +
                    "searchItem=\"" + this.searchItem + "\" " +
                    "attrType=\"" + this.attrType + "\"" +
                    "operate=\"" + this.operate + "\" " +
                    "analytiColumn=\"" + this.analytiColumn + "\" " +
                    "analytiColumnPrefix=\"" + this.analytiColumnPrefix + "\" " +
                    "itemLabel=\"" + this.itemLabel + "\" " +
                    "itemValue=\"" + this.itemValue + "\" " +
                    "value=\"" + valLabel + "\" " +
                    "class=\"" + this.cssClass + "\"" +
                    (valLabel == this.value && this.value.indexOf(valLabel) != -1 ? "checked=\"checked\"" : "") +
                    "data-options=\"" + this.dataOptions + "\"  />" + nameLabel + "<span></span></label>"));
                i++;
            });
        }
        $("#form-item-" + this.id).parent().parent().empty().append($formTag);
        // this.scriptLoaderService.load('.alb-form', 'assets/common/formInit.js');
        $('.m_selectpicker').selectpicker();
    }

}
