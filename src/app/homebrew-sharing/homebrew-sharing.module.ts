import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomebrewSharingRoutingModule} from './homebrew-sharing-routing.module';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MarkdownModule} from 'ngx-markdown';
import {DiscordEmbedModule} from '../shared/discord-embed/discord-embed.module';
import {PackShareComponent} from './pack-share/pack-share.component';
import {TomeShareComponent} from './tome-share/tome-share.component';
import {SpellEmbedModule} from '../shared/spell-embed/spell-embed.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MarkdownModule.forChild(),
    DiscordEmbedModule,
    SpellEmbedModule,
    HomebrewSharingRoutingModule
  ],
  declarations: [
    PackShareComponent,
    TomeShareComponent
  ]
})
export class HomebrewSharingModule {
}
