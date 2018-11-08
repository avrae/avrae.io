export class SpellEffect {
  type: string;
  meta: SpellEffect[];

  constructor(type, meta?) {
    this.type = type;
    this.meta = meta || null;
  }

}

export class Target extends SpellEffect {
  target: string | number;
  effects: SpellEffect[];

  constructor(target, effects, meta?) {
    super("target", meta);
    this.target = target;
    this.effects = effects;
  }
}

export class Attack extends SpellEffect {
  hit: SpellEffect[];
  miss: SpellEffect[];

  constructor(hit, miss, meta?) {
    super("attack", meta);
    this.hit = hit;
    this.miss = miss;
  }
}

export class Save extends SpellEffect {
  stat: string;
  fail: SpellEffect[];
  success: SpellEffect[];

  constructor(stat, fail, success, meta?) {
    super("save", meta);
    this.stat = stat;
    this.fail = fail;
    this.success = success;
  }
}

export class Damage extends SpellEffect {
  damage: string;
  higher?: Map<number, string>;
  cantripScale?: boolean;

  constructor(damage, higher?, cantripScale?, meta?) {
    super("damage", meta);
    this.damage = damage;
    this.higher = higher;
    this.cantripScale = cantripScale;
    this.meta = meta;
  }
}

export class IEffect extends SpellEffect {
  name: string;
  duration: number | string;
  effects: string;

  constructor(name, duration, effects, meta?) {
    super("ieffect", meta);
    this.name = name;
    this.duration = duration;
    this.effects = effects;
  }
}

export class Roll extends SpellEffect {
  dice: string;
  name: string;
  higher?: Map<number, string>;
  cantripScale?: boolean;

  constructor(dice, higher?, cantripScale?, meta?) {
    super("roll", meta);
    this.dice = dice;
    this.higher = higher;
    this.cantripScale = cantripScale;
    this.meta = meta;
  }
}

export class Text extends SpellEffect {
  text: string;

  constructor(text, meta?) {
    super("text", meta);
    this.text = text;
  }
}
