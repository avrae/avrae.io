import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomebrewRoutingModule} from './homebrew-routing.module';
import {ItemsComponent} from "./items/items.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PackDetailComponent} from './items/pack-detail/pack-detail.component';
import {NewPackDialog} from './items/new-pack-dialog/new-pack-dialog.component';
import {PackOptionsDialog} from './items/pack-options-dialog/pack-options-dialog.component';
import {PackShareDialog} from './items/pack-share-dialog/pack-share-dialog.component';
import {PackDeleteDialog} from './items/pack-delete-dialog/pack-delete-dialog.component';
import {ItemDetailComponent} from './items/pack-detail/item-detail/item-detail.component';
import {MarkdownModule} from "ngx-markdown";
import {DiscordEmbedModule} from "../../shared/discord-embed/discord-embed.module";
import {PackJsonDialog} from './items/pack-json-dialog/pack-json-dialog.component';
import {PackJSONImportDialog} from './items/pack-json-import-dialog/pack-json-import-dialog.component';
import {PackMarkdownDialog} from './items/pack-markdown-dialog/pack-markdown-dialog.component';
import {PackSRDImportDialog} from './items/pack-srd-import-dialog/pack-srd-import-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    MarkdownModule.forChild(),
    DiscordEmbedModule,
    HomebrewRoutingModule,
  ],
  declarations: [
    ItemsComponent,
    PackDetailComponent,
    NewPackDialog,
    PackOptionsDialog,
    PackShareDialog,
    PackDeleteDialog,
    ItemDetailComponent,
    PackJsonDialog,
    PackJSONImportDialog,
    PackMarkdownDialog,
    PackSRDImportDialog,
  ],
  entryComponents: [
    NewPackDialog,
    PackOptionsDialog,
    PackShareDialog,
    PackDeleteDialog,
    PackJsonDialog,
    PackMarkdownDialog,
    PackJSONImportDialog,
    PackSRDImportDialog
  ]
})
export class HomebrewModule {
}
