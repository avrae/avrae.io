import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors} from '@angular/forms';
import {IEffect} from '../../types';
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

  // formgroup for the entire effect
  effectGroup = this.fb.group({
    passiveEffects: this.passiveEffects
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.populatePassiveEffectForm();
    this.passiveEffects.valueChanges.subscribe((value) => this.onPassiveEffectsChange(value));
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

  // --- change ---
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
    this.effect.effects = out;
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
}


