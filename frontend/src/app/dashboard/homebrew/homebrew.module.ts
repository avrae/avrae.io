import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MarkdownModule} from 'ngx-markdown';
import {MaterialModule} from '../../material/material.module';
import {DiscordEmbedModule} from '../../shared/discord-embed/discord-embed.module';
import {SpellEmbedModule} from '../../shared/spell-embed/spell-embed.module';
import {CompendiumDetailComponent} from './compendium-detail/compendium-detail.component';
import {CompendiumListComponent} from './compendium-list/compendium-list.component';
import {NewCompendiumDialog} from './dialogs/new-compendium-dialog.component';

import {HomebrewRoutingModule} from './homebrew-routing.module';
import {ItemsComponent} from './items/items.component';
import {NewPackDialog} from './items/new-pack-dialog/new-pack-dialog.component';
import {PackDeleteDialog} from './items/pack-delete-dialog/pack-delete-dialog.component';
import {ItemDetailComponent} from './items/pack-detail/item-detail/item-detail.component';
import {PackDetailComponent} from './items/pack-detail/pack-detail.component';
import {PackJsonDialog} from './items/pack-json-dialog/pack-json-dialog.component';
import {PackJSONImportDialog} from './items/pack-json-import-dialog/pack-json-import-dialog.component';
import {PackMarkdownDialog} from './items/pack-markdown-dialog/pack-markdown-dialog.component';
import {PackOptionsDialog} from './items/pack-options-dialog/pack-options-dialog.component';
import {PackShareDialog} from './items/pack-share-dialog/pack-share-dialog.component';
import {PackSRDImportDialog} from './items/pack-srd-import-dialog/pack-srd-import-dialog.component';
import {NewTomeDialog} from './spells/dialogs/new-tome-dialog.component';
import {TomeDeleteDialog} from './spells/dialogs/tome-delete-dialog.component';
import {TomeJSONDialog} from './spells/dialogs/tome-json-dialog/tome-json-dialog.component';
import {TomeJSONImportDialog} from './spells/dialogs/tome-json-import-dialog/tome-json-import-dialog.component';
import {TomeMarkdownDialog} from './spells/dialogs/tome-markdown-dialog/tome-markdown-dialog.component';
import {TomeOptionsDialog} from './spells/dialogs/tome-options-dialog.component';
import {TomeShareDialog} from './spells/dialogs/tome-share-dialog.component';
import {TomeSRDImportDialog} from './spells/dialogs/tome-srd-import-dialog.component';
import {SpellsComponent} from './spells/spells.component';
import {SpellDetailComponent} from './spells/tome-detail/spell-detail/spell-detail.component';
import {SpellPanelDescriptionComponent} from './spells/tome-detail/spell-detail/spell-panel-description/spell-panel-description.component';
import {AttackEffectComponent} from './spells/tome-detail/spell-editor/effect-editor/attack-effect/attack-effect.component';
import {DamageEffectComponent} from './spells/tome-detail/spell-editor/effect-editor/damage-effect/damage-effect.component';
import {EffectEditorComponent} from './spells/tome-detail/spell-editor/effect-editor/effect-editor.component';
import {HigherLevelComponent} from './spells/tome-detail/spell-editor/effect-editor/higher-level/higher-level.component';
import {IEffectEffectComponent} from './spells/tome-detail/spell-editor/effect-editor/ieffect-effect/ieffect-effect.component';
import {RollEffectComponent} from './spells/tome-detail/spell-editor/effect-editor/roll-effect/roll-effect.component';
import {SaveEffectComponent} from './spells/tome-detail/spell-editor/effect-editor/save-effect/save-effect.component';
import {TargetEffectComponent} from './spells/tome-detail/spell-editor/effect-editor/target-effect/target-effect.component';
import {TempHPEffectComponent} from './spells/tome-detail/spell-editor/effect-editor/temphp-effect/temphp-effect.component';
import {TextEffectComponent} from './spells/tome-detail/spell-editor/effect-editor/text-effect/text-effect.component';
import {NewEffectCardComponent} from './spells/tome-detail/spell-editor/new-effect-card/new-effect-card.component';
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
    HigherLevelComponent,
    TomeJSONDialog,
    TomeMarkdownDialog,
    TomeJSONImportDialog,
    TempHPEffectComponent,
    CompendiumListComponent,
    CompendiumDetailComponent,
    NewCompendiumDialog,
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
    TomeJSONDialog,
    TomeMarkdownDialog,
    TomeJSONImportDialog,

    NewCompendiumDialog,
  ]
})
export class HomebrewModule {
}
