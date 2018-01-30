import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CTX} from "../../../../app.constants";
import {ActivatedRoute} from "@angular/router";
import {GenTable} from "../../../../service/gen/user/genTable.model";
import {GenTableService} from "../../../../service/gen/user/genTable.service";

@Component({
    selector: ".sys-genTable-form.page-form",
    templateUrl: "./genTable.form.component.html"
})
export class GenTableFormComponent implements OnInit, OnDestroy, AfterViewInit {

    genTable: GenTable;
    routerSub: any;
    ctx: any;
    id: any;

    private afterViewInit = false;
    private afterLoad = false;
    constructor(
        private router: ActivatedRoute,
        private genTableService: GenTableService) {
        this.ctx = CTX;
        this.genTable = new GenTable();

    }

    ngOnInit() {
        this.routerSub = this.router.params.subscribe((params) => {
            this.id = params['id'];
            if (this.id) {
                this.genTableService.find(this.id).subscribe((data) => {
                    this.genTable = data;
                    albedoForm.initFormData("#genTable-save-form", this.genTable);
                    this.afterLoad = true;
                    this.initForm();
                });
            } else {
                this.afterLoad = true;
                this.initForm();
            }
        });
    }

    ngOnDestroy() {
        this.routerSub.unsubscribe();
    }

    ngAfterViewInit() {
        // this._script.load('.sys-genTable-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.afterViewInit = true;
        this.initForm();
    }

    initForm() {
        if (!this.afterViewInit || !this.afterLoad) return;

        var genTableId = this.genTable.id;
        albedoForm.initValidate($("#genTable-save-form"), {
            // define validation rules
            rules: {
                loginId: { remote: CTX + '/gen/genTable/checkByProperty?_statusFalse&id=' + encodeURIComponent(genTableId) },
                status: { required: true },
                roleIdList: { required: true },
            },
            messages: {
                loginId: { message: '登录Id已存在' },
            },
        });
        albedoForm.init();
        albedoForm.initSave();


    }



}
