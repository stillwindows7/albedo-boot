import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseRequestOptions, HttpModule } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

import { AuthRoutingModule } from "./auth-routing.routing";
import { AuthComponent } from "./auth.component";
import { AlertComponent } from "./_directives/alert.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuard } from "./_guards/auth.guard";
import { AlertService } from "./_services/alert.service";
import { AuthenticationService } from "./_services/authentication.service";
import { UserService } from "./_services/user.service";
import { HasAnyAuthorityDirective } from "./_services/has-any-authority.directive";
import { Principal } from "./_services/principal.service";
import { AccountService } from "./_services/account.service";
import { StateStorageService } from "./_services/state-storage.service";
import { LoginService } from "./_services/login.service";
import { AuthServerProvider } from "./_services/auth-jwt.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        AuthComponent,
        AlertComponent,
        LogoutComponent
    ],
    imports: [

        CommonModule,
        FormsModule,
        HttpModule,
        AuthRoutingModule,
    ],
    providers: [
        Principal,
        AccountService,
        AuthGuard,
        AlertService,
        AuthenticationService,
        LoginService,
        AuthServerProvider,
        StateStorageService,
        UserService,
        NgbActiveModal,
        // api backend simulation
        // fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
    ],
    entryComponents: [AlertComponent]
})

export class AuthModule {
}
