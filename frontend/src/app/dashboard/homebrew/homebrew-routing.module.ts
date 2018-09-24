import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "../dashboard.component";
import {ItemsComponent} from "./items/items.component";
import {PackDetailComponent} from "./items/pack-detail/pack-detail.component";

const routes: Routes = [
  {
    path: "dashboard", component: DashboardComponent, children: [
      {
        path: "homebrew", children: [
          {path: "items", component: ItemsComponent},
          {path: "items/:pack", component: PackDetailComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomebrewRoutingModule {
}
