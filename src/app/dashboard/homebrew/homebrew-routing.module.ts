import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemsComponent} from './items/items.component';
import {PackDetailComponent} from './items/pack-detail/pack-detail.component';
import {SpellsComponent} from './spells/spells.component';
import {TomeDetailComponent} from './spells/tome-detail/tome-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: 'items', component: ItemsComponent},
      {path: 'items/:pack', component: PackDetailComponent},

      {path: 'spells', component: SpellsComponent},
      {path: 'spells/:tome', component: TomeDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomebrewRoutingModule {
}
