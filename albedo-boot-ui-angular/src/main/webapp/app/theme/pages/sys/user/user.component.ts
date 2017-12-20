import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptLoaderService} from "../../../../shared/base/service/script-loader.service";
import {DictQuery} from "../../../../shared/sys/dict/dict.query.model";
import {SERVER_API_URL} from "../../../../app.constants";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";

declare let datatable: any;
@Component({
    selector: ".sys-user-list",
    templateUrl: "./user.component.html",
})
export class UserComponent implements OnInit, AfterViewInit {


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
        this.initTable()
    }

    initTable(){
        const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        var options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        headers:{Authorization:'Bearer' + token},
                        // sample GET method
                        method: 'GET',
                        url: SERVER_API_URL + 'sys/user/',
                        map: function (raw) {
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                saveState: {
                    cookie: true,
                    webstorage: true,
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                theme: 'default', // datatable theme
                class: '', // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            toolbar: {
                // toolbar items
                items: {
                    // pagination
                    pagination: {
                        // page size select
                        pageSizeSelect: [10, 20, 30, 50, 100],
                    },
                },
            },

            search: {
                input: $('#generalSearch'),
            },

            // columns definition
            columns: [
                {
                    field: 'orgName',
                    title: '所属组织',
                    sortable: false, // disable sort for this column
                    width: 40,
                    selector: false,
                    textAlign: 'center',
                }, {
                    field: 'loginId',
                    title: '登录Id',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 150,
                    // basic templating support for column rendering,
                    template: '{{OrderID}} - {{ShipCountry}}',
                }, {
                    field: 'email',
                    title: '邮箱',
                    width: 150,
                    template: function (row) {
                        // callback function support for column rendering
                        return row.ShipCountry + ' - ' + row.ShipCity;
                    },
                }, {
                    field: 'status',
                    title: '状态',
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {'title': 'Pending', 'class': 'm-badge--brand'},
                            2: {'title': 'Delivered', 'class': ' m-badge--metal'},
                            3: {'title': 'Canceled', 'class': ' m-badge--primary'},
                            4: {'title': 'Success', 'class': ' m-badge--success'},
                            5: {'title': 'Info', 'class': ' m-badge--info'},
                            6: {'title': 'Danger', 'class': ' m-badge--danger'},
                            7: {'title': 'Warning', 'class': ' m-badge--warning'},
                        };
                        return '<span class="m-badge ' + status[row.status].class + ' m-badge--wide">' + status[row.status].title + '</span>';
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
                    template: function (row) {
                        var dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';

                        return '\
						<div class="dropdown ' + dropup + '">\
							<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                                <i class="la la-ellipsis-h"></i>\
                            </a>\
						  	<div class="dropdown-menu dropdown-menu-right">\
						    	<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
						    	<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
						    	<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
						  	</div>\
						</div>\
						<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
							<i class="la la-edit"></i>\
						</a>\
						<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\
							<i class="la la-trash"></i>\
						</a>\
					';
                    },
                }],
        };
        $('.m_datatable').mDatatable(options);


    }



}
