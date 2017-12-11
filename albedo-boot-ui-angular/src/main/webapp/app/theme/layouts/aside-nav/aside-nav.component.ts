import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import {Module} from "../../../_services/sys/module/module.model";
import {ModuleService} from "../../../_services/sys/module/module.service";
import {JhiAlertService, JhiEventManager, JhiParseLinks} from "ng-jhipster";
import {Principal} from "../../../auth/_services/principal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseWrapper} from "../../../_services/sys/model/response-wrapper.model";

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {


    menus: Module[];

    constructor(
        private moduleService: ModuleService,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {

    }
    ngOnInit() {
        this.moduleService.menus().subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }


    ngAfterViewInit() {

        mLayout.initAside();
        let menu = mLayout.getAsideMenu();
        let item = $(menu).find('a[href="' + window.location.pathname + '"]').parent('.m-menu__item');
        (<any>$(menu).data('menu')).setActiveItem(item);
    }


    private onSuccess(data) {
        this.menus = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

}
