import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {CharactersComponent} from "./characters/characters.component";


const dashboardRoutes: Routes = [
  {path: "dashboard", component: DashboardComponent, children: [
      {path: "characters", component: CharactersComponent},
      // {path: "characters/:id"}
      {path: "", redirectTo: "characters", pathMatch: "full"}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
