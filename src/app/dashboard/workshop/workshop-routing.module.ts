import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../../auth.guard';
import {DashboardComponent} from '../dashboard.component';
import {WorkshopComponent} from './workshop.component';

const routes: Routes = [
  {path: '', component: WorkshopComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {
}
