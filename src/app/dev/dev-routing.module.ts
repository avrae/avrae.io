import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutomationEditorDevComponent} from './automation-editor-dev/automation-editor-dev.component';


const devRoutes: Routes = [
  {path: 'automation', component: AutomationEditorDevComponent},
];

@NgModule({
  imports: [RouterModule.forChild(devRoutes)],
  exports: [RouterModule]
})
export class DevRoutingModule {
}
