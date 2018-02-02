import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'

import { UserModule } from "./sys/user/user.module"
import { RoleModule } from "./sys/role/role.module"
import { OrgModule } from "./sys/org/org.module"
import { ModuleModule } from "./sys/module/module.module"
import { DictModule } from "./sys/dict/dict.module"
import {GenTableModule} from "./gen/genTable/genTable.module"
import {GenSchemeModule} from "./gen/genScheme/genScheme.module"

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        UserModule,
        RoleModule,
        OrgModule,
        ModuleModule,
        DictModule,
        GenTableModule,
        GenSchemeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlbedoBootEntityModule {
}
