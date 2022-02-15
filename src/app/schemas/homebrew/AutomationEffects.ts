// helper types

type AnnotatedString = string;
type IntExpression = string;
type HigherLevels<T = string> = Map<number, T>;


// exported types
export class AutomationEffect {
  type: string;
  meta: AutomationEffect[];

  constructor(type, meta = []) {
    this.type = type;
    this.meta = meta || [];
  }

  public toJSON() {
    const {meta, ...props} = this;
    return meta?.length ? this : props;
  }
}

export class Target extends AutomationEffect {
  target: string | number;  // 'all' | 'each' | number | 'self'
  effects: AutomationEffect[];
  sortBy?: string;  // 'hp_asc' | 'hp_desc'

  constructor(target = 'all', effects = [], sortBy?, meta?) {
    super('target', meta);
    this.target = target;
    this.effects = effects;
    this.sortBy = sortBy;
  }
}

export class Attack extends AutomationEffect {
  hit: AutomationEffect[];
  miss: AutomationEffect[];
  attackBonus?: string;

  constructor(hit = [], miss = [], attackBonus?, meta?) {
    super('attack', meta);
    this.hit = hit;
    this.miss = miss;
    this.attackBonus = attackBonus;
  }
}

export class Save extends AutomationEffect {
  stat: string;  // 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
  fail: AutomationEffect[];
  success: AutomationEffect[];
  dc: IntExpression;

  constructor(stat = 'str', fail = [], success = [], dc?, meta?) {
    super('save', meta);
    this.stat = stat;
    this.fail = fail;
    this.success = success;
    this.dc = dc;
  }
}

export class Damage extends AutomationEffect {
  damage: AnnotatedString;
  overheal: boolean;
  higher?: HigherLevels;
  cantripScale?: boolean;

  constructor(damage = '', overheal?, higher?, cantripScale?, meta?) {
    super('damage', meta);
    this.damage = damage;
    this.overheal = overheal;
    this.higher = higher;
    this.cantripScale = cantripScale;
  }
}

export class TempHP extends AutomationEffect {
  amount: AnnotatedString;
  higher?: HigherLevels;
  cantripScale?: boolean;

  constructor(amount = '', higher?, cantripScale?, meta?) {
    super('temphp', meta);
    this.amount = amount;
    this.higher = higher;
    this.cantripScale = cantripScale;
  }
}

export class IEffect extends AutomationEffect {
  name: string;
  duration: number | IntExpression;
  effects: AnnotatedString;
  end?: boolean;
  conc?: boolean;
  desc?: AnnotatedString;
  stacking?: boolean;
  save_as?: string;
  parent?: string;

  constructor(name = '', duration = '', effects = '', desc = '', end = false, conc = false, stacking = false, save_as = null, parent = null, meta?) {
    super('ieffect', meta);
    this.name = name;
    this.duration = duration;
    this.effects = effects;
    this.end = end;
    this.desc = desc;
    this.stacking = stacking;
    this.save_as = save_as;
    this.parent = parent;
  }
}

export class Roll extends AutomationEffect {
  dice: AnnotatedString;
  name: string;
  higher?: HigherLevels;
  cantripScale?: boolean;
  hidden?: boolean;

  constructor(dice = '', name = '', higher?, cantripScale?, hidden?, meta?) {
    super('roll', meta);
    this.dice = dice;
    this.name = name;
    this.higher = higher;
    this.cantripScale = cantripScale;
    this.hidden = hidden;
  }
}

export class Text extends AutomationEffect {
  text: AnnotatedString | AbilityReference;

  constructor(text = '', meta?) {
    super('text', meta);
    this.text = text;
  }
}

export class SetVariable extends AutomationEffect {
  name: string;
  value: IntExpression;
  higher?: HigherLevels<IntExpression>;
  onError?: IntExpression;

  constructor(name = '', value = '', higher?, onError?, meta?) {
    super('variable', meta);
    this.name = name;
    this.value = value;
    this.higher = higher;
    this.onError = onError;
  }
}

export class Condition extends AutomationEffect {
  condition: IntExpression;
  onTrue: AutomationEffect[];
  onFalse: AutomationEffect[];
  errorBehaviour?: string; // 'true' | 'false' | 'both' | 'neither' | 'raise'

  constructor(condition = '', onTrue = [], onFalse = [], errorBehaviour = 'false', meta?) {
    super('condition', meta);
    this.condition = condition;
    this.onTrue = onTrue;
    this.onFalse = onFalse;
    this.errorBehaviour = errorBehaviour;
  }
}

export class UseCounter extends AutomationEffect {
  counter: AbilityReference | SpellSlotReference | string;
  amount: IntExpression;
  allowOverflow?: boolean;
  errorBehaviour?: string | null;

  constructor(counter = '', amount = '', allowOverflow = false, errorBehaviour = 'warn', meta?) {
    super('counter', meta);
    this.counter = counter;
    this.amount = amount;
    this.allowOverflow = allowOverflow;
    this.errorBehaviour = errorBehaviour;
  }
}

export class SpellSlotReference {
  slot: number | IntExpression;

  constructor(slot) {
    this.slot = slot;
  }
}

export class AbilityReference {
  id: number;
  typeId: number;

  constructor(id, typeId) {
    this.id = id;
    this.typeId = typeId;
  }
}

export class CastSpell extends AutomationEffect {
  id: number;
  level?: number;
  dc?: IntExpression;
  attackBonus?: IntExpression;
  castingMod?: IntExpression;

  constructor(id = 2102, level?, dc?, attackBonus?, castingMod?, meta?) {
    super('spell', meta);
    this.id = id;
    this.level = level;
    this.dc = dc;
    this.attackBonus = attackBonus;
    this.castingMod = castingMod;
  }
}
