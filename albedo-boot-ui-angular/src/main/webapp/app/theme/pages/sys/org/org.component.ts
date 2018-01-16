import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptLoaderService} from "../../../../shared/base/service/script-loader.service";
import {CTX, DATA_STATUS, DICT_SYS_DATA} from "../../../../app.constants";
import {SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";

declare let datatable: any;
@Component({
    selector: ".sys-org-list.page-list",
    templateUrl: "./org.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class OrgComponent implements OnInit,OnDestroy, AfterViewInit {


    routerSub: any;
    constructor(private _script: ScriptLoaderService,
        private router: ActivatedRoute,
        private sessionStorage: SessionStorageService) {

    }



    ngOnInit() {
        this.routerSub = this.router.url.subscribe((urlSegment) => {
            console.log(urlSegment)
        });
    }

    ngOnDestroy() {
        this.routerSub.unsubscribe();
    }

    ngAfterViewInit() {
        // this._script.load('.sys-org-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.initTable()
        // Helpers.setBreadcrumbs();
    }

    initTable() {
        // const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        var options = {
            data: {
                source: {
                    read: {
                        // sample GET method
                        method: 'GET',
                        url: CTX + '/sys/org/',
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
                    field: 'name',
                    title: '名称',
                    sortable: 'asc',
                    width: 150,
                    // basic templating support for column rendering,
                    // template: '{{OrderID}} - {{ShipCountry}}',
                }, {
                    field: 'sysData',
                    title: '是否系统数据',
                    width: 150,
                    template: function (row) {
                        return '<span class="m-badge ' + DICT_SYS_DATA[row.sysData].class + ' m-badge--wide">' + row.sysData + '</span>';
                    },
                }, {
                    field: 'status',
                    title: '状态',
                    // callback function support for column rendering
                    template: function(row) {
                        return '<span class="m-badge ' + DATA_STATUS[row.status].class + ' m-badge--wide">' + row.status + '</span>';
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
                        return '\
						<a href="#/sys/org/form/'+ row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="编辑">\
							<i class="la la-edit"></i>\
						</a>\
						<a href="javascript:void(0)" class="m-portlet__nav-link btn m-btn m-btn--hover-warning m-btn--icon m-btn--icon-only m-btn--pill confirm" title="'+ (row.status == "正常" ? "锁定" : "解锁") + '机构"\
						 data-table-id="#data-table-org" data-method="put"  data-title="你确认要操作【'+ row.name+ '】机构吗？" data-url="'+ CTX +'/sys/org/'+ row.id+ '">\
							<i class="la la-'+ (row.status == "正常" ? "unlock-alt" : "unlock") + '"></i>\
						</a>\
					    <a href="javascript:void(0)" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill confirm" title="删除"\
                             data-table-id="#data-table-org" data-method="delete"  data-title="你确认要删除【'+ row.name+ '】机构吗？" data-url="'+ CTX +'/sys/org/'+ row.id+ '">\
                            <i class="la la-trash"></i>\
                        </a>';
                    },
                }],
        };

        albedoList.initTable($('#data-table-org'), $('#table-form-search-org'), options);
        albedoList.init();
    }



}
