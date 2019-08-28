import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemePickerComponent} from './theme-picker/theme-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {StyleManager} from './style-manager';
import {ThemeStorage} from './theme-picker/theme-storage/theme-storage';

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
export class ThemesModule {
}
