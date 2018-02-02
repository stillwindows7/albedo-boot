import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { ScriptLoaderService } from "./base/service/script-loader.service"
import { ModuleService } from "../theme/pages/sys/module/service/module.service"
import { UserService } from "../auth/_services"
import { HasAnyAuthorityDirective } from "../auth/_services/has-any-authority.directive"
import { AlbedoBootSharedCommonModule } from "./shared-common.module"
import { RoleService } from "../theme/pages/sys/role/service/role.service"
import { DictService } from "../theme/pages/sys/dict/service/dict.service"
import { OrgService } from "../theme/pages/sys/org/service/org.service"


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
