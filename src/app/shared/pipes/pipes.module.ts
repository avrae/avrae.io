import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DateAgoPipe} from './date-ago.pipe';


@NgModule({
  declarations: [
    DateAgoPipe,
  ],
  exports: [
    DateAgoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule {
}
