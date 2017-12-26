import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptLoaderService} from "../../../../shared/base/service/script-loader.service";
import {DictQuery} from "../../../../shared/sys/dict/dict.query.model";
import {SERVER_API_URL} from "../../../../app.constants";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";

@Component({
    selector: ".sys-user-form",
    templateUrl: "./user.form.component.html",
})
export class UserFormComponent implements OnInit, AfterViewInit {


    dictQueryStatus: DictQuery = new DictQuery("sys_status")

    constructor(private _script: ScriptLoaderService,
                private localStorage: LocalStorageService,
                private sessionStorage: SessionStorageService) {

    }

    ngOnInit() {
    }
    ngAfterViewInit() {
        // this._script.load('.sys-user-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.initForm()
    }

    initForm(){
        let validator = $( "#m_form_1" ).validate({
            // define validation rules
            rules: {
                date: {
                    required: true,
                    date: true
                },
                daterange: {
                    required: true
                },
                datetime: {
                    required: true
                },
                time: {
                    required: true
                },

                select: {
                    required: true,
                    minlength: 2,
                    maxlength: 4
                },
                select2: {
                    required: true
                },
                typeahead: {
                    required: true
                },

                switch: {
                    required: true
                },

                summernote: {
                    required: true
                },
                markdown: {
                    required: true
                }
            },

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
