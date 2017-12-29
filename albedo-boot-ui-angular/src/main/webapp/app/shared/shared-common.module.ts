import {NgModule} from '@angular/core';
import {AlbedoBootSharedLibsModule} from "./shared-libs.module";
import {AlbFormComponent,AlbTreeSelectComponent} from "./";
import {DictService} from "./sys/dict/dict.service";



@NgModule({
    imports: [
        AlbedoBootSharedLibsModule
    ],
    declarations: [
        AlbFormComponent,
        AlbTreeSelectComponent,
        // AlbFormTestComponent
    ],
    providers: [
        DictService
    ],
    exports: [
        AlbedoBootSharedLibsModule,
        AlbFormComponent,
        AlbTreeSelectComponent,
        // AlbFormTestComponent
    ]

})
export class AlbedoBootSharedCommonModule { }
