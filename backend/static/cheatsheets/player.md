# Player Combat Guide

Remember, arguments surrounded like `<this>` are required, and arguments in \[brackets] are optional.

Don't include the brackets when typing your command, and remember to put quotes around arguments with spaces in them!

This guide will move roughly in chronological order, meaning commands near the top should be run first.

## Joining Combat

To join a combat, your DM must first start it. Once they have, proceed to the commands below.

### !init cadd \[arguments]

This command adds your current active character in SheetManager to combat. Common arguments are `-h`, which hides your AC/HP, and `adv/dis`, which give advantage/disadvantage on the roll.

### !init add \<initiative modifier> \<name> \[arguments]

If you're adding a character that is not tracked in the bot, but still want to use the integrated tracker, you'll have to use this command.

Generally, as a player, the arguments you'll want to supply are `-hp <max HP>` to set max HP and `-ac <AC>` to set AC.

### What now?

You're all set up! Just wait for your turn to come up in combat.


## Your Turn

Now that it's your turn, you probably want to do something. The most common actions are attacking or casting a spell, as detailed below.

### !init attack \<target name> \<weapon name> \[arguments]

Related: `!init aoo <combatant name> <target name> <weapon name> [arguments]`

This command attacks another combatant, using the attacks of whoever's turn it is (or the supplied name, if using aoo). If applicable, AC comparison and HP will be done automatically.

To see valid arguments, see the documentation for `!attack` and `!monster_atk`.

To see a list of a character's attacks, run `!a`.

### !init cast \<spell name> -t \<target name> \[arguments]

The syntax for this command is a little daunting. Then again, magic is in general.

This command casts a spell at another combatant. At least one `-t <target name>` is required, but as many can be supplied as needed (for multi-target/AoE spells). Saving throws, attack rolls, or any other applicable roll will be done automatically.

### !init next

This command moves combat to the next turn in order, and prints out a summary of whose turn it is. You should run this at the end of your turn.


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
