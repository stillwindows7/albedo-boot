/**
 * Copyright &copy; 2018 <a href="https://github.com/somewhereMrli/albedo-boot">albedo-boot</a> All rights reserved.
 */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TestBookComponent} from "./testBook.component";
import {routeChilds} from "../../../../api.routing.module";
import {AlbedoBootSharedModule} from "../../../../../shared/shared.module";
import {LayoutModule} from "../../../../layouts/layout.module";
import {TestBookService} from "./testBook.service";


const routesTestTestBook = [
    {
        path: "test/testBook/list",
        component: TestBookComponent
    },
    
];

routeChilds.push(...routesTestTestBook)


@NgModule({
    imports: [
        AlbedoBootSharedModule,
        CommonModule,
        RouterModule,
        LayoutModule
    ], exports: [
        TestBookComponent,
    ], entryComponents: [
        TestBookComponent,
    ], declarations: [
        TestBookComponent,
        
    ], providers: [
        TestBookService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestBookModule {


}