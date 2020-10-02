export class AutomationEffect {
  type: string;
  meta: AutomationEffect[];

  constructor(type, meta = []) {
    this.type = type;
    this.meta = meta || [];
  }

}

export class Target extends AutomationEffect {
  target: string | number;
  effects: AutomationEffect[];

  constructor(target = 'all', effects = [], meta?) {
    super('target', meta);
    this.target = target;
    this.effects = effects;
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
  stat: string;
  fail: AutomationEffect[];
  success: AutomationEffect[];
  dc: string;

  constructor(stat = 'str', fail = [], success = [], dc?, meta?) {
    super('save', meta);
    this.stat = stat;
    this.fail = fail;
    this.success = success;
    this.dc = dc;
  }
}

export class Damage extends AutomationEffect {
  damage: string;
  overheal: boolean;
  higher?: Map<number, string>;
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
  amount: string;
  higher?: Map<number, string>;
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
  duration: number | string;
  effects: string;
  end?: boolean;
  desc?: string;

  constructor(name = '', duration = '', effects = '', desc = '',end = false, meta?) {
    super('ieffect', meta);
    this.name = name;
    this.duration = duration;
    this.effects = effects;
    this.end = end;
    this.desc = desc;
  }
}

export class Roll extends AutomationEffect {
  dice: string;
  name: string;
  higher?: Map<number, string>;
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
  text: string;

  constructor(text = '', meta?) {
    super('text', meta);
    this.text = text;
  }
}
