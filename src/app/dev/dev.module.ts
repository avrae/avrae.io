import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {AutomationEditorModule} from '../shared/automation-editor/automation-editor.module';
import {AutomationEditorDevComponent} from './automation-editor-dev/automation-editor-dev.component';
import {CustomIconDevComponent} from './custom-icon-dev/custom-icon-dev.component';
import {DevRoutingModule} from './dev-routing.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DevRoutingModule,
    AutomationEditorModule,
  ],
  declarations: [
    AutomationEditorDevComponent,
    CustomIconDevComponent
  ],
})
export class DevModule {
}
