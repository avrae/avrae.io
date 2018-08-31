import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import {MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule, MatTooltipModule} from "@angular/material";
import {StyleManager} from "./style-manager";
import {ThemeStorage} from "./theme-picker/theme-storage/theme-storage";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
  ],
  declarations: [ThemePickerComponent],
  exports: [ThemePickerComponent],
  providers: [StyleManager, ThemeStorage]
})
export class ThemesModule { }
