import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from "../../../layouts/layout.module";
import {UserComponent} from "./user.component";
import {DefaultComponent} from "../../default/default.component";
import {UserService} from "../../../../shared/sys/user/user.service";
import {AlbedoBootSharedModule} from "../../../../shared/shared.module";
import {AlbedoBootAuthGuard} from "../../../../auth/_guards/auth.guard";
import {ThemeComponent} from "../../../theme.component";


@NgModule({
    imports: [
        AlbedoBootSharedModule,
        CommonModule,
        // RouterModule.forChild(routes),
        LayoutModule
    ], exports: [
        // RouterModule
    ], declarations: [
        UserComponent
    ],providers: [
        UserService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule {



}
