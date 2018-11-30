import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PackShareComponent} from "./pack-share/pack-share.component";

const routes: Routes = [
  {
    path: "homebrew", children: [
      {path: "items/:pack", component: PackShareComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomebrewSharingRoutingModule {
}
