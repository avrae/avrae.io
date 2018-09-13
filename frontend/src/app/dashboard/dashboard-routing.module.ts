import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {CharactersComponent} from "./characters/characters.component";
import {CustomizationComponent} from "./customization/customization.component";
import {GvarsComponent} from "./gvars/gvars.component";
import {AuthGuardService} from "../auth-guard.service";


const dashboardRoutes: Routes = [
  {
    path: "dashboard", canActivate: [AuthGuardService], component: DashboardComponent, children: [
      {path: "characters", component: CharactersComponent},
      // {path: "characters/:id"}
      {path: "aliases", component: CustomizationComponent},
      {path: "gvars", component: GvarsComponent},
      {path: "", redirectTo: "characters", pathMatch: "full"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
