import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "../../../layouts/layout.module";
import { UserComponent } from "./user.component";
import { UserService } from "../../../../service/sys/user/user.service";
import { AlbedoBootSharedModule } from "../../../../shared/shared.module";
import { UserFormComponent } from "./user.form.component";
import { RouterModule } from "@angular/router";
import { Principal } from "../../../../auth/_services/principal.service";


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
