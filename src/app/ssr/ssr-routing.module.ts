import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkshopCollectionSsrComponent} from './workshop-collection-ssr.component';

const routes: Routes = [
  {path: 'dashboard/workshop/:id', component: WorkshopCollectionSsrComponent},  // Alias Workshop collection meta (#350)
  {path: '**'}  // no component, this page is not ssr-able - render just background color until client renders it
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsrRoutingModule {
}
