import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomebrewSharingRoutingModule} from './homebrew-sharing-routing.module';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MarkdownModule} from 'ngx-markdown';
import {DiscordEmbedModule} from '../shared/discord-embed/discord-embed.module';
import {PackShareComponent} from './pack-share/pack-share.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MarkdownModule.forChild(),
    DiscordEmbedModule,
    HomebrewSharingRoutingModule
  ],
  declarations: [
    PackShareComponent
  ]
})
export class HomebrewSharingModule {
}
