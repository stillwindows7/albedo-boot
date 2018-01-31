import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "../../../layouts/layout.module";
import { UserComponent } from "./user.component";
import { UserService } from "../../../../service/sys/user/user.service";
import { AlbedoBootSharedModule } from "../../../../shared/shared.module";
import { UserFormComponent } from "./user.form.component";
import { RouterModule } from "@angular/router";
import { Principal } from "../../../../auth/_services/principal.service";
import {routeChilds} from "../../../api.routing.module";
import {ModuleFormComponent} from "../module/module.form.component";
import {RoleComponent} from "../role/role.component";
import {ModuleComponent} from "../module/module.component";
import {DictComponent} from "../dict/dict.component";
import {OrgFormComponent} from "../org/org.form.component";
import {DictFormComponent} from "../dict/dict.form.component";
import {RoleFormComponent} from "../role/role.form.component";
import {OrgComponent} from "../org/org.component";

const routesSysUser = [
    {
        path: "sys/user/list",
        component: UserComponent
    },
    {
        path: "sys/user/form",
        component: UserFormComponent
    },
    {
        path: "sys/user/form/:id",
        component: UserFormComponent
    },
];

routeChilds.push(...routesSysUser)


@NgModule({
    imports: [
        AlbedoBootSharedModule,
        CommonModule,
        RouterModule,
        // RouterModule.forChild(routes),
        LayoutModule
    ], exports: [
        UserComponent,
        // RouterModule
    ], entryComponents: [
        UserComponent,
    ], declarations: [
        UserComponent,
        UserFormComponent,
    ], providers: [
        UserService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule {



}
