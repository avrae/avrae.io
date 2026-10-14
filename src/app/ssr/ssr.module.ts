import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SsrRoutingModule } from "./ssr-routing.module";
import { SsrPlaceholderComponent } from "./ssr-placeholder.component";
import { WorkshopCollectionSsrComponent } from "./workshop-collection-ssr.component";

@NgModule({
  declarations: [WorkshopCollectionSsrComponent, SsrPlaceholderComponent],
  imports: [CommonModule, SsrRoutingModule],
})
export class SsrModule {}
