import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscordEmbedComponent} from "./discord-embed.component";
import {EmbedColorPillComponent} from './embed-color-pill/embed-color-pill.component';
import {EmbedAuthorComponent} from './embed-author/embed-author.component';
import {EmbedTitleComponent} from './embed-title/embed-title.component';
import {EmbedDescriptionComponent} from './embed-description/embed-description.component';
import {EmbedFieldsComponent} from './embed-fields/embed-fields.component';
import {EmbedThumbnailComponent} from './embed-thumbnail/embed-thumbnail.component';
import {EmbedImageComponent} from './embed-image/embed-image.component';
import {EmbedFooterComponent} from './embed-footer/embed-footer.component';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    DiscordEmbedComponent,
    EmbedColorPillComponent,
    EmbedAuthorComponent,
    EmbedTitleComponent,
    EmbedDescriptionComponent,
    EmbedFieldsComponent,
    EmbedThumbnailComponent,
    EmbedImageComponent,
    EmbedFooterComponent
  ],
  exports: [
    DiscordEmbedComponent
  ]
})
export class DiscordEmbedModule {
}
