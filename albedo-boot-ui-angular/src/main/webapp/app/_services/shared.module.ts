import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import {ScriptLoaderService} from "./base/script-loader.service";
import {ModuleService} from "./sys/module/module.service";
import {UserService} from "../auth/_services";
import {HasAnyAuthorityDirective} from "../auth/_services/has-any-authority.directive";


@NgModule({
    imports: [
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    providers: [

        ScriptLoaderService,
        DatePipe,
        UserService,
        ModuleService
    ],
    entryComponents: [],
    exports: [
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AlbedoSharedModule {}
