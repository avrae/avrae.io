import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DateAgoPipe} from './date-ago.pipe';
import { DateAgoLongPipe } from './date-ago-long.pipe';


@NgModule({
  declarations: [
    DateAgoPipe,
    DateAgoLongPipe,
  ],
    exports: [
        DateAgoPipe,
        DateAgoLongPipe
    ],
  imports: [
    CommonModule
  ]
})
export class PipesModule {
}
