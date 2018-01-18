import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {UserModule} from "./sys/user/user.module";
import {RoleModule} from "./sys/role/role.module";
import {OrgModule} from "./sys/org/org.module";

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        UserModule,
        RoleModule,
        OrgModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlbedoBootEntityModule {
}
