import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MySubscriptionsComponent} from './my-subscriptions/my-subscriptions.component';
import {MyWorkComponent} from './my-work/my-work.component';
import {WorkshopExploreComponent} from './workshop-explore.component';

const routes: Routes = [
  {path: '', component: WorkshopExploreComponent},
  // {path: ':id', component: WorkshopExploreComponent},
  // {path: ':id/edit', component: WorkshopExploreComponent},
  {path: 'my-subscriptions', component: MySubscriptionsComponent},
  {path: 'my-work', component: MyWorkComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {
}
