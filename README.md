# ECHO Deck — a Bunkers & Badasses player companion

A single-file webapp for players of *Bunkers & Badasses* (the Borderlands
tabletop RPG). No build step, no server, no dependencies — open
`index.html` in a browser and go.

## Features

- **Dice roller** — d4 through d100 with quantity and modifier steppers,
  one-tap skill checks (d20 + your ACC/DMG/SPD/MST mod), melee checks, and
  a roll log that flags natural 20s (Badass!) and natural 1s.
- **Gun locker** — store each gun's type, manufacturer, rarity, element,
  range, damage dice, crit dice, and its accuracy bar (hits/crits at 2–7,
  8–15, 16+). One **Attack** button resolves the whole thing: rolls
  d20 + ACC mod, reads the matching accuracy band, adds a bonus crit on a
  natural 20, misses on a natural 1, then rolls all hit and crit dice and
  totals the damage.
- **Random gun generator** — the **Loot a gun** button rolls up a gun at
  your character's level: type, manufacturer, level-weighted rarity,
  element chance, scaled damage dice, and a procedurally generated name.
  Edit it afterwards if your GM hands you something different.
- **Gear tab** — shields (capacity + recharge; **Equip** sets your shield
  pool), grenade mods (damage dice + element with a one-tap **Throw**
  roll), and relics/other items with free-text effects.
- **Badass tokens on rolls** — while you have tokens, your newest roll in
  the log offers **Reroll** (re-rolls the whole thing, attacks included)
  or **+1d6** (boosts the check total, or the damage total on an attack).
  Each costs one token, straight off the header counter.
- **Character tracker** — name/class/level, stat mods, gold, XP, and
  shield/health/armor pools with steppers. The sticky header shows your
  vitals bars and a badass-token counter at all times.
- **Persistence** — everything saves to your browser's `localStorage`, so
  your character and arsenal survive a refresh.

## Running it

```sh
# just open the file
open index.html          # macOS
xdg-open index.html      # Linux

# or serve it if you prefer
python3 -m http.server 8000
```

## Notes

- Dice notation for damage/crit fields: `NdS` or `NdS+B`, e.g. `2d6`,
  `1d8+2`.
- This is an unofficial fan-made tool. It ships with no game content —
  you enter your own guns and stats from your own books.
