import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { CTX } from "../../../../../app.constants"
import { ActivatedRoute } from "@angular/router"
import { Dict } from "./dict.model"
import { DictService } from "./dict.service"

@Component({
    selector: ".sys-dict-form.page-form",
    templateUrl: "./dict.form.component.html"
})
export class DictFormComponent implements OnInit, OnDestroy, AfterViewInit {

    dict: Dict
    routerSub: any
    ctx: any
    id: any

    private afterViewInit = false
    private afterLoad = false
    constructor(
        private router: ActivatedRoute,
        private dictService: DictService) {
        this.ctx = CTX
        this.dict = new Dict()

    }

    ngOnInit() {
        this.routerSub = this.router.params.subscribe((params) => {
            this.id = params['id']
            if (this.id) {
                this.dictService.find(this.id).subscribe((data) => {
                    this.dict = data
                    albedoForm.setData("#dict-save-form", this.dict)
                    this.afterLoad = true
                    this.initForm()
                })
            } else {
                this.afterLoad = true
                this.initForm()
            }
        })
    }

    ngOnDestroy() {
        this.routerSub.unsubscribe()
    }

    ngAfterViewInit() {
        // this._script.load('.sys-dict-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js')
        this.afterViewInit = true
        this.initForm()
    }

    initForm() {
        if (!this.afterViewInit || !this.afterLoad) return

        var dictId = this.dict.id
        albedoForm.initValidate($("#dict-save-form"), {
            // define validation rules
            rules: {
                name: { remote: CTX + '/sys/dict/checkByProperty?_statusFalse&id=' + encodeURIComponent(dictId) },
            },
            messages: {
                code: { message: '编码已存在' },
            },
        })
        albedoForm.init()
        albedoForm.initSave(null)


    }

}
