import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PackShareComponent} from './pack-share/pack-share.component';
import {TomeShareComponent} from './tome-share/tome-share.component';

const routes: Routes = [
  {
    path: 'homebrew', children: [
      {path: 'items/:pack', component: PackShareComponent},
      {path: 'spells/:compendium', component: TomeShareComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomebrewSharingRoutingModule {
}
