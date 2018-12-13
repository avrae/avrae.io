
# DM Combat Guide

Remember, arguments surrounded like `<this>` are required, and arguments in \[brackets] are optional.

Don't include the brackets when typing your command, and remember to put quotes around arguments with spaces in them!

This guide will move roughly in chronological order, meaning commands near the top should be run first.


## Starting Combat

First, combat must be started in a channel. All `!init` commands must be called in the same channel as combat is started in. Then, all the combatants must be added.

### !init begin

Run this command to start combat. Avrae will output the summary message and pin it, then a quick reminder on how to add yourself to combat.

### !init madd \<monster name> \[arguments]

After combat has started, you'll want to add your monsters. If the monsters can be looked up with `!monster`, they can be added with this command.

Common arguments include `-n <number of monsters>` (ex. `-n 5`) to add N number of the same monster, and `-name <monster name scheme>` to rename the monster(s). Any `#` in the name scheme will be replaced with a number, if `-n` is used (ex. `-name "Orc#" -n 2` adds Orc1 and Orc2).

### !init add \<initiative modifier> \<name> \[arguments]

If you're adding a homebrew monster and haven't imported it with `!bestiary`, but still want to use the integrated tracker, you'll have to use this command.

Generally, as a DM, the arguments you'll want to supply are `-h` to hide HP and AC, `-hp <max HP>` to set max HP, and `-ac <AC>` to set AC.


## Running Combat

Once you've finished setting up your combat (added all monsters, and players have added themselves), run `!init next` to move to the first turn and begin combat.

### !init next

This command moves combat to the next turn in order, and prints out a summary of whose turn it is.

### !init attack \<target name> \<weapon name> \[arguments]

Related: `!init aoo <combatant name> <target name> <weapon name> [arguments]`

This command attacks another combatant, using the attacks of whoever's turn it is (or the supplied name, if using aoo). If applicable, AC comparison and HP will be done automatically.

To see valid arguments, see the documentation for `!attack` and `!monster_atk`.

To see a list of a monster's attacks, run `!ma <monster name>`.


## Helper Commands

### !init hp \<combatant name> \[operator] \<value>

This command modifies a combatant's HP by `value` if operator is not passed. The operator can be `set` to set HP to `value`, or `max` to set the max HP to `value`.

### !init opt \<combatant name> \<arguments>

This command modifies the general attributes of a combatant. Most commonly used are `-ac <AC>`, which sets the combatant's AC to `AC`, `-resist/immune/vuln <damage type>`, which gives the combatant resistance/immunity/vulnerability to the passed type, and `-h`, which toggles whether the combatant's AC and HP are hidden.

### !init effect \<combatant name> \<duration> \<effect name> \[roll arguments]

This command adds an effect to a combatant for `duration` rounds (pass -1 for infinite). If roll arguments are passed, they will be appended to any calls of `!init attack` that the combatant makes while the effect is active.

### !init re \<combatant name> \[effect name]

This command removes an effect from a combatant, or all of them if the name is not passed.

### !init remove \<combatant name>

This command removes a combatant from combat.


## Ending Combat

### !init end

To end combat, just run this command and reply "yes".
