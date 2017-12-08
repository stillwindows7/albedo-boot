import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


import { StateStorageService } from './state-storage.service';
import { Principal } from "./principal.service";

@Injectable()
export class UserRouteAccessService implements CanActivate {

    constructor(private router: Router,
        // private loginModalService: LoginModalService,
        private principal: Principal,
        private stateStorageService: StateStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        return this.checkLogin(route.data['authorities'], state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        return Promise.resolve(this.principal.hasAnyAuthority(authorities).then(isOk => {
            if (isOk) {
                return true;
            } else {
                this.stateStorageService.storeUrl(url);
                this.router.navigate(['accessdenied']).then(() => {
                    // this.loginModalService.open();
                    this.router.navigate(['/login'], { queryParams: { returnUrl: url } });

                });
                return false;
            }
        }));
    }
}
