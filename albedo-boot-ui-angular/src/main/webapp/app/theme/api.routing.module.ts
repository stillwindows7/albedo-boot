import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme.component';
import {RouterModule, Routes} from '@angular/router';
import {AlbedoBootAuthGuard} from "../auth/_guards/auth.guard";
import {UserComponent} from "./pages/sys/user/user.component";
import {DefaultComponent} from "./pages/default/default.component";
import {UserFormComponent} from "./pages/sys/user/user.form.component";
import {RoleComponent} from "./pages/sys/role/role.component";
import {RoleFormComponent} from "./pages/sys/role/role.form.component";

const routes: Routes = [
    {
        path: "",
        component: ThemeComponent,
        canActivate: [AlbedoBootAuthGuard],
        children: [
            {
                path: "",
                component: DefaultComponent,
                children: [
                    {
                        path: "sys/user/list",
                        component: UserComponent
                    },
                    {
                        path: "sys/user/form",
                        component: UserFormComponent
                    },
                    {
                        path: "sys/user/form/:id",
                        component: UserFormComponent
                    },
                    {
                        path: "sys/role/list",
                        component: RoleComponent
                    },
                    {
                        path: "sys/role/form",
                        component: RoleFormComponent
                    },
                    {
                        path: "sys/role/form/:id",
                        component: RoleFormComponent
                    },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),

    ],
    exports: [
        RouterModule
    ]
})
export class ApiRoutingModule {
}
