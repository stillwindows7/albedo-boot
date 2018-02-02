import {NgModule} from '@angular/core'
import {ThemeComponent} from './theme.component'
import {RouterModule, Routes} from '@angular/router'
import {AlbedoBootAuthGuard} from "../auth/_guards/auth.guard"
import {DefaultComponent} from "./pages/default/default.component"


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
]

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
