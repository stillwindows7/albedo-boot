import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from "../../../layouts/layout.module";
import {ModuleComponent} from "./module.component";
import {AlbedoBootSharedModule} from "../../../../shared/shared.module";
import {ModuleFormComponent} from "./module.form.component";
import {RouterModule} from "@angular/router";
import {ModuleService} from "../../../../service/sys/module/module.service";


@NgModule({
    imports: [
        AlbedoBootSharedModule,
        CommonModule,
        RouterModule,
        // RouterModule.forChild(routes),
        LayoutModule
    ], exports: [
        ModuleComponent,
        // RouterModule
    ], entryComponents: [
        ModuleComponent,
    ], declarations: [
        ModuleComponent,
        ModuleFormComponent,
    ], providers: [
        ModuleService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuleModule {



}
