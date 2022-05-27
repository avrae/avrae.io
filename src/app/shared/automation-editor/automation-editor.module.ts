import {CdkTreeModule} from '@angular/cdk/tree';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {AutomationEditorComponent} from './automation-editor.component';
import {AttackEffectComponent} from './effect-editor/attack-effect/attack-effect.component';
import {ConditionEffectComponent} from './effect-editor/condition-effect/condition-effect.component';
import {CounterEffectComponent} from './effect-editor/counter-effect/counter-effect.component';
import {DamageEffectComponent} from './effect-editor/damage-effect/damage-effect.component';
import {EffectEditorComponent} from './effect-editor/effect-editor.component';
import {HigherLevelComponent} from './effect-editor/higher-level/higher-level.component';
import {IEffectEffectComponent} from './effect-editor/ieffect-effect/ieffect-effect.component';
import {RollEffectComponent} from './effect-editor/roll-effect/roll-effect.component';
import {SaveEffectComponent} from './effect-editor/save-effect/save-effect.component';
import {SpellEffectComponent} from './effect-editor/spell-effect/spell-effect.component';
import {TargetEffectComponent} from './effect-editor/target-effect/target-effect.component';
import {TempHPEffectComponent} from './effect-editor/temphp-effect/temphp-effect.component';
import {TextEffectComponent} from './effect-editor/text-effect/text-effect.component';
import {VariableEffectComponent} from './effect-editor/variable-effect/variable-effect.component';
import {NewEffectButtonComponent} from './new-effect-button.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexModule,
    CdkTreeModule
  ],
  declarations: [
    EffectEditorComponent,
    AttackEffectComponent,
    DamageEffectComponent,
    IEffectEffectComponent,
    RollEffectComponent,
    SaveEffectComponent,
    TargetEffectComponent,
    TempHPEffectComponent,
    TextEffectComponent,
    HigherLevelComponent,
    AutomationEditorComponent,
    VariableEffectComponent,
    ConditionEffectComponent,
    CounterEffectComponent,
    SpellEffectComponent,
    NewEffectButtonComponent,
  ],
  exports: [AutomationEditorComponent]
})
export class AutomationEditorModule {
}
