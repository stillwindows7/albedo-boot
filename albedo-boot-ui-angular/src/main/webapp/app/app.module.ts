import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme/theme.component';
import {LayoutModule} from './theme/layouts/layout.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ThemeRoutingModule} from "./theme/theme-routing.module";
import {customHttpProvider} from "./intercepter/http.provider";
import {Ng2Webstorage} from 'ngx-webstorage';
import {NgJhipsterModule} from "ng-jhipster";
import {AlbedoBootSharedModule} from "./shared/shared.module";
// import {AlbedoBootEntityModule} from "./theme/pages/entity.module";
import {AlbedoBootAuthModule} from "./auth/auth.module";

@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent
    ],
    imports: [
        Ng2Webstorage.forRoot({ prefix: 'alb', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            i18nEnabled: false,
            defaultI18nLang: 'zh-cn'
        }),
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AlbedoBootAuthModule,
        AlbedoBootSharedModule,
    ],
    providers: [
        customHttpProvider()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
