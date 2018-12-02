import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomebrewRoutingModule} from './homebrew-routing.module';
import {ItemsComponent} from './items/items.component';
import {MaterialModule} from '../../material/material.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PackDetailComponent} from './items/pack-detail/pack-detail.component';
import {NewPackDialog} from './items/new-pack-dialog/new-pack-dialog.component';
import {PackOptionsDialog} from './items/pack-options-dialog/pack-options-dialog.component';
import {PackShareDialog} from './items/pack-share-dialog/pack-share-dialog.component';
import {PackDeleteDialog} from './items/pack-delete-dialog/pack-delete-dialog.component';
import {ItemDetailComponent} from './items/pack-detail/item-detail/item-detail.component';
import {MarkdownModule} from 'ngx-markdown';
import {DiscordEmbedModule} from '../../shared/discord-embed/discord-embed.module';
import {PackJsonDialog} from './items/pack-json-dialog/pack-json-dialog.component';
import {PackJSONImportDialog} from './items/pack-json-import-dialog/pack-json-import-dialog.component';
import {PackMarkdownDialog} from './items/pack-markdown-dialog/pack-markdown-dialog.component';
import {PackSRDImportDialog} from './items/pack-srd-import-dialog/pack-srd-import-dialog.component';
import {SpellsComponent} from './spells/spells.component';
import {NewTomeDialog} from './spells/dialogs/new-tome-dialog.component';
import {TomeShareDialog} from './spells/dialogs/tome-share-dialog.component';
import {TomeDetailComponent} from './spells/tome-detail/tome-detail.component';
import {SpellDetailComponent} from './spells/tome-detail/spell-detail/spell-detail.component';
import {SpellListComponent} from './spells/tome-detail/spell-list/spell-list.component';
import {TomeOptionsDialog} from './spells/dialogs/tome-options-dialog.component';
import {TomeDeleteDialog} from './spells/dialogs/tome-delete-dialog.component';
import {SpellPanelDescriptionComponent} from './spells/tome-detail/spell-detail/spell-panel-description/spell-panel-description.component';
import {SpellEmbedComponent} from './spells/tome-detail/spell-list/spell-embed/spell-embed.component';
import {SpellEditorComponent} from './spells/tome-detail/spell-editor/spell-editor.component';
import {TomeSRDImportDialog} from './spells/dialogs/tome-srd-import-dialog.component';
import {EffectEditorComponent} from './spells/tome-detail/spell-editor/effect-editor/effect-editor.component';
import { NewEffectCardComponent } from './spells/tome-detail/spell-editor/new-effect-card/new-effect-card.component';
import { TargetEffectComponent } from './spells/tome-detail/spell-editor/effect-editor/target-effect/target-effect.component';
import { AttackEffectComponent } from './spells/tome-detail/spell-editor/effect-editor/attack-effect/attack-effect.component';
import { SaveEffectComponent } from './spells/tome-detail/spell-editor/effect-editor/save-effect/save-effect.component';
import { DamageEffectComponent } from './spells/tome-detail/spell-editor/effect-editor/damage-effect/damage-effect.component';
import { IEffectEffectComponent } from './spells/tome-detail/spell-editor/effect-editor/ieffect-effect/ieffect-effect.component';
import { RollEffectComponent } from './spells/tome-detail/spell-editor/effect-editor/roll-effect/roll-effect.component';
import { TextEffectComponent } from './spells/tome-detail/spell-editor/effect-editor/text-effect/text-effect.component';

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

    SpellsComponent,
    NewTomeDialog,
    TomeShareDialog,
    TomeDetailComponent,
    SpellDetailComponent,
    SpellListComponent,
    TomeOptionsDialog,
    TomeDeleteDialog,
    SpellPanelDescriptionComponent,
    SpellEmbedComponent,
    SpellEditorComponent,
    TomeSRDImportDialog,
    EffectEditorComponent,
    NewEffectCardComponent,
    TargetEffectComponent,
    AttackEffectComponent,
    SaveEffectComponent,
    DamageEffectComponent,
    IEffectEffectComponent,
    RollEffectComponent,
    TextEffectComponent,
  ],
  entryComponents: [
    NewPackDialog,
    PackOptionsDialog,
    PackShareDialog,
    PackDeleteDialog,
    PackJsonDialog,
    PackMarkdownDialog,
    PackJSONImportDialog,
    PackSRDImportDialog,

    NewTomeDialog,
    TomeShareDialog,
    TomeOptionsDialog,
    TomeDeleteDialog,
    TomeSRDImportDialog,
  ]
})
export class HomebrewModule {
}
