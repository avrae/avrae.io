import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SsrRoutingModule} from './ssr-routing.module';
import { WorkshopCollectionSsrComponent } from './workshop-collection-ssr.component';


@NgModule({
  declarations: [WorkshopCollectionSsrComponent],
  imports: [
    CommonModule,
    SsrRoutingModule
  ]
})
export class SsrModule {
}
