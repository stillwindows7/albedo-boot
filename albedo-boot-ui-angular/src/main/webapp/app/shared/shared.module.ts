import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { ScriptLoaderService } from "./base/service/script-loader.service"
import { UserService } from "../auth/_services"
import { HasAnyAuthorityDirective } from "../auth/_services/has-any-authority.directive"
import { AlbedoBootSharedCommonModule } from "./shared-common.module"
import {RoleService} from "../theme/pages/modules/sys/role/service/role.service";
import {OrgService} from "../theme/pages/modules/sys/org/service/org.service";
import {ModuleService} from "../theme/pages/modules/sys/module/service/module.service";
import {DictService} from "../theme/pages/modules/sys/dict/service/dict.service";


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
