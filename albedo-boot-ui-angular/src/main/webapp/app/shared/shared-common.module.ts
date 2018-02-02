import { NgModule } from '@angular/core'
import { AlbedoBootSharedLibsModule } from "./shared-libs.module"
import { AlbFormComponent, AlbTreeSelectComponent } from "./"
import { DictService } from "../theme/pages/sys/dict/service/dict.service"
import { AlbTreeShowComponent } from "./tags/tree.show.component"
import {AlbIcoShowComponent} from "./tags/ico.show.component"


@NgModule({
    imports: [
        AlbedoBootSharedLibsModule
    ],
    declarations: [
        AlbFormComponent,
        AlbTreeSelectComponent,
        AlbTreeShowComponent,
        AlbIcoShowComponent,
        // AlbFormTestComponent
    ],
    providers: [
        DictService
    ],
    exports: [
        AlbedoBootSharedLibsModule,
        AlbFormComponent,
        AlbTreeSelectComponent,
        AlbTreeShowComponent,
        AlbIcoShowComponent,
        // AlbFormTestComponent
    ]

})
export class AlbedoBootSharedCommonModule {
}
