import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DictQuery} from "../../../../shared/sys/dict/dict.query.model";
import {SERVER_API_URL} from "../../../../app.constants";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../shared/sys/user/user.service";
import {User} from "../../../../shared/sys/user/user.model";
import {ComboData} from "../../../../shared";
import {ResponseWrapper} from "../../../../shared/base/model/response-wrapper.model";
import {RoleService} from "../../../../shared/sys/role/role.service";

@Component({
    selector: ".sys-user-form.page-form",
    templateUrl: "./user.form.component.html"
})
export class UserFormComponent implements OnInit, AfterViewInit {


    dictQueryStatus: DictQuery = new DictQuery("sys_status")
    allRoles: ComboData[];
    user: User;
    routeSub: any;
    ctx: any;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private roleService: RoleService) {
        this.ctx = SERVER_API_URL;
        this.user = new User();

    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            params['id'] && this.userService.find(params['id']).subscribe((data) => {
                this.user = data;
            });
        });
        this.roleService.comboData().subscribe(
            (res: ResponseWrapper) => {
                this.allRoles = res.json.data;
                console.log(this.allRoles);
            }
        );
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    ngAfterViewInit() {
        // this._script.load('.sys-user-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.initForm()
    }

    initForm(){
        let validator = $( "#user-save-form" ).validate({
            // define validation rules
            rules: {
                loginId: {remote: SERVER_API_URL+'/sys/user/checkByProperty?_statusFalse&id=' + encodeURIComponent(this.user.id)}
            },
            messages:{loginId:{message:'登录Id已存在'}},
            //display error alert on form submit
            invalidHandler: function(event, validator) {
                console.log(validator);
                mApp.alert({
                    container: '.m-form__content',
                    type: 'danger',
                    icon: 'warning',
                    message: '验证失败'
                });
            },

            submitHandler: function (form) {
                //form[0].submit(); // submit the form
            }
        });

        albedoForm.init();
    }



}
