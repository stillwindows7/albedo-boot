import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CTX} from "../../../../app.constants";
import {ActivatedRoute} from "@angular/router";
import {Org} from "../../../../service/sys/org/org.model";
import {ModuleService} from "../../../../service/sys/module/module.service";
import {OrgService} from "../../../../service/sys/org/org.service";

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
        private moduleService: ModuleService,
        private orgService: OrgService) {
        this.ctx = CTX;
        this.org = new Org();

    }

    ngOnInit() {
        this.routerSub = this.router.params.subscribe((params) => {
            this.id = params['id'];
            if(this.id){
                this.orgService.find(this.id).subscribe((data) => {
                    this.org = data;
                    albedoForm.initFormData("#org-save-form", this.org);
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
        // this._script.load('.sys-org-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.afterViewInit = true;
        this.initForm();
    }

    initForm() {
        if(!this.afterViewInit || !this.afterLoad) return;

        var orgId = this.org.id;
        albedoForm.initValidate($("#org-save-form"), {
            // define validation rules
            rules: {
                name: { remote: CTX + '/sys/org/checkByProperty?_statusFalse&id=' + encodeURIComponent(orgId) },
            },
            messages: {
                name: { message: '机构已存在' },
            },
        });
        this.initTree()
        albedoForm.init();
        albedoForm.initSave(null, function() {
            let treeOrgModule = $.fn.mTreeObj("treeOrgModule");
            if (treeOrgModule) {
                var nodes = treeOrgModule.getCheckedNodes();
                $('input[name=\'moduleIdList\']').remove();
                for (var o in nodes) {
                    $('#treeOrgModule').before($('<input type=\'hidden\' name=\'moduleIdList\' />').val(nodes[o].id));
                }
            }
            let treeOrgOrg = $.fn.mTreeObj("treeOrgOrg");
            if ($('#dataScope').val() == 5 && treeOrgOrg) {
                var nodes = treeOrgOrg.getCheckedNodes();
                $('input[name=\'orgIdList\']').remove();
                for (var i = 0; i < nodes.length; i++) {
                    if (!nodes[i].getCheckStatus().half) //排除半选中状态
                        $('#treeOrgModule').before($('<input type=\'hidden\' name=\'orgIdList\' />').val(nodes[i].id));
                }
            }
            if (!$('input[name=\'moduleIdList\']').val()) {
                mApp.alert({
                    container: $('#bootstrap-alerts'),
                    closeInSeconds: 8,
                    type: "warning",
                    message: '请重新选择操作权限！',
                });
                $(".operate-permision").removeClass("has-success").addClass("has-danger")
                return false;
            } else {
                $(".operate-permision").removeClass("has-danger").addClass("has-success")
                return true;
            }
        });


    }
     initTree(){
         var treeOrgModule, treeOrgOrg, data, setting = {
             view: {selectedMulti: false}, check: {enable: true, nocheckInherit: true},
             data: {key:{name:'label'},simpleData: {enable: true,idKey:'id',pIdKey: 'pid'}}
         };

         this.moduleService.treeData().subscribe(
             (data: any) => {
                 // 初始化树结构
                 treeOrgModule = $.fn.mTreeInit($("#treeOrgModule"), setting, data);
                 var nodes = treeOrgModule.expandAll(true);
                 // 默认选择节点
                 $("input[name='moduleIdList']").each(function () {
                     console.log( $(this).val())
                     var node = treeOrgModule.getNodeByParam("id", $(this).val());
                     if (node) treeOrgModule.checkNode(node, true, false, false);
                 });
             }
         );
         this.orgService.treeData().subscribe((data: any) => {
             // 初始化树结构
             treeOrgOrg = $.fn.mTreeInit($("#treeOrgOrg"), setting, data);
             var nodes = treeOrgOrg.expandAll(true);
             // 默认选择节点
             $("input[name='orgIdList']").each(function () {
                 var node = treeOrgOrg.getNodeByParam("id", $(this).val());
                 if (node) treeOrgOrg.checkNode(node, true, true, false);
             });
         })
     }
     refreshOrgTree() {
        $("input[name='dataScope']:checked").val() == 5 ? $(".treeOrgOrgBox").show() : $(".treeOrgOrgBox").hide();
    }

}
