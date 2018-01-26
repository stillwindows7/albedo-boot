import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ScriptLoaderService } from "./base/service/script-loader.service";
import { ModuleService } from "../service/sys/module/module.service";
import { UserService } from "../auth/_services";
import { HasAnyAuthorityDirective } from "../auth/_services/has-any-authority.directive";
import { AlbedoBootSharedCommonModule } from "./shared-common.module";
import { RoleService } from "../service/sys/role/role.service";
import { DictService } from "../service/sys/dict/dict.service";
import { OrgService } from "../service/sys/org/org.service";


@NgModule({
    imports: [
        AlbedoBootSharedCommonModule
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    providers: [
        ScriptLoaderService,
        UserService,
        RoleService,
        OrgService,
        ModuleService,
        DictService
    ],
    entryComponents: [],
    exports: [
        AlbedoBootSharedCommonModule,
        HasAnyAuthorityDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AlbedoBootSharedModule {
}
