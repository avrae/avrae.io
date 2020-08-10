import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {CharactersComponent} from './characters/characters.component';
import {CustomizationComponent} from './customization/customization.component';
import {GvarsComponent} from './gvars/gvars.component';
import {AuthGuard} from '../auth.guard';


const dashboardRoutes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: DashboardComponent, children: [
      {path: 'characters', component: CharactersComponent},
      {path: 'aliases', component: CustomizationComponent},
      {path: 'gvars', component: GvarsComponent},
      {path: 'workshop', loadChildren: () => import('./workshop/workshop.module').then(mod => mod.WorkshopModule)},
      {path: '', redirectTo: 'characters', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
