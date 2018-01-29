import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../shared/base/service/script-loader.service';
import { ModuleService } from "../service/sys/module/module.service";
import { Module } from "../service/sys/module/module.model";
import { CTX } from "../app.constants";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { Principal } from "../auth/_services/principal.service";
import { setActiveItemMenu } from "../shared/base/base.util";

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./theme.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent implements OnInit {

    private modules: Module[];

    constructor(private scriptLoaderService: ScriptLoaderService,
        private moduleService: ModuleService,
        private router: Router,
        private principal: Principal,
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService) {

    }

    ngOnInit() {
        var url = window.location.hash.replace("#", "");
        this.moduleService.data().subscribe(
            (data: any) => {
                this.modules = data;
                this.initBreadcrumbs(url);
            }
        );
        // console.log("DefaultComponent")
        this.scriptLoaderService.load('body', 'assets/vendors/base/vendors.bundle.js',
            'assets/vendors/custom/jquery-ztree/js/jquery.ztree.core.js',
            'assets/vendors/custom/jquery-ztree/js/jquery.ztree.excheck.js',
            'assets/frame/albedo.js',
            'assets/frame/albedo.jquery.replenish.js',
            'assets/demo/default/base/scripts.bundle.js')
            .then(result => {
                Helpers.setLoading(false);
                // optional js to be loaded once
                this.scriptLoaderService.load('head', 'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js');
                const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
                albedo.setCtx(CTX)
                albedo.setSessionStorage(this.sessionStorage)
                albedo.setToken(token)
                albedo.setUserId(this.principal.getUserId())
                this.initBreadcrumbs(url);
            });
        this.scriptLoaderService.load('body',
            'assets/frame/albedo.form.component.js',
            'assets/frame/albedo.list.datatables.js', )
        this.router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                (<any>mLayout).closeMobileAsideMenuOffcanvas();
                (<any>mLayout).closeMobileHorMenuOffcanvas();
                (<any>mApp).scrollTop();
                Helpers.setLoading(true);
                // hide visible popover
                (<any>$('[data-toggle="m-popover"]')).popover('hide');
            }
            if (route instanceof NavigationEnd) {
                // init required js
                (<any>mApp).init();
                (<any>mUtil).init();
                Helpers.setLoading(false);
                // content m-wrapper animation
                let animation = 'm-animate-fade-in-up';
                $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
                    $('.m-wrapper').removeClass(animation);
                }).removeClass(animation).addClass(animation);
                this.initBreadcrumbs(route.url);

                setActiveItemMenu(this.localStorage);
            }
        });
    }

    private getModules(callbackfn: (value: Module, index: number, array: Module[]) => void, thisArg?: any): void {
        this.modules && this.modules.forEach(callbackfn);
    }


    private initBreadcrumbs(url: string) {
        let thiz = this;
        if(url=="/"){
            return;
        }
        if (thiz.modules) {
            var breadcrumbs = [];
            thiz.getModules(function(module) {
                if (module.url == url || module.url.indexOf(url) != -1) {
                    module.parentIds.split(",").forEach(function(item) {
                        item && thiz.getModules(function(temp) {
                            if (item == temp.id) {
                                breadcrumbs.push({
                                    text: temp.name,
                                    title: temp.name,
                                    href: temp.url
                                });
                            }
                        })
                    })
                }
            })
            Helpers.setBreadcrumbs(breadcrumbs);
        }
    }

}
