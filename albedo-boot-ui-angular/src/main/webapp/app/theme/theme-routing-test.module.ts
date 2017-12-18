import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme.component';
import {RouterModule, Routes} from '@angular/router';
import {AlbedoBootAuthGuard} from "../auth/_guards/auth.guard";
import {UserComponent} from "./pages/sys/user/user.component";
import {DefaultComponent} from "./pages/default/default.component";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AlbedoBootAuthGuard],
        "children": [
            {
                "path": "",
                "component": DefaultComponent,
                "children": [
                    {
                        path: "sys/user/list",
                        component: UserComponent
                    }
                ]
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
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
export class ThemeRoutingTestModule { }
