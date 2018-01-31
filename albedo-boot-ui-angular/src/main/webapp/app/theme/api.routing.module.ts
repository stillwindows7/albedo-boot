import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { RouterModule, Routes } from '@angular/router';
import { AlbedoBootAuthGuard } from "../auth/_guards/auth.guard";
import { UserComponent } from "./pages/sys/user/user.component";
import { DefaultComponent } from "./pages/default/default.component";
import { UserFormComponent } from "./pages/sys/user/user.form.component";
import { RoleComponent } from "./pages/sys/role/role.component";
import { RoleFormComponent } from "./pages/sys/role/role.form.component";
import { OrgFormComponent } from "./pages/sys/org/org.form.component";
import { OrgComponent } from "./pages/sys/org/org.component";
import { DictComponent } from "./pages/sys/dict/dict.component";
import { DictFormComponent } from "./pages/sys/dict/dict.form.component";
import { ModuleFormComponent } from "./pages/sys/module/module.form.component";
import { ModuleComponent } from "./pages/sys/module/module.component";
import {GenTableComponent} from "./pages/gen/genTable/genTable.component";
import {GenTableFormComponent} from "./pages/gen/genTable/genTable.form.component";
import {GenSchemeComponent} from "./pages/gen/genScheme/genScheme.component";
import {GenSchemeFormComponent} from "./pages/gen/genScheme/genScheme.form.component";




export const routeChilds = []
const routes: Routes = [
    {
        path: "",
        component: ThemeComponent,
        canActivate: [AlbedoBootAuthGuard],
        children: [
            {
                path: "",
                component: DefaultComponent,
                children: routeChilds
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
