import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionComponent} from './collection/collection.component';
import {MySubscriptionsComponent} from './my-subscriptions/my-subscriptions.component';
import {MyWorkComponent} from './my-work/my-work.component';
import {WorkshopExploreComponent} from './workshop-explore.component';

const routes: Routes = [
  {path: '', component: WorkshopExploreComponent},
  {path: 'my-subscriptions', component: MySubscriptionsComponent},
  {path: 'my-work', component: MyWorkComponent},
  {path: ':id', component: CollectionComponent},
  // {path: ':id/edit', component: WorkshopExploreComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {
}
