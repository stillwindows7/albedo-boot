import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CTX} from "../../../../app.constants";
import {ActivatedRoute} from "@angular/router";
import {Module} from "../../../../service/sys/module/module.model";
import {ModuleService} from "../../../../service/sys/module/module.service";

@Component({
    selector: ".sys-module-form.page-form",
    templateUrl: "./module.form.component.html"
})
export class ModuleFormComponent implements OnInit, OnDestroy, AfterViewInit {

    module: Module;
    routerSub: any;
    ctx: any;
    id: any;

    private afterViewInit = false;
    private afterLoad = false;
    constructor(
        private router: ActivatedRoute,
        private moduleService: ModuleService) {
        this.ctx = CTX;
        this.module = new Module();

    }

    ngOnInit() {
        this.routerSub = this.router.params.subscribe((params) => {
            this.id = params['id'];
            if(this.id){
                this.moduleService.find(this.id).subscribe((data) => {
                    this.module = data;
                    albedoForm.initFormData("#module-save-form", this.module);
                    this.afterLoad = true;
                    this.initForm();
                });
            }else{
                this.afterLoad = true;
                this.initForm();
            }
        });
    }

    ngOnDestroy() {
        this.routerSub.unsubscribe();
    }

    ngAfterViewInit() {
        // this._script.load('.sys-module-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.afterViewInit = true;
        this.initForm();
    }

    initForm() {
        if(!this.afterViewInit || !this.afterLoad) return;

        var moduleId = this.module.id;
        albedoForm.initValidate($("#module-save-form"), {
            // define validation rules
            rules: {
                permission: { remote: CTX + '/sys/module/checkByProperty?_statusFalse&id=' + encodeURIComponent(moduleId) },
            },
            messages: {
                permission: { message: '权限已存在' },
            },
        });
        albedoForm.init();
        albedoForm.initSave(null);


    }

}
