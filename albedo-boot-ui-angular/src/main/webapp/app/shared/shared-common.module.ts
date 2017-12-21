import {LOCALE_ID, NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AlbedoBootSharedLibsModule} from "./shared-libs.module";
import {AlbFormComponent} from "./";
import {DictService} from "./sys/dict/dict.service";
// import {AlbFormTestComponent} from "./tags/test.component";


@NgModule({
    imports: [
        AlbedoBootSharedLibsModule
    ],
    declarations: [
        AlbFormComponent,
        // AlbFormTestComponent
    ],
    providers: [
        DictService
    ],
    exports: [
        AlbedoBootSharedLibsModule,
        AlbFormComponent,
        // AlbFormTestComponent
    ]

})
export class AlbedoBootSharedCommonModule { }
