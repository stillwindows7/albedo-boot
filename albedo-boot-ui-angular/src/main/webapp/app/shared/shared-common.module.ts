import {LOCALE_ID, NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AlbedoBootSharedLibsModule} from "./shared-libs.module";


@NgModule({
    imports: [
        AlbedoBootSharedLibsModule
    ],
    declarations: [
        // FindLanguageFromKeyPipe,
        // JhiAlertComponent,
        // JhiAlertErrorComponent
    ],
    providers: [
        // JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'zh-cn'
        },
    ],
    exports: [
        AlbedoBootSharedLibsModule,
        // FindLanguageFromKeyPipe,
        // JhiAlertComponent,
        // JhiAlertErrorComponent
    ]
})
export class AlbedoBootSharedCommonModule {}
