import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import { Principal } from "../_services/principal.service";
import { JhiEventManager } from "ng-jhipster";

@Injectable()
export class AuthGuard implements CanActivate {
    account: Account;
    constructor(
        private principal: Principal,
        private _router: Router,
        private _userService: UserService,
        private eventManager: JhiEventManager) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        // let currentUser = JSON.parse(localStorage.getItem('currentUser'));


        return Promise.resolve(this.principal.identity().then((account) => {
            this.account = account;
            this.registerAuthenticationSuccess();
            if (this.account != null) {
                return true;
            }
            // error when verify so redirect to login page with the return url
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }));





        // return this._userService.verify().map(
        //     data => {
        //         if (data !== null) {
        //             // logged in so return true
        //             return true;
        //         }
        //         // error when verify so redirect to login page with the return url
        //         this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     },
        //     error => {
        //         // error when verify so redirect to login page with the return url
        //         this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     });
    }



    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

}
