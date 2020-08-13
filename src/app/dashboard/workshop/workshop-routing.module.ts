import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkshopExploreComponent} from './workshop-explore.component';

const routes: Routes = [
  {path: '', component: WorkshopExploreComponent},
  // {path: ':id', component: WorkshopExploreComponent},
  // {path: ':id/edit', component: WorkshopExploreComponent},
  // {path: 'my-subscriptions', component: WorkshopExploreComponent},
  // {path: 'my-work', component: WorkshopExploreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {
}
