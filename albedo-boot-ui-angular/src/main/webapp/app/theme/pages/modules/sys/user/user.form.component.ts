import { AfterViewInit, Component } from '@angular/core'
import { CTX } from "../../../../../app.constants"
import { ActivatedRoute } from "@angular/router"
import { UserService } from "./user.service"
import { User } from "./user.model"
import { Helpers } from "../../../../../helpers";

@Component({
    selector: ".sys-user-form.page-form",
    templateUrl: "./user.form.component.html"
})
export class UserFormComponent implements AfterViewInit {

    user: User
    routeData: any
    ctx: any
    id: any

    private afterViewInit = false
    private afterLoad = false
    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService) {
        this.ctx = CTX
        this.user = new User()
        this.routeData = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id']
            if (this.id) {
                this.userService.find(this.id).subscribe((data) => {
                    this.user = data
                    albedoForm.setData("#user-save-form", this.user)
                    this.afterLoad = true
                    this.initForm()
                })
            } else {
                this.afterLoad = true
                this.initForm()
            }
        })
    }


    ngAfterViewInit() {
        this.afterViewInit = true
        this.initForm()
    }

    initForm() {
        if (!this.afterViewInit || !this.afterLoad) return

        var userId = this.user.id
        albedoForm.initValidate($("#user-save-form"), {
            // define validation rules
            rules: {
                loginId: { remote: CTX + '/sys/user/checkByProperty?_statusFalse&id=' + encodeURIComponent(userId) },
                status: { required: true },
                roleIdList: { required: true },
            },
            messages: {
                loginId: { message: '登录Id已存在' },
            },
        })
        albedoForm.init()
        albedoForm.initSave()


    }



}
