REQUIRED_SPELL_PROPS = ('name', 'level', 'school', 'automation')
SPELL_SCHOOLS = ('A', 'V', 'E', 'I', 'D', 'N', 'T', 'C')


def ensure_keys(spell):
    assert all(p in spell for p in REQUIRED_SPELL_PROPS), "Spell missing properties"
    assert isinstance(spell['name'], str), "Spell name must be string"
    assert isinstance(spell['automation'], list) or spell['automation'] is None, "Invalid spell automation"


def check_automation(automation):
    for effect in automation:
        check_effect(effect)


def check_effect(effect):
    assert isinstance(effect, dict), "Effect must be object"
    assert "type" in effect, "Effect must have type"
    assert effect['type'] in EFFECT_TYPES, "Effect has invalid type"
    EFFECT_TYPES[effect['type']](effect)
    if 'meta' in effect:
        for metaeffect in effect['meta']:
            check_effect(metaeffect)


def check_target(effect):
    assert 'target' in effect, "Target effect must have target"
    assert effect['target'] in ("all", "each", "self") or (
            isinstance(effect['target'], int) and effect['target'] > 0), "Invalid target"
    assert 'effects' in effect, "Target effect must have effects"
    for effect_ in effect['effects']:
        check_effect(effect_)


def check_attack(effect):
    assert 'hit' in effect, "Attack effect must have hit"
    assert 'miss' in effect, "Attack effect must have miss"
    for effect_ in effect['hit']:
        check_effect(effect_)
    for effect_ in effect['miss']:
        check_effect(effect_)


def check_save(effect):
    assert 'stat' in effect, "Save effect must have stat"
    assert effect['stat'] in ('str', 'dex', 'con', 'int', 'wis', 'cha'), "Invalid save type"
    assert 'fail' in effect, "Save effect must have fail"
    assert 'success' in effect, "Save effect must have success"
    for effect_ in effect['fail']:
        check_effect(effect_)
    for effect_ in effect['success']:
        check_effect(effect_)


def check_damage(effect):
    assert 'damage' in effect, "Damage effect must have damage"
    if 'higher' in effect:
        check_higher(effect['higher'])
    if 'cantripScale' in effect:
        assert isinstance(effect['cantripScale'], bool), "CantripScale must be boolean"


def check_ieffect(effect):
    assert 'name' in effect, "IEffect effect must have name"
    assert 'duration' in effect, "IEffect effect must have duration"
    assert 'effects' in effect, "IEffect effect must have effects"
    assert isinstance(effect['name'], str), "IEffect name must be string"
    assert isinstance(effect['duration'], (int, str)), "IEffect duration must be int or string"
    assert isinstance(effect['effects'], str), "IEffect effects must be string"


def check_roll(effect):
    assert 'dice' in effect, "Roll effect must have dice"
    assert 'name' in effect, "Roll effect must have name"
    assert isinstance(effect['dice'], str), "Roll dice must be string"
    assert isinstance(effect['name'], str), "Roll name must be string"
    if 'higher' in effect:
        check_higher(effect['higher'])
    if 'cantripScale' in effect:
        assert isinstance(effect['cantripScale'], bool), "CantripScale must be boolean"


def check_text(effect):
    assert 'text' in effect, "Text effect must have text"
    assert isinstance(effect['text'], str), "Text text must be string"


EFFECT_TYPES = {
    "target": check_target,
    "attack": check_attack,
    "save": check_save,
    "damage": check_damage,
    "ieffect": check_ieffect,
    "roll": check_roll,
    "text": check_text
}


def check_higher(higher):
    for k, v in higher.items():
        assert isinstance(k, (str, int)), "Higher level key must be int or string"
        assert isinstance(v, str), "Higher level value must be string"
        assert 0 <= int(k) <= 9, "Higher level key must be [0..9]"


class ValidationError(Exception):
    pass
