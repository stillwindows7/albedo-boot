import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AlbedoJhipsterSharedModule, UserRouteAccessService } from './shared';
import { AlbedoJhipsterAppRoutingModule} from './app-routing.module';
import { AlbedoJhipsterHomeModule } from './home/home.module';
import { AlbedoJhipsterAdminModule } from './admin/admin.module';
import { AlbedoJhipsterAccountModule } from './account/account.module';
import { AlbedoJhipsterEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        AlbedoJhipsterAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        AlbedoJhipsterSharedModule,
        AlbedoJhipsterHomeModule,
        AlbedoJhipsterAdminModule,
        AlbedoJhipsterAccountModule,
        AlbedoJhipsterEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class AlbedoJhipsterAppModule {}
