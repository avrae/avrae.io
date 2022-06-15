import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../../environments/environment';
import {AutomationEditorDevComponent} from './automation-editor-dev/automation-editor-dev.component';
import {CustomIconDevComponent} from './custom-icon-dev/custom-icon-dev.component';


const routes: Routes = [
  {path: 'automation', component: AutomationEditorDevComponent},
];

// development env only routes
const devRoutes: Routes = [
  {path: 'icons', component: CustomIconDevComponent},
];

if (!environment.production) {
  routes.push(...devRoutes);
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevRoutingModule {
}
