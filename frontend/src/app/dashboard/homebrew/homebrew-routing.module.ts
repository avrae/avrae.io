import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../auth.guard';
import {DashboardComponent} from '../dashboard.component';
import {CompendiumDetailComponent} from './compendium-detail/compendium-detail.component';
import {CompendiumListComponent} from './compendium-list/compendium-list.component';

const routes: Routes = [
  {
    path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
      {
        path: 'homebrew', children: [
          {path: '', component: CompendiumListComponent},
          {path: ':compendium', component: CompendiumDetailComponent}
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
