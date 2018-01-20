import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptLoaderService} from "../../../../shared/base/service/script-loader.service";
import {CTX} from "../../../../app.constants";
import {SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {Principal} from "../../../../auth/_services/principal.service";

declare let datatable: any;
@Component({
    selector: ".sys-user-list.page-list",
    templateUrl: "./user.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit,OnDestroy, AfterViewInit {


    routerSub: any;
    constructor(private _script: ScriptLoaderService,
        private router: ActivatedRoute,
                private    principal: Principal,
        private sessionStorage: SessionStorageService) {

    }



    ngOnInit() {
        this.routerSub = this.router.url.subscribe((urlSegment) => {
            // console.log(urlSegment)
        });
    }

    ngOnDestroy() {
        this.routerSub.unsubscribe();
    }

    ngAfterViewInit() {
        // this._script.load('.sys-user-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.initTable()
        // Helpers.setBreadcrumbs();
    }

    initTable() {
        var thisPrincipal = this.principal;
        // const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        var options = {
            data: {
                source: {
                    read: {
                        // sample GET method
                        method: 'GET',
                        url: CTX + '/sys/user/',
                    },
                },
                pageSize: 10,
            },
            // columns definition
            columns: [
                {
                    field: 'orgName',
                    title: '所属组织',
                    // width: 40,
                    textAlign: 'center',
                }, {
                    field: 'loginId',
                    title: '登录Id',
                    sortable: 'asc',
                    width: 150,
                    // basic templating support for column rendering,
                    // template: '{{OrderID}} - {{ShipCountry}}',
                }, {
                    field: 'email',
                    title: '邮箱',
                    width: 150,
                    // template: function (row) {
                    //     // callback function support for column rendering
                    //     return row.ShipCountry + ' - ' + row.ShipCity;
                    // },
                }, {
                    field: 'status',
                    title: '状态',
                    // callback function support for column rendering
                    template: function(row) {
                        var status = {
                            // 1: {'title': 'Pending', 'class': 'm-badge--brand'},
                            // 2: {'title': 'Delivered', 'class': ' m-badge--metal'},
                            // 3: {'title': 'Canceled', 'class': ' m-badge--primary'},
                            "正常": { 'title': 'Success', 'class': ' m-badge--success' },
                            "审核": { 'title': 'Info', 'class': ' m-badge--info' },
                            "删除": { 'title': 'Danger', 'class': ' m-badge--danger' },
                            "失效": { 'title': 'Warning', 'class': ' m-badge--warning' },
                        };
                        return '<span class="m-badge ' + status[row.status].class + ' m-badge--wide">' + row.status + '</span>';
                    },
                }, {
                    field: 'lastModifiedDate',
                    title: '修改时间',
                }, {
                    field: 'Actions',
                    width: 110,
                    title: '操作',
                    sortable: false,
                    overflow: 'visible',
                    template: function(row) {
                        var template = '';
                        if (thisPrincipal.hasAuthority("sys_user_edit"))
                            template += '<a href="#/sys/user/form/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="编辑">\
                                \<i class="la la-edit"></i>\
                                \</a>';
                        if (thisPrincipal.hasAuthority("sys_user_lock"))
                            template += '<a href="javascript:void(0)" class="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill confirm" title="' + (row.status == "正常" ? "锁定" : "解锁") + '用户"\
						 data-table-id="#data-table-user" data-method="put"  data-title="你确认要操作【' + row.loginId + '】用户吗？" data-url="' + CTX + '/sys/user/' + row.id + '">\
                                \<i class="la la-'+ (row.status == "正常" ? "unlock-alt" : "unlock") + '"></i>\
                                \</a>';
                        if (thisPrincipal.hasAuthority("sys_user_delete"))
                            template += '<a  href="javascript:void(0)" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill confirm" title="删除"\
                                   data-table-id="#data-table-user" data-method="delete"  data-title="你确认要删除【' + row.loginId + '】用户吗？" data-url="'+ CTX +'/sys/user/'+ row.id+ '">\
                                \<i class="la la-trash"></i>\
                                \</a>';
                        return template;
                    },
                }],
        };

        albedoList.initTable($('#data-table-user'), $('#table-form-search-user'), options);
        albedoList.init();
    }



}
