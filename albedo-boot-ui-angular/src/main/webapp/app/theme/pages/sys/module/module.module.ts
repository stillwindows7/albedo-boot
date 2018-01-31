import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "../../../layouts/layout.module";
import { ModuleComponent } from "./module.component";
import { AlbedoBootSharedModule } from "../../../../shared/shared.module";
import { ModuleFormComponent } from "./module.form.component";
import { RouterModule } from "@angular/router";
import { ModuleService } from "../../../../service/sys/module/module.service";
import {RoleComponent} from "../role/role.component";
import {DictComponent} from "../dict/dict.component";
import {OrgFormComponent} from "../org/org.form.component";
import {UserComponent} from "../user/user.component";
import {DictFormComponent} from "../dict/dict.form.component";
import {UserFormComponent} from "../user/user.form.component";
import {RoleFormComponent} from "../role/role.form.component";
import {OrgComponent} from "../org/org.component";
import {routeChilds} from "../../../api.routing.module";

const routesSysModule = [
    {
        path: "sys/module/list",
        component: ModuleComponent
    },
    {
        path: "sys/module/form",
        component: ModuleFormComponent
    },
    {
        path: "sys/module/form/:id",
        component: ModuleFormComponent
    },
];
routeChilds.push(...routesSysModule)
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
