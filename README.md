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
  your character's level — any type, or a type you pick from the
  dropdown: manufacturer, level-weighted rarity,
  element chance, scaled damage dice, and a procedurally generated name.
  Edit it afterwards if your GM hands you something different.
- **Gear tab** — shields (capacity + recharge; **Equip** sets your shield
  pool), grenade mods (damage dice + element with a one-tap **Throw**
  roll), potions (quantity + heal dice; **Drink** rolls the healing and
  applies it to your health pool), and relics/other items with free-text
  effects.
- **Badass tokens on rolls** — while you have tokens, your newest roll in
  the log offers **Reroll** (re-rolls the whole thing, attacks included)
  or **+1d6** (boosts the check total, or the damage total on an attack).
  Each costs one token, straight off the header counter.
- **Character sheet** — everything on the official sheet: name, archetype,
  class, background, level, gold, XP; stat values and mods; badass rank
  with derived Initiative and Movement; the six checks (Interact, Talk,
  Insight, Sneak, Search, Traverse) with misc mods and one-tap rolls;
  melee die; shield (capacity + recharge), health (+ regen), armor, and
  grenade pools; favored gun, potions, traits, and archetype feat. The
  sticky header shows vitals bars and badass tokens at all times.
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

## Skill trees & class data

`classes.js` ships with all ten class skill trees (Assassin, Berserker,
Commando, Gunzerker, Hunter, Mechromancer, Psycho, Siren Lightwalk,
Siren Phaselock, Soldier), transcribed from the free class sheets
published by Nerdvana Games — skill names, tiers, ranks, and mechanics
match the sheets, with condensed wording. Pick a class on the **Skills**
tab, allocate points, tap a skill to read what it does. Tier thresholds
default to 5 points per tier (`pointsPerTier` — adjust it if your table
uses a different unlock rule).

To add homebrew or house-ruled classes, use the same structure:

```js
window.BNB_CLASSES = {
  "My Class": {
    actionSkill: { name: "...", desc: "..." },   // optional
    pointsPerTier: 5,        // optional; points in a tree to unlock each tier
    trees: [                 // up to 3 trees
      {
        name: "Tree Name",
        tiers: [             // up to 5 tiers, each up to 3 skills
          [ { name: "Skill", max: 5, desc: "Effect per rank" } ],
          [ /* tier 2 skills... */ ]
        ]
      }
    ]
  }
};
```

Then pick the class on the **Skills** tab and allocate points with the
+/− buttons — higher tiers unlock as you spend points in that tree, and
allocations are saved per class in your browser. If you're using a hosted
copy and can't edit files, the Skills tab has an **Import class data
(JSON)** box that takes the exact same structure as strict JSON.

## Notes

- Dice notation for damage/crit fields: `NdS` or `NdS+B`, e.g. `2d6`,
  `1d8+2`.
- This is an unofficial fan-made tool, not affiliated with Nerdvana
  Games. Class data comes from their freely published class sheets; the
  book remains the rules source of truth.

## Testing

`test/exhaustive.js` is a Playwright suite (194 checks) covering every
control — dice, clamps, gun form validation/edit/scrap, attack bands
(forced nat 1/nat 20 via a stubbed RNG), loot generation, gear kinds,
equip syncing, badass-token boosts/rerolls, log capping, persistence,
and horizontal-overflow checks at six viewport widths from 320px up.

```sh
npm install playwright-core
node test/exhaustive.js          # set CHROMIUM_PATH if needed
```
