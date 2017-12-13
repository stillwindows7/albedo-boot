import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from "./auth/logout/logout.component";
import {UserComponent} from "./theme/pages/sys/user/user.component";
import {UserRouteAccessService} from "./auth/_services/user-route-access-service";

const routes: Routes = [
    { path: 'login', loadChildren: './auth/auth.module#AlbedoBootAuthModule' },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
