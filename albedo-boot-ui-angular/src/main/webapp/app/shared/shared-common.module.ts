import { NgModule } from '@angular/core';
import { AlbedoBootSharedLibsModule } from "./shared-libs.module";
import { AlbFormComponent, AlbTreeSelectComponent } from "./";
import { DictService } from "../service/sys/dict/dict.service";
import { AlbTreeShowComponent } from "./tags/tree.show.component";


@NgModule({
    imports: [
        AlbedoBootSharedLibsModule
    ],
    declarations: [
        AlbFormComponent,
        AlbTreeSelectComponent,
        AlbTreeShowComponent,
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
        // AlbFormTestComponent
    ]

})
export class AlbedoBootSharedCommonModule {
}
