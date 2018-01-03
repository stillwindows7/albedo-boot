import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../shared/base/service/script-loader.service';
import {ModuleService} from "../shared/sys/module/module.service";
import {Module} from "../shared/sys/module/module.model";
import {ResponseWrapper} from "../shared/base/model/response-wrapper.model";
import {SERVER_API_URL} from "../app.constants";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";

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
                private localStorage: LocalStorageService,
                private sessionStorage: SessionStorageService) {

    }
    ngOnInit() {
        this.moduleService.data().subscribe(
            (res: ResponseWrapper) => {
                this.modules = res.json.data;
            }
        );

        this.scriptLoaderService.load('body', 'assets/vendors/base/vendors.bundle.js',
            'assets/vendors/custom/jquery-ztree/js/jquery.ztree.core.js',
            'assets/vendors/custom/jquery-ztree/js/jquery.ztree.excheck.js',
            'assets/frame/albedo.js',
            'assets/frame/albedo.form.component.js',
            'assets/frame/albedo.list.datatables.js',
            'assets/frame/albedo.jquery.replenish.js',
            'assets/demo/default/base/scripts.bundle.js')
            .then(result => {
                Helpers.setLoading(false);
                // optional js to be loaded once
                this.scriptLoaderService.load('head', 'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js');
                const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
                albedo.setCtx(SERVER_API_URL)
                albedo.setToken(token)
            });
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
                this.initBreadcrumbs(route);
            }
        });
    }

    private getModules(callbackfn: (value: Module, index: number, array: Module[]) => void, thisArg?: any): void{
        this.modules && this.modules.forEach(callbackfn);
    }


    private initBreadcrumbs(navigationEnd: NavigationEnd){
        let thiz = this;
        if(thiz.modules){
            var breadcrumbs = [];
            thiz.getModules(function(module){
                if(module.url==navigationEnd.url || module.url.indexOf(navigationEnd.url)!=-1){
                    module.parentIds.split(",").forEach(function(item){
                        item && thiz.getModules(function(temp){
                            if(item == temp.id){
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
