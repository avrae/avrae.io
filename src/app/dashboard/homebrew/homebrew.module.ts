import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MarkdownModule} from 'ngx-markdown';
import {MaterialModule} from '../../material/material.module';
import {AutomationEditorModule} from '../../shared/automation-editor/automation-editor.module';
import {DiscordEmbedModule} from '../../shared/discord-embed/discord-embed.module';
import {SpellEmbedModule} from '../../shared/spell-embed/spell-embed.module';

import {HomebrewRoutingModule} from './homebrew-routing.module';
import {ItemsComponent} from './items/items.component';
import {NewPackDialog} from './items/new-pack-dialog/new-pack-dialog.component';
import {PackDeleteDialog} from './items/pack-delete-dialog/pack-delete-dialog.component';
import {ItemDetailComponent} from './items/pack-detail/item-detail/item-detail.component';
import {PackDetailComponent} from './items/pack-detail/pack-detail.component';
import {PackMarkdownDialog} from './items/pack-markdown-dialog/pack-markdown-dialog.component';
import {PackOptionsDialog} from './items/pack-options-dialog/pack-options-dialog.component';
import {PackShareDialog} from './items/pack-share-dialog/pack-share-dialog.component';
import {NewTomeDialog} from './spells/dialogs/new-tome-dialog.component';
import {TomeDeleteDialog} from './spells/dialogs/tome-delete-dialog.component';
import {TomeMarkdownDialog} from './spells/dialogs/tome-markdown-dialog/tome-markdown-dialog.component';
import {TomeOptionsDialog} from './spells/dialogs/tome-options-dialog.component';
import {TomeShareDialog} from './spells/dialogs/tome-share-dialog.component';
import {SpellsComponent} from './spells/spells.component';
import {SpellDetailComponent} from './spells/tome-detail/spell-detail/spell-detail.component';
import {SpellPanelDescriptionComponent} from './spells/tome-detail/spell-detail/spell-panel-description/spell-panel-description.component';
import {SpellEditorComponent} from './spells/tome-detail/spell-editor/spell-editor.component';
import {SpellListComponent} from './spells/tome-detail/spell-list/spell-list.component';
import {TomeDetailComponent} from './spells/tome-detail/tome-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    MarkdownModule.forChild(),
    DiscordEmbedModule,
    AutomationEditorModule,
    SpellEmbedModule,
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
    PackMarkdownDialog,

    SpellsComponent,
    NewTomeDialog,
    TomeShareDialog,
    TomeDetailComponent,
    SpellDetailComponent,
    SpellListComponent,
    TomeOptionsDialog,
    TomeDeleteDialog,
    SpellPanelDescriptionComponent,
    SpellEditorComponent,
    TomeMarkdownDialog,
  ]
})
export class HomebrewModule {
}
