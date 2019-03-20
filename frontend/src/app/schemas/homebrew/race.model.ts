type Size = 'T' | 'S' | 'M' | 'L' | 'H';
type Ability = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export class Race {
  /**
   * The name of the race.
   */
  name: string;
  /**
   * The size of the race: Tiny, Small, Medium, Large, Huge.
   */
  size: Size;
  /**
   * The speed of the race (e.g. "30 ft.", "30 ft., 50 ft. fly")
   */
  speed: string;
  /**
   * What ASIs the Race gives (e.g. {"dex": 1, "str": 2})
   */
  asi: Map<Ability, number>;
  features: RaceFeature[];
}

export class RaceFeature {
  name: string;
  text: string;
}
