import {AfterViewInit, Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { DictQuery } from "../../../../shared/sys/dict/dict.query.model";
import { SERVER_API_URL } from "../../../../app.constants";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../../shared/sys/user/user.service";
import { User } from "../../../../shared/sys/user/user.model";
import {OnChanges} from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector: ".sys-user-form.page-form",
    templateUrl: "./user.form.component.html"
})
export class UserFormComponent implements OnInit, OnDestroy, AfterViewInit {

    dictQueryStatus: DictQuery = new DictQuery("sys_status")
    user: User;
    routeSub: any;
    ctx: any;

    private afterViewInit = false;
    private afterLoad = false;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService) {
        this.ctx = SERVER_API_URL;
        this.user = new User();

    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            var id = params['id'];
            if(id){
                this.userService.find(params['id']).subscribe((data) => {
                    this.user = data;
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
        this.routeSub.unsubscribe();
    }

    ngAfterViewInit() {
        // this._script.load('.sys-user-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.afterViewInit = true;
        this.initForm();
    }

    initForm() {
        if(!this.afterViewInit || !this.afterLoad) return;

        var userId = this.user.id;
        albedoForm.initValidate($("#user-save-form"), {
            // define validation rules
            rules: {
                loginId: { remote: SERVER_API_URL + '/sys/user/checkByProperty?_statusFalse&id=' + encodeURIComponent(userId) },
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
