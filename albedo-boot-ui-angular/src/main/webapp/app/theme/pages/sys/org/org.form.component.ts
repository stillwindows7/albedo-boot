import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CTX } from "../../../../app.constants";
import { ActivatedRoute } from "@angular/router";
import { Org } from "../../../../service/sys/org/org.model";
import { ModuleService } from "../../../../service/sys/module/module.service";
import { OrgService } from "../../../../service/sys/org/org.service";

@Component({
    selector: ".sys-org-form.page-form",
    templateUrl: "./org.form.component.html"
})
export class OrgFormComponent implements OnInit, OnDestroy, AfterViewInit {

    org: Org;
    routerSub: any;
    ctx: any;
    id: any;

    private afterViewInit = false;
    private afterLoad = false;
    constructor(
        private router: ActivatedRoute,
        private orgService: OrgService) {
        this.ctx = CTX;
        this.org = new Org();

    }

    ngOnInit() {
        this.routerSub = this.router.params.subscribe((params) => {
            this.id = params['id'];
            if (this.id) {
                this.orgService.find(this.id).subscribe((data) => {
                    this.org = data;
                    albedoForm.initFormData("#org-save-form", this.org);
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
        // this._script.load('.sys-org-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.afterViewInit = true;
        this.initForm();
    }

    initForm() {
        if (!this.afterViewInit || !this.afterLoad) return;

        var orgId = this.org.id;
        albedoForm.initValidate($("#org-save-form"), {
            // define validation rules
            rules: {
                name: { remote: CTX + '/sys/org/checkByProperty?_statusFalse&id=' + encodeURIComponent(orgId) },
                code: { remote: CTX + '/sys/org/checkByProperty?_statusFalse&id=' + encodeURIComponent(orgId) },
            },
            messages: {
                name: { message: '机构已存在' },
                code: { message: '编码已存在' },
            },
        });
        albedoForm.init();
        albedoForm.initSave(null);


    }

}
