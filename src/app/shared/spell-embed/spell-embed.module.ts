import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownModule} from 'ngx-markdown';
import {SpellEmbedComponent} from './spell-embed.component';
import {DiscordEmbedModule} from '../discord-embed/discord-embed.module';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    DiscordEmbedModule
  ],
  declarations: [
    SpellEmbedComponent
  ],
  exports: [
    SpellEmbedComponent
  ]
})
export class SpellEmbedModule {
}
