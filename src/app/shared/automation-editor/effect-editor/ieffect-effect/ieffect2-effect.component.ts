import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors} from '@angular/forms';
import {isEmpty} from 'lodash';
import {AttackInteraction, ButtonInteraction, IEffect} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';
import {PASSIVE_EFFECTS} from './passiveEffects';

const CUSTOM_SENTINEL = '__custom';

@Component({
  selector: 'avr-ieffect2-effect',
  templateUrl: './ieffect2-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class IEffect2EffectComponent extends EffectComponent<IEffect> implements OnInit {

  passiveEffects = this.fb.array([]);
  attacks = this.fb.array([]);
  buttons = this.fb.array([]);

  // formgroup for the entire effect
  effectGroup = this.fb.group({
    passiveEffects: this.passiveEffects,
    attacks: this.attacks,
    buttons: this.buttons
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.populatePassiveEffectForm();
    this.passiveEffects.valueChanges.subscribe(value => this.onPassiveEffectsChange(value));
    this.populateAttackForm();
    this.attacks.valueChanges.subscribe(value => this.onAttacksChange(value));
    this.populateButtonForm();
    this.buttons.valueChanges.subscribe(value => this.onButtonsChange(value));
  }

  // ==== wrappers ====
  // duration: blank -> undefined
  get durationWrapper(): string {
    return this.effect.duration?.toString() ?? '';
  }

  set durationWrapper(value: string) {
    if (!value) {
      this.effect.duration = undefined;
    } else {
      this.effect.duration = value;
    }
  }

  // ==== passive effects ====
  PASSIVE_EFFECTS = PASSIVE_EFFECTS;
  CUSTOM_SENTINEL = CUSTOM_SENTINEL;

  // --- lifecycle ---
  populatePassiveEffectForm() {
    // called once to set up the passive effect FormArray with the existing passive effects
    if (!this.effect.effects) {
      return;
    }

    for (const [pKey, pVal] of Object.entries(this.effect.effects)) {
      const passiveEffectDef = PASSIVE_EFFECTS[pKey];
      if (!passiveEffectDef) {
        continue;
      }

      // helper
      const k = (val) => passiveEffectDef.defaultOptions?.map(o => o.value).includes(val) ? [val, null, false] : [CUSTOM_SENTINEL, val, false];

      // if the passive effects allows multiple entries, unroll them into a formgroup each
      if (passiveEffectDef.isList) {
        for (const val of pVal) {
          this.addPassiveEffect(pKey, ...k(val));
        }
      } else {
        this.addPassiveEffect(pKey, ...k(pVal));
      }
    }
  }

  addPassiveEffect(effectType = null, defaultOptions = '', value = '', emitChanges = true) {
    const effectTypeControl = this.fb.control(effectType, (control) => this.passiveEffectTypeValidator(control));
    const defaultOptionsControl = this.fb.control(defaultOptions);
    const valueControl = this.fb.control(value);

    // set up change tracking
    effectTypeControl.valueChanges.subscribe(() => {
      defaultOptionsControl.setValue(null);
      valueControl.setValue(null);
    });

    // add to formarray
    this.passiveEffects.push(
      this.fb.group({
        effectType: effectTypeControl,
        defaultOptions: defaultOptionsControl,
        value: valueControl
      }),
      {emitEvent: emitChanges}
    );
  }

  deletePassiveEffect(idx: number) {
    this.passiveEffects.removeAt(idx);
  }

  onPassiveEffectsChange(newValue: { effectType: string | null, defaultOptions: string | null, value: string | null }[]) {
    // build new PassiveEffect
    const out = {};
    for (const {effectType, defaultOptions, value} of newValue) {
      if (!(effectType in PASSIVE_EFFECTS)) {
        continue;
      }
      // the final value is the custom value if the select value is __custom or null
      const finalVal = defaultOptions === CUSTOM_SENTINEL ? value : defaultOptions || value;
      if (PASSIVE_EFFECTS[effectType]!.isList) {
        out[effectType] = [...out[effectType] ?? [], finalVal];
      } else {
        out[effectType] = finalVal;
      }
    }
    // write changes back to PassiveEffect
    this.effect.effects = isEmpty(out) ? undefined : out;
    this.changed.emit();
  }

  passiveEffectTypeValidator(control: AbstractControl): ValidationErrors | null {
    const allOtherUniqueEffectTypes = this.passiveEffects.controls
      // filter to not this control
      .filter(group => group.get('effectType') !== control)
      // extract the type
      .map(group => group.get('effectType').value)
      // filter to only unique types
      .filter(t => !PASSIVE_EFFECTS[t].isList);
    if (allOtherUniqueEffectTypes.includes(control.value)) {
      return {effectType: {name: `Can only specify one ${control.value} per IEffect`}};
    }
    return null;
  }

  // --- select helpers ---
  passiveEffectTypeOptions = Object.entries(PASSIVE_EFFECTS)
    .map(([k, v]) => ({value: k, name: v.name}));

  hasDefaultOptions(formGroup: AbstractControl): boolean {
    const passiveEffectDef = PASSIVE_EFFECTS[formGroup.get('effectType').value];
    if (!passiveEffectDef) {
      return false;
    }
    return passiveEffectDef.defaultOptions != null;
  }

  isCustomValue(formGroup: AbstractControl): boolean {
    const effectType = formGroup.get('effectType').value;
    return effectType != null
      && (formGroup.get('defaultOptions').value === CUSTOM_SENTINEL
        || !PASSIVE_EFFECTS[effectType]?.defaultOptions?.length);
  }

  isValueIntExpression(formGroup: AbstractControl): boolean {
    const passiveEffectDef = PASSIVE_EFFECTS[formGroup.get('effectType').value];
    if (!passiveEffectDef) {
      return true;
    }
    return passiveEffectDef.type === 'intexpression';
  }

  // ==== actions ====
  // --- lifecycle ---
  populateAttackForm() {
    // called once to set up the FormArray with the existing attacks
    if (!this.effect.attacks) {
      return;
    }
    for (const attackInteraction of this.effect.attacks) {
      this.addAttack(attackInteraction, false);
    }
  }

  addAttack(attackInteraction?: AttackInteraction, emitChanges = true) {
    // name changes emit treeChanged to update the tree with interaction name
    const nameControl = this.fb.control(attackInteraction?.attack.name ?? 'New Action');
    nameControl.valueChanges.subscribe(() => {
      setTimeout(() => this.treeChanged.emit());  // hack to ensure changed happens first
    });
    // add to formarray
    this.attacks.push(this.fb.group(
      {
        name: nameControl,
        verb: this.fb.control(attackInteraction?.attack.verb ?? null),
        thumb: this.fb.control(attackInteraction?.attack.thumb ?? null),
        phrase: this.fb.control(attackInteraction?.attack.phrase ?? null),
        proper: this.fb.control(attackInteraction?.attack.proper ?? false),
        criton: this.fb.control(attackInteraction?.attack.criton ?? null),
        extraCritDamage: this.fb.control(attackInteraction?.attack.extra_crit_damage ?? null),
        defaultDc: this.fb.control(attackInteraction?.defaultDC ?? null),
        defaultAttackBonus: this.fb.control(attackInteraction?.defaultAttackBonus ?? null),
        defaultCastingMod: this.fb.control(attackInteraction?.defaultCastingMod ?? null),
        // used to maintain a ref to the automation that gets edited in the tree
        _automation: this.fb.control(attackInteraction?.attack.automation ?? [])
      },
      {emitEvent: emitChanges}
    ));
    if (emitChanges) {
      this.treeChanged.emit();
    }
  }

  deleteAttack(idx: number) {
    this.attacks.removeAt(idx);
    this.treeChanged.emit();
  }

  onAttacksChange(newValue) {
    // build new list of AttackInteractions
    const out: AttackInteraction[] = [];
    for (const attackGroup of newValue) {
      out.push({
        attack: {
          _v: 2,
          name: attackGroup.name,
          automation: attackGroup._automation,  // hopefully this keeps the right ref lol
          verb: attackGroup.verb || undefined,
          thumb: attackGroup.thumb || undefined,
          phrase: attackGroup.phrase || undefined,
          proper: attackGroup.proper || undefined,
          criton: attackGroup.criton || undefined,
          extra_crit_damage: attackGroup.extraCritDamage || undefined,
        },
        defaultDC: attackGroup.defaultDc || undefined,
        defaultAttackBonus: attackGroup.defaultAttackBonus || undefined,
        defaultCastingMod: attackGroup.defaultCastingMod || undefined
      });
    }
    // write changes back to PassiveEffect
    this.effect.attacks = isEmpty(out) ? undefined : out;
    this.changed.emit();
  }

  // ==== buttons ====
  buttonStyleOptions = [
    {name: 'Blurple', value: '1'},
    {name: 'Grey', value: '2'},
    {name: 'Green', value: '3'},
    {name: 'Red', value: '4'}
  ];

  // --- lifecycle ---
  populateButtonForm() {
    // called once to set up the FormArray with the existing buttons
    if (!this.effect.buttons) {
      return;
    }
    for (const buttonInteraction of this.effect.buttons) {
      this.addButton(buttonInteraction, false);
    }
  }

  addButton(buttonInteraction?: ButtonInteraction, emitChanges = true) {
    // name changes emit treeChanged to update the tree with interaction name
    const labelControl = this.fb.control(buttonInteraction?.label ?? 'New Button');
    labelControl.valueChanges.subscribe(() => {
      setTimeout(() => this.treeChanged.emit());  // hack to ensure changed happens first
    });

    // style can be custom
    let styleConfig;
    if (!buttonInteraction?.style || this.buttonStyleOptions.some(style => style.value === buttonInteraction.style)) {
      styleConfig = {
        style: this.fb.control(buttonInteraction?.style || '1'),
        customStyle: this.fb.control(null),
      };
    } else {
      styleConfig = {
        style: this.fb.control(CUSTOM_SENTINEL),
        customStyle: this.fb.control(buttonInteraction?.style || null),
      };
    }

    // add to formarray
    this.buttons.push(this.fb.group(
      {
        label: labelControl,
        verb: this.fb.control(buttonInteraction?.verb ?? null),
        ...styleConfig,
        defaultDc: this.fb.control(buttonInteraction?.defaultDC ?? null),
        defaultAttackBonus: this.fb.control(buttonInteraction?.defaultAttackBonus ?? null),
        defaultCastingMod: this.fb.control(buttonInteraction?.defaultCastingMod ?? null),
        // used to maintain a ref to the automation that gets edited in the tree
        _automation: this.fb.control(buttonInteraction?.automation ?? [])
      },
      {emitEvent: emitChanges}
    ));
    if (emitChanges) {
      this.treeChanged.emit();
    }
  }

  deleteButton(idx: number) {
    this.buttons.removeAt(idx);
    this.treeChanged.emit();
  }

  onButtonsChange(newValue) {
    // build new list of ButtonInteractions
    const out: ButtonInteraction[] = [];
    for (const buttonGroup of newValue) {
      const style = buttonGroup.style === CUSTOM_SENTINEL ? buttonGroup.customStyle : buttonGroup.style;
      out.push({
        label: buttonGroup.label,
        automation: buttonGroup._automation,
        verb: buttonGroup.verb || undefined,
        style: style || undefined,
        defaultDC: buttonGroup.defaultDc || undefined,
        defaultAttackBonus: buttonGroup.defaultAttackBonus || undefined,
        defaultCastingMod: buttonGroup.defaultCastingMod || undefined
      });
    }
    // write changes back to PassiveEffect
    this.effect.buttons = isEmpty(out) ? undefined : out;
    this.changed.emit();
  }

  // helpers
  isCustomButtonStyle(buttonGroup: AbstractControl): boolean {
    return buttonGroup.get('style').value === CUSTOM_SENTINEL;
  }
}


