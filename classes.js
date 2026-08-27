// ============================================================================
// Class data for ECHO Deck — transcribed from the free class skill-tree
// sheets published by Nerdvana Games (nerdvanagames.com). Skill names, tiers,
// ranks, and mechanics match the sheets; wording is condensed. The sheets are
// the rules source of truth.
//
// Structure:
//   "Class Name": {
//     actionSkill: { name, desc },
//     pointsPerTier: 5,   // points in the tree to unlock each next tier
//     trees: [ { name, tiers: [ [ {name, max, desc}, ... ], ... ] } ]
//   }
//
// Every regular skill has 3 ranks (SL 1-3) on the sheets; capstones have 1.
// "SL" = Skill Level (ranks in that skill). "BR" = Badass Rank. "DR" =
// Damage Reduction. Add or paste more classes any time (Skills tab > Import).
// ============================================================================

window.BNB_CLASSES = {
  "Assassin": {
    actionSkill: {
      name: "Decepti0n",
      desc: "Cloak for 2 turns and send out an illusionary decoy that mimics your attacks and moves (mimicked attacks have no effect). Attacking breaks the cloak but upgrades all Hits to Crits for that attack. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Mercenary",
      tiers: [
        [
          { name: "Headshot", max: 3, desc: "+2 Crit Damage/SL." },
          { name: "Fast Hands", max: 3, desc: "+1 SPD. +1/SL on Interact Checks." },
          { name: "Counter Strike", max: 3, desc: "First time you take Damage in an encounter, deal +1 Hit/SL on your next 1+MST Mod attacks." },
          { name: "Iron Hand", max: 3, desc: "+1 Melee Damage and +10 max Health/SL." }
        ],
        [
          { name: "Killer", max: 3, desc: "On kill: +1 DMG Mod/SL for 1+MST Mod turns." },
          { name: "Precision", max: 3, desc: "+1 ACC/SL. +1 on Traverse Checks." },
          { name: "Ambush", max: 3, desc: "+1+MST Mod when attacking from behind. +1 DMG Mod/SL vs an enemy that attacked an ally this or last turn. +1/SL on Sneak Checks." },
          { name: "Fearless", max: 3, desc: "+1 MST. +2 DMG Mod/SL while Shields are depleted." }
        ],
        [
          { name: "One Shot One Kill", max: 3, desc: "First Ranged Attack each encounter deals a bonus 5+MST Mod Damage." },
          { name: "Bore", max: 3, desc: "1+MST Mod times/day: when a target is Crit, fire through them for 2/SL Damage to the nearest enemy." },
          { name: "Deathmark", max: 3, desc: "Your Melee Damage marks enemies; attacks on marked targets from all sources deal +2 DMG Mod/SL." },
          { name: "Unforseen", max: 3, desc: "Decoy explodes when Decepti0n ends: 1d6/SL+MST Mod Shock Damage to adjacent enemies. +1/SL on Sneak Checks." }
        ],
        [
          { name: "Kill Confirmed", max: 3, desc: "+1 Crit Damage/SL per extra Attack Action taken this encounter (resets after each encounter)." },
          { name: "Innervate", max: 3, desc: "While Decepti0n is active: +2 SPD Mod, +1 DMG Mod/SL and 5 Health Regen/SL." },
          { name: "Resurgence", max: 3, desc: "On melee kill: gain 1d4/SL+MST Mod Health." },
          { name: "Followthrough", max: 3, desc: "On kill: Extra Movement and +1 Melee Damage/SL for 1+MST Mod turns." }
        ],
        [
          { name: "Two Fang", max: 3, desc: "Take a Reload Action to add +1 Crit/SL to a next attack." },
          { name: "At One With The Gun", max: 3, desc: "+1+MST Mod ACC. +1 SPD/SL." },
          { name: "Backstab", max: 3, desc: "Melee attacks deal +2d6/SL Damage when attacking from behind." },
          { name: "Like The Wind", max: 3, desc: "+3 on Traverse Checks. +2 SPD." }
        ],
        [
          { name: "Death Blossom", max: 1, desc: "In Decepti0n, the decoy throws kunai: 3d6+MST Mod random Elemental Damage to all adjacent enemies." }
        ]
      ]
    }]
  },

  "Berserker": {
    actionSkill: {
      name: "Berserk",
      desc: "Put away guns and fight with fists for 2 turns: each turn gain Extra Movement, melee twice at +1 Melee Die Damage per attack, and regen 10 Health. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Brute",
      tiers: [
        [
          { name: "Iron Fist", max: 3, desc: "+1 Melee Damage/SL." },
          { name: "Hardened", max: 3, desc: "10+MST Mod Health/SL." },
          { name: "Safeguard", max: 3, desc: "Shield capacity +10/SL." },
          { name: "Endowed", max: 3, desc: "+1 Splash Damage/SL on all Explosive Damage." }
        ],
        [
          { name: "Bash", max: 3, desc: "On melee attack, roll 1d20+DMG Mod; on 15+ the target is Slowed." },
          { name: "Heavy Handed", max: 3, desc: "On kill: +1 DMG Mod/SL for 1+MST Mod turns." },
          { name: "Juggernaut", max: 3, desc: "First kill each encounter: +1d4/SL Damage Reduction for 1+MST Mod turns." },
          { name: "Wide Load", max: 3, desc: "+1 Hit on all Rocket Launchers. +1/SL Splash Damage." }
        ],
        [
          { name: "Endless Rage", max: 3, desc: "Berserk lasts an extra 1+MST Mod turns." },
          { name: "Prize Fighter", max: 3, desc: "First melee attack each encounter: roll 1d6/SL; target drops gold equal to 10x the sum." },
          { name: "Short Fuse", max: 3, desc: "+1/SL Berserk uses per day. +1/SL on Traverse Checks." },
          { name: "Cast Iron", max: 3, desc: "1d4/SL Damage Reduction vs Explosive and Splash Damage." },
          { name: "Sting Like A Bee", max: 3, desc: "During Berserk, first melee on an enemy each turn grants Extra Movement. +2/SL on Traverse Checks." }
        ],
        [
          { name: "Liquidate", max: 3, desc: "First Explosive Damage you deal each encounter activates Berserk for free." },
          { name: "Blood Sport", max: 3, desc: "Kill while Berserk is active: gain 5+MST Mod Health/SL." },
          { name: "Pay Back", max: 3, desc: "First time Shields deplete each encounter: +1 DMG Mod/SL for 1+MST Mod turns." },
          { name: "Diehard", max: 3, desc: "First time Health hits 0 each day: gain 10+MST Mod Health/SL." }
        ],
        [
          { name: "Rapid Reload", max: 3, desc: "+1 ACC/SL and +1 SPD/SL." },
          { name: "Revenge", max: 3, desc: "On kill: +1 DMG Mod/SL with all guns for 1+MST Mod turns." },
          { name: "Master Blaster", max: 3, desc: "On kill: +1 SPD Mod, and the party's equipped Rocket Launchers gain +1 Range/SL for the rest of the encounter." }
        ],
        [
          { name: "Unbreakable", max: 1, desc: "First time Shields deplete each encounter: gain 20+MST Mod Shields and +10 Shield Recharge for 2+MST Mod turns." }
        ]
      ]
    }]
  },

  "Commando": {
    actionSkill: {
      name: "Sabre Turret",
      desc: "Deploy a Turret in an adjacent square for 2 turns; it Taunts and fires at the closest enemy each turn. Turret: Armor 40, DMG 1d8 per Hit, ACC +2, accuracy 2-7: 2 Hits / 8-15: 3 Hits / 16+: 4 Hits. Destroyed if its Armor depletes. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Sabre",
      tiers: [
        [
          { name: "Sentry", max: 3, desc: "Sabre Turret gains +1 Hit/SL and lasts 1+MST Mod extra turns." },
          { name: "Ready", max: 3, desc: "+1 SPD and +1/SL on Search Checks." },
          { name: "Expertise", max: 3, desc: "+1 ACC Mod on all non-Favored Guns. +1/SL on Insight Checks." },
          { name: "Impact", max: 3, desc: "+1 MST. +1/SL Melee Damage." }
        ],
        [
          { name: "Laser Sight", max: 3, desc: "Sabre Turret gains +1 ACC/SL." },
          { name: "Overload", max: 3, desc: "+1 Hit on all Accuracy Ranges for 1 gun type/SL." },
          { name: "Metal Storm", max: 3, desc: "On kill: Extra Attack and +1 ACC Mod for 1+MST Mod turns." },
          { name: "Grenadier", max: 3, desc: "+1 max grenades/SL. +2 on Throw rolls." },
          { name: "Last Ditch Effort", max: 3, desc: "While Shields are depleted: Extra Movement and +2 DMG Mod/SL." }
        ],
        [
          { name: "Scorched Earth", max: 3, desc: "Sabre Turret fires Rockets: 1d12 Damage per Hit, with Splash." },
          { name: "Onslaught", max: 3, desc: "On kill: +1 DMG Mod/SL and Extra Movement for 1+MST Mod turns." },
          { name: "Steady", max: 3, desc: "+1 ACC. +2 on Interact Checks. +1 Grenade Damage/SL and +1 Rocket Launcher Damage/SL." },
          { name: "Battlefront", max: 3, desc: "While Sabre Turret is deployed: +1 DMG Mod/SL and 1+MST Mod Grenade Damage/SL." }
        ],
        [
          { name: "Duty Calls", max: 3, desc: "+2 DMG Mod and +1 ACC Mod/SL on all non-Favored Guns." },
          { name: "Do or Die", max: 3, desc: "Throw 2 grenades per Throw Action. +2 Grenade Damage/SL." },
          { name: "Resourceful", max: 3, desc: "+1 to the once-per-encounter limit of Sabre Turret." },
          { name: "Smirk", max: 3, desc: "Sabre Turret can deploy onto walls and ceilings." },
          { name: "Last Ditch Effort", max: 3, desc: "On kill: recharge 1d6+MST Mod/SL Shields." }
        ],
        [
          { name: "Longbow Turret", max: 3, desc: "Sabre Turret can be Thrown to deploy, dealing 2d6/SL Explosive Damage to adjacent enemies." },
          { name: "Ranger", max: 3, desc: "+1 ACC, DMG, SPD, and MST. +1/SL on all Checks." },
          { name: "Grit", max: 3, desc: "First time Health hits 0 each day: roll 1d20/SL; if any die is 15+, gain 10+MST Mod Health instead." },
          { name: "Phalanx Shield", max: 3, desc: "Sabre Turret gains a forward Shield that blocks 50 Damage, and can move 3+MST Mod squares per turn." }
        ],
        [
          { name: "Nuke", max: 1, desc: "Deploying Sabre Turret sets off a Radiation Blast: 5d6+MST Mod Radiation Damage to all enemies within 3 squares." }
        ]
      ]
    }]
  },

  "Gunzerker": {
    actionSkill: {
      name: "Gunzerking",
      desc: "Wield 2 equipped guns at once for 2 turns; each Ranged Attack fires both at a single target. Gain Health Regen while Gunzerking. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Gun Lust",
      tiers: [
        [
          { name: "Quick Draw", max: 3, desc: "+2 Initiative Mod/SL. +1/SL on Interact Checks." },
          { name: "Filled To The Brim", max: 3, desc: "+1/SL max grenades. +1+MST Mod max potions." },
          { name: "Incite", max: 3, desc: "First time you take Damage each encounter: Extra Movement. +1/SL on Traverse Checks." },
          { name: "Hard To Kill", max: 3, desc: "10+MST Mod Health. +5 Health Regen/SL." }
        ],
        [
          { name: "Last Longer", max: 3, desc: "Gunzerking lasts +1 turn. +2 on Talk Checks." },
          { name: "All I Need Is One", max: 3, desc: "After Gunzerking: +1 DMG Mod/SL for 1+MST Mod turns." },
          { name: "All In The Reflexes", max: 3, desc: "First turn of each encounter: Extra Movement. +1 Melee Damage/SL." },
          { name: "Asbestos", max: 3, desc: "Each SL, choose one: 1d4 Incendiary / Corrosive / Shock / Radiation Damage Reduction." },
          { name: "I'm The Juggernaut", max: 3, desc: "On kill: 1d4+MST Mod Damage Reduction for 1 turn/SL." }
        ],
        [
          { name: "Auto-Loader", max: 3, desc: "On kill: you may move 1 square." },
          { name: "I'm Already Ready", max: 3, desc: "+1 Gunzerking use per day. +1/SL on Insight Checks." },
          { name: "Steady As She Goes", max: 3, desc: "+1 ACC. While Gunzerking: +1+MST Mod ACC Mod/SL." },
          { name: "Divergent Likeness", max: 3, desc: "While Gunzerking: both guns same type +1 DMG Mod/SL; different types +1 ACC Mod/SL." }
        ],
        [
          { name: "Double Your Fun", max: 3, desc: "While Gunzerking: Throw 2 grenades but expend only 1. +1+MST Mod Grenade Damage." },
          { name: "Fistful of Hurt", max: 3, desc: "Melee attacks: +1d8 DMG Mod/SL and Knockback 1." },
          { name: "Bus That Can't Slow Down", max: 3, desc: "While Gunzerking: Extra Movement each turn. +1/SL on Traverse Checks." },
          { name: "Just Got Real", max: 3, desc: "+1 DMG Mod/SL; while below half Health, 1+MST Mod DMG Mod/SL instead." }
        ],
        [
          { name: "Keep It Piping Hot", max: 3, desc: "After Gunzerking: +1 DMG Mod and +1 SPD Mod for 1+MST Mod turns. +1 Grenade Damage/SL." },
          { name: "Keep Firing...", max: 3, desc: "While Gunzerking: +1 SPD Mod/SL and Extra Attack." },
          { name: "Sexual Tyrannosaurus", max: 3, desc: "While Shields are depleted: 5 Health Regen/SL for 1+MST Mod turns." },
          { name: "Get Some", max: 3, desc: "First time you take Health Damage each encounter, you may activate Gunzerking for free." }
        ],
        [
          { name: "No Kill Like Overkill", max: 1, desc: "On kill: your next attack gains X+MST Mod Damage, where X is the Damage dealt beyond the enemy's Health." }
        ]
      ]
    }]
  },

  "Hunter": {
    actionSkill: {
      name: "Wings of Blood",
      desc: "Your familiar dive-attacks a chosen enemy for 2d8 Damage and Taunts it and all adjacent enemies into attacking you next. Familiar (Wing): Health 15, ACC +1, 1 attack/turn, DMG 1d4+1; accuracy 2-7: -1 DMG / 8-15: normal / 16+: +1 DMG. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Sharp Shooter",
      tiers: [
        [
          { name: "Caliber", max: 3, desc: "+1 DMG Mod on Favored Guns. +1/SL on Search Checks." },
          { name: "Swipe", max: 3, desc: "Enemies killed by Wings of Blood drop gold equal to their BR. +1/SL on Traverse Checks." },
          { name: "Deadly", max: 3, desc: "1+MST Mod Crit Damage. +1/SL on Sneak Checks." },
          { name: "Gun Crazy", max: 3, desc: "+1/SL DMG Mod on all Pistols." }
        ],
        [
          { name: "Smirk", max: 3, desc: "Once per encounter, after a Crit kill: Extra Movement. +1/SL on Talk Checks." },
          { name: "Fast Hands", max: 3, desc: "First turn of an encounter: Extra Attack. +1/SL on Interact Checks." },
          { name: "Lethal Strike", max: 3, desc: "+1 Melee Damage/SL. First melee each encounter: roll 1d20; on 10+ double the Melee Damage." },
          { name: "Swift Strike", max: 3, desc: "Wings of Blood gains 1d10/SL+MST Mod Damage." },
          { name: "Focus", max: 3, desc: "+1 ACC Mod on all guns. +1 ACC Mod/SL on Favored Guns." }
        ],
        [
          { name: "Carrion Call", max: 3, desc: "First Crit each encounter activates Wings of Blood for free." },
          { name: "Killer", max: 3, desc: "On kill: +1 SPD Mod/SL and +1 DMG Mod/SL for 1+MST Mod turns." },
          { name: "Out For Blood", max: 3, desc: "First Familiar attack each encounter: gain 1d6/SL Health." },
          { name: "Riotous Remedy", max: 3, desc: "On kill: +5 Health Regen/SL for 1+MST Mod turns." }
        ],
        [
          { name: "Flight of the Elements", max: 3, desc: "Roll a random Element; Wings of Blood deals +2d6 Damage of that Element on its attacks." },
          { name: "Ransack", max: 3, desc: "First 1/SL kills each encounter drop gold equal to their BR. +1/SL on Search Checks." },
          { name: "Hair Trigger", max: 3, desc: "+1 ACC, SPD, and DMG. +1/SL Melee Damage. All Pistols gain Extra Attack." },
          { name: "Predator", max: 3, desc: "+1/SL Wings of Blood uses per day. 1+MST Mod on Sneak Checks." }
        ],
        [
          { name: "Relentless", max: 3, desc: "On kill: Extra Attack for 1+MST Mod turns, then roll 1d20; on 15+ gain +1 Crit/SL on the next attack." },
          { name: "Aerial Impact", max: 3, desc: "While Wings of Blood is active: roll 1d20/SL each time your familiar Hits; if any is 15+ the enemy is Slowed." },
          { name: "Bird of Prey", max: 3, desc: "Wings of Blood can Hit an additional target/SL." }
        ],
        [
          { name: "Trespass", max: 1, desc: "Before any attack at Range 4+: roll 1d20+MST Mod; on 10+ the attack ignores Shields and deals +MST Mod Damage." }
        ]
      ]
    }]
  },

  "Mechromancer": {
    actionSkill: {
      name: "Deathtrap",
      desc: "Summon a metal golem for 2 turns that moves and attacks twice each turn. Robot: Armor 30, Movement 5 squares; Melee: Claws 2d8; Ranged: Shock Pulse, 3-square range, 2d6 Shock Damage. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Shock and Claws",
      tiers: [
        [
          { name: "Close Enough", max: 3, desc: "First 1/SL Ranged Attacks each encounter are upgraded to the next highest Accuracy Range." },
          { name: "More Pep", max: 3, desc: "Favored Gun Elemental Damage +1+MST Mod/SL. +2 on Interact Checks." },
          { name: "Myelin", max: 3, desc: "1d4+MST Mod Shock Damage Reduction. +10/SL Shield capacity." },
          { name: "Anarchy", max: 3, desc: "After a kill or Throwing an item: +1 DMG Mod/SL for 1 turn." }
        ],
        [
          { name: "Strength of Five Gorillas", max: 3, desc: "You and Robot each gain +3 Melee Damage." },
          { name: "Buck Up", max: 3, desc: "When activating Deathtrap, an ally adjacent to Robot recharges 10+MST Mod/SL Shields." },
          { name: "Shock Storm", max: 3, desc: "Crit kill creates a Shock rift: 2d6/SL Shock Damage to all adjacent targets. Robot also rifts on its kills." },
          { name: "The Stare", max: 3, desc: "Robot gains Fire Bolt (Ranged): a bolt of Incendiary traveling up to 3+MST Mod squares dealing 2d6/SL Incendiary Damage to everything in the line of fire." }
        ],
        [
          { name: "Upshot Robot", max: 3, desc: "While Deathtrap is active, the first 1+MST Mod Robot kills each extend its duration by 1 turn." },
          { name: "Potent as a Pony", max: 3, desc: "You and Robot each gain MST+10 Shield capacity/SL." },
          { name: "Shock and \"Aaggghhh!\"", max: 3, desc: "Throwing a grenade creates a Shock rift: 2d6/SL Shock Damage to adjacent targets." },
          { name: "Unstoppable Force", max: 3, desc: "On kill: Extra Movement and 1d4/SL Shield Recharge. +2 on Traverse Checks." },
          { name: "Evil Enchanter", max: 3, desc: "All Elemental Damage +2d6. Elemental chance +10%+MST Mod." }
        ],
        [
          { name: "Explosive Clip", max: 3, desc: "When Deathtrap ends, Robot detonates: 3d8+MST Mod Damage to all adjacent targets." },
          { name: "Made of Sterner Stuff", max: 3, desc: "You and Robot each gain 1d4/SL Damage Reduction to all Damage." },
          { name: "One Two Boom", max: 3, desc: "Once per Deathtrap activation, Robot fires an orb up to MST+3 squares; if the orb is shot it explodes for 2d6/SL Corrosive Damage to adjacent targets." },
          { name: "Wires Don't Talk", max: 3, desc: "Enemies entering a square adjacent to you or Robot take 1d6/SL Shock Damage." },
          { name: "Annoyed Android", max: 3, desc: "Robot adds your SPD Mod to its Movement." }
        ],
        [
          { name: "20% Cooler", max: 3, desc: "First successful Badass Move each encounter activates Deathtrap for free. +2 on Talk Checks." },
          { name: "Interspersed Outburst", max: 3, desc: "First turn of an encounter: Extra Movement and +2 DMG Mod/SL." },
          { name: "The Nth Degree", max: 3, desc: "First Hit from an attack each encounter ricochets up to 1+MST Mod times, dealing +1d4/SL Damage to each adjacent enemy." },
          { name: "Sharing is Caring", max: 3, desc: "While Deathtrap is active, Robot gains a copy of your equipped Shield. +1 MST Mod/SL." }
        ],
        [
          { name: "Make It Sparkle", max: 1, desc: "While Deathtrap is active, shooting Robot with an Elemental gun charges it with that Element: its Damage adds 3d6+MST Mod Elemental Damage for the duration." }
        ]
      ]
    }]
  },

  "Psycho": {
    actionSkill: {
      name: "Buzz Axe Rampage",
      desc: "Put away your gun, gain Extra Movement, and take out the Buzz Axe for 2 turns. Each turn: melee an adjacent target and make a Ranged Attack by throwing the axe up to 4 squares. Each attack deals 3d8 Damage; kills restore 2d4 Health. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Fire and Blood",
      tiers: [
        [
          { name: "Burn, Baby, Burn", max: 3, desc: "On melee attack, roll 1d20+MST Mod; on 12+ become inflamed for 2 turns, dealing and taking +1d6/SL Incendiary Damage while attacking." },
          { name: "Empty the Rage", max: 3, desc: "+2 Melee Damage/SL. While Shields are depleted: extra 1+MST Mod Melee Damage." },
          { name: "Pull the Pin", max: 3, desc: "When Shields hit 0, a grenade drops (+1d6/SL Damage). If it kills, gain 10+MST Mod Shields and regain 1 grenade." },
          { name: "Feed the Meat", max: 3, desc: "10+MST Mod Health/SL. +2 on Traverse Checks." }
        ],
        [
          { name: "Bloody Revival", max: 3, desc: "+3 DMG Mod on Favored Guns while under half Health." },
          { name: "Blood Overdrive", max: 3, desc: "On ranged kill: +2 Melee Damage/SL for 1+MST Mod turns." },
          { name: "Taste of Blood", max: 3, desc: "Buzz Axe Rampage lasts +1 turn. During it, kills grant 1d4/SL Damage Reduction for 1 turn." },
          { name: "Pain is Power", max: 3, desc: "+2 DMG Mod/SL on all guns; all non-Favored Gun Crits become Hits." }
        ],
        [
          { name: "Buzz Axe Bombardier", max: 3, desc: "Explosives on the axe: ranged Buzz Axe attacks deal +3d6+MST Mod Explosive Damage." },
          { name: "Thrilll of the Kill", max: 3, desc: "On kill: 1d4+MST Mod/SL of the Damage beyond the enemy's Health is transferred to your Health." },
          { name: "Light the Fuse", max: 3, desc: "When Health reaches 0: detonate Explosives for 3d6/SL Explosive Damage to all adjacent targets. If an enemy dies, gain 15+MST Mod Health; otherwise, die." },
          { name: "Strip the Flesh", max: 3, desc: "+1d6/SL on all Explosive Damage. +2 on Interact Checks." },
          { name: "Fire Fiend", max: 3, desc: "1d4+MST Mod Incendiary Damage Reduction. +2/SL on Burn, Baby, Burn rolls." }
        ],
        [
          { name: "Blood Trance", max: 3, desc: "Buzz Axe Rampage lasts +1 turn. First Health Damage taken each encounter activates it for free." },
          { name: "Redeem the Soul", max: 3, desc: "1+MST Mod times/day: take 2d12 Damage to grant an ally within 3 squares 2d10+DMG Mod Health. +2/SL on Traverse Checks." },
          { name: "Salt the Wound", max: 3, desc: "When taking Health Damage, optionally take +1d8 more to gain that amount +1/SL as bonus Damage on your next attack." },
          { name: "Flame Flare", max: 3, desc: "Deal +1d6/SL Incendiary Damage to enemies while inflamed. Stay inflamed 1+MST Mod extra turns." },
          { name: "Blood Bath", max: 3, desc: "Once per turn, on an Explosive kill: Extra Attack and regain 1+MST Mod grenades." }
        ],
        [
          { name: "Nervous Blood", max: 3, desc: "On ranged kill: Extra Attack for 1 turn. 1+MST Mod/SL on Search Checks." },
          { name: "Silence the Voices", max: 3, desc: "+3/SL Melee Damage. On melee attack roll 1d20; on 15+ you take your own Melee Damage." },
          { name: "Elemental Empathy", max: 3, desc: "When taking Elemental Damage: gain 1d4+MST Mod/SL Health Regen." }
        ],
        [
          { name: "Release the Beast", max: 1, desc: "If Shields are depleted when activating Buzz Axe Rampage: +50 Health, +3 attacks per turn, and 5+MST Mod Damage for its duration." }
        ]
      ]
    }]
  },

  "Siren (Lightwalk)": {
    actionSkill: {
      name: "Phasewalk",
      desc: "Become Cloaked and gain Extra Movement for 2 turns. On activation and deactivation, create a Phase Blast: 3d6 Incendiary Damage to adjacent enemies. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Lightwalk",
      tiers: [
        [
          { name: "Striking", max: 3, desc: "On melee attack, roll 1d20+MST Mod; on 15+ the target is Slowed for 1 turn/SL." },
          { name: "Diva", max: 3, desc: "+5 max Shields/SL. +1/SL on Traverse Checks." },
          { name: "Quicksilver", max: 3, desc: "+1 SPD and +1/SL on Interact Checks." },
          { name: "Slayer", max: 3, desc: "1+MST Mod Crit Damage/SL." }
        ],
        [
          { name: "Spark", max: 3, desc: "All guns with Element effects gain +1d6 Damage." },
          { name: "Inner Glow", max: 3, desc: "While Phasewalk is active: +5/SL Health Regen." },
          { name: "Silent Resolve", max: 3, desc: "When Phasewalk ends: 1d4/SL Damage Reduction for 1+MST Mod turns." },
          { name: "Hit & Run", max: 3, desc: "+1/SL Melee Damage. Phasewalk lasts +1 turn." },
          { name: "Enforcer", max: 3, desc: "On kill: +1 ACC Mod and +1 DMG Mod/SL for 1+MST Mod turns." }
        ],
        [
          { name: "Intuition", max: 3, desc: "On kill: Extra Movement for 1 turn, and all Vault Hunters gain 10 XP per enemy killed next turn." },
          { name: "Dramatic Entrance", max: 3, desc: "When Phasewalk ends, Phase Blast deals +1d6/SL Explosive Damage; roll 1d20+MST Mod, on 15+ all adjacent enemies are Slowed." },
          { name: "Hard to Get", max: 3, desc: "On activating Phasewalk: Extra Movement for 1+MST Mod turns. +1/SL on Sneak Checks." },
          { name: "Radiance", max: 3, desc: "While Phasewalk is active: 1d6+MST Mod Shock Damage to adjacent enemies. +1/SL on Talk Checks." }
        ],
        [
          { name: "High Velocity", max: 3, desc: "+1 DMG Mod and +1 ACC Mod/SL on all gun types." },
          { name: "Venom", max: 3, desc: "On melee attack, roll 1d20+MST Mod; on 15+ add +1d6/SL Corrosive Damage." },
          { name: "Phoenix", max: 3, desc: "On kill: 1d6/SL Incendiary Damage to adjacent enemies and regain 1+MST Mod grenades." },
          { name: "Blackout", max: 3, desc: "First kill each encounter activates Phasewalk for free." }
        ],
        [
          { name: "Girl Power", max: 3, desc: "On kill: double your Shield Recharge rate for 1+MST Mod turns." },
          { name: "Phase Strike", max: 3, desc: "While Phasewalk is active: +1 Melee Die/SL on melee attacks." },
          { name: "Resilience", max: 3, desc: "1d4/SL Elemental Damage resistance. +2/SL on Search Checks." },
          { name: "Handled", max: 3, desc: "On kill with your Favored Gun type: Extra Attack for 1+MST Mod turns." }
        ],
        [
          { name: "Mind Games", max: 1, desc: "+2 ACC. Whenever a Crit lands, roll 1d20+MST Mod; on 12+ the enemy and all adjacent targets are Slowed for 1 turn." }
        ]
      ]
    }]
  },

  "Siren (Phaselock)": {
    actionSkill: {
      name: "Phaselock",
      desc: "Lock an enemy in a sphere of energy, preventing it from taking Actions for 2 turns. Enemies that can't be Phaselocked instead take 3d6 Cryo Damage per turn. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Phaselock",
      tiers: [
        [
          { name: "Ward", max: 3, desc: "+5 max Shields/SL. 10+MST Mod Shield Recharge if SL is at 3." },
          { name: "Accelerate", max: 3, desc: "+1 SPD. +1/SL on Traverse Checks." },
          { name: "Sweet Release", max: 3, desc: "Kill a Phaselocked enemy: gain 1 healing Orb/SL; each Orb moves 3 squares/turn to a chosen ally and grants 1d4/SL Health." },
          { name: "Flicker", max: 3, desc: "10%+MST Mod Element chance on Elemental guns. +1/SL on Sneak Checks." }
        ],
        [
          { name: "Suspension", max: 3, desc: "Phaselock lasts +1 turn. +1d6+MST Mod Elemental Damage to Phaselock-immune enemies." },
          { name: "Restoration", max: 3, desc: "Gain 1d6+MST Mod Health, and target allies with Ranged Attacks to heal 1d4 per Hit. +1/SL on Insight Checks." },
          { name: "Wreck", max: 3, desc: "While an enemy is Phaselocked: Extra Movement and +2 DMG Mod/SL." },
          { name: "Immolate", max: 3, desc: "While at half Health or lower: all attacks gain +2d6/SL Incendiary Damage." }
        ],
        [
          { name: "Fleet", max: 3, desc: "Each turn while Shields are depleted: Extra Movement." },
          { name: "Inertia", max: 3, desc: "On kill: +10 Shield Recharge and Extra Movement for 1 turn/SL." },
          { name: "Elated", max: 3, desc: "While Phaselock is active: all Vault Hunters gain 10+MST Mod/SL Health Regen." },
          { name: "Converge", max: 3, desc: "On activation: 1/SL targets are pulled up to 2+MST Mod squares toward the Phaselocked enemy." }
        ],
        [
          { name: "Quicken", max: 3, desc: "If acting in the Before Enemies phase: activate Phaselock for free on the first turn." },
          { name: "Sustenance", max: 3, desc: "5+MST Mod Health Regen. +1/SL on Search Checks." },
          { name: "Res", max: 3, desc: "Activate Phaselock to instead grant an ally with depleted Shields +15 Health/SL." },
          { name: "Cloud Kill", max: 3, desc: "First time shooting an enemy each encounter: a 3x3 Radiation cloud forms around them, dealing 2d6/SL+MST Mod Radiation Damage to each enemy entering or exiting it." }
        ],
        [
          { name: "Sub-Sequence", max: 3, desc: "When an enemy dies while Phaselocked: roll 1d20+MST Mod/SL; if any is 15+ an adjacent enemy becomes Phaselocked." },
          { name: "Life Tap", max: 3, desc: "On kill: gain 1d6/SL Health." },
          { name: "Scorn", max: 3, desc: "Instead of a regular melee attack, Throw an Orb at an adjacent target: 3d6 Shock Damage to it and all adjacent enemies for 1+MST Mod turns." }
        ],
        [
          { name: "Thoughtlock", max: 1, desc: "Phaselocked enemies attack adjacent enemies for the duration. Phaselock lasts 1+MST Mod extra turns." }
        ]
      ]
    }]
  },

  "Soldier": {
    actionSkill: {
      name: "Scorpio Turret",
      desc: "Deploy a Shielded Turret with aura effects for 2 turns; it blocks Damage from the front, targets the closest enemy, and fires each turn. Turret: Shields 30, Armor 10, DMG 2d4 per Hit, ACC +0, accuracy 2-7: 2 Hits / 8-15: 3 Hits / 16+: 4 Hits. Destroyed if its Armor depletes. Uses: MST Mod per day + 1 per encounter."
    },
    pointsPerTier: 5,
    trees: [{
      name: "Fortune",
      tiers: [
        [
          { name: "Impact", max: 3, desc: "MST Mod+1 Damage on all gun types. +1/SL on Talk Checks." },
          { name: "Sentry", max: 3, desc: "Scorpio Turret gains +1 ACC and +1 DMG Mod/SL." },
          { name: "Stockpile", max: 3, desc: "Scorpio Turret drops 1 Loot Token per adjacent ally each turn; adjacent allies gain +1 ACC Mod/SL." },
          { name: "Aid Station", max: 3, desc: "Allies adjacent to Scorpio Turret gain MST Mod+5 Health/SL each turn." }
        ],
        [
          { name: "Defense", max: 3, desc: "Check for Shield Recharge after Acting instead of at end of turn." },
          { name: "Scattershot", max: 3, desc: "+1 ACC Mod/SL and +1 DMG Mod/SL on all Shotguns." },
          { name: "Cauterize", max: 3, desc: "Target allies with Ranged Attacks to recharge their Shields 1d4/SL per Hit. At SL 3, grenades landing adjacent to allies heal MST+1d8 Damage." },
          { name: "Fitness", max: 3, desc: "MST Mod+10/SL max Health. +1/SL on Traverse Checks." }
        ],
        [
          { name: "Refire", max: 3, desc: "First Crit Damage each encounter activates Scorpio Turret for free." },
          { name: "Metal Storm", max: 3, desc: "On kill: +1 ACC Mod/SL and +1 SPD Mod for 1+MST Mod turns." },
          { name: "Barrage", max: 3, desc: "While Scorpio Turret is active it gets +1 Hit/SL per turn. +1 on Interact Checks." },
          { name: "Quick Charge", max: 3, desc: "On kill: +10/SL Shield Recharge for MST Mod+1 turns." }
        ],
        [
          { name: "Grenadier", max: 3, desc: "On kill: +1 Grenade Damage/SL and gain 1 grenade." },
          { name: "Supply Drop", max: 3, desc: "For each SL, increase the Stockpile or Aid Station skill by 1." },
          { name: "Overload", max: 3, desc: "+1+MST Mod DMG. +1/SL on Insight Checks." },
          { name: "Deploy", max: 3, desc: "First Health Damage taken each encounter activates Scorpio Turret for free; it gains MST Mod+10 Shields/SL." }
        ],
        [
          { name: "Stat", max: 3, desc: "On kill: +5/SL Health Regen for you and an adjacent ally, for 1+MST Mod turns." },
          { name: "Assault", max: 3, desc: "+1 SPD/SL and +1 ACC/SL." },
          { name: "Grit", max: 3, desc: "+1d4/SL Damage resistance to all Ranged Attacks." },
          { name: "Revive", max: 3, desc: "When activating Scorpio Turret adjacent to an ally with depleted Shields: roll 1d20/SL+MST Mod; if any is 15+ the ally gains 2d6 Shield Recharge." }
        ],
        [
          { name: "Guided Missle", max: 1, desc: "Scorpio Turret launches a Guided Missile each turn: 2d10+MST Mod Splash Damage in addition to its normal attack." }
        ]
      ]
    }]
  }
};
