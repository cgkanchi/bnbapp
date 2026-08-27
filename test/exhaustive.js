// Run with: node test/exhaustive.js
// Needs playwright-core (npm i playwright-core) and a Chromium binary —
// set CHROMIUM_PATH if yours isn't at the default location.
const { chromium } = require('playwright-core');
const EXECUTABLE = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium';

const APP = 'file://' + require('path').resolve(__dirname, '..', 'index.html');
let pass = 0;
const failures = [];
function check(name, cond, extra) {
  if (cond) { pass++; console.log('  ok: ' + name); }
  else { failures.push(name + (extra ? ' — ' + extra : '')); console.log('  FAIL: ' + name + (extra ? ' — ' + extra : '')); }
}
function section(name) { console.log('\n== ' + name + ' =='); }

(async () => {
  const browser = await chromium.launch({ executablePath: EXECUTABLE, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  const consoleErrors = [];
  const dialogs = [];
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  page.on('console', m => {
    if (m.type() === 'error' && !m.text().includes('ERR_CONNECTION_RESET') && !m.text().includes('Failed to load resource')) {
      consoleErrors.push('console: ' + m.text());
    }
  });
  page.on('dialog', d => { dialogs.push(d.type()); d.dismiss().catch(() => {}); });

  const forceRandom = v => page.evaluate(v => {
    if (!window.__origRandom) window.__origRandom = Math.random;
    Math.random = () => v;
  }, v);
  const restoreRandom = () => page.evaluate(() => {
    if (window.__origRandom) Math.random = window.__origRandom;
  });
  const getState = () => page.evaluate(() => JSON.parse(localStorage.getItem('bnb-echo-deck-v1')));
  const tab = name => page.click('button[data-pane="' + name + '"]');
  const tokens = async () => parseInt(await page.textContent('#token-count'), 10);
  const logCount = () => page.locator('#log li').count();
  const topTotal = async () => parseInt(await page.locator('#log li .total').first().textContent(), 10);
  const topWhat = () => page.locator('#log li .what').first().textContent();

  await page.goto(APP);
  await page.waitForTimeout(200);

  /* ================= A. dice roller ================= */
  section('A. Dice roller');
  for (const d of [4, 6, 8, 10, 12, 20, 100]) {
    const before = await logCount();
    await page.click('button[data-die="' + d + '"]');
    check('d' + d + ' logs an entry', await logCount() === before + 1);
    const t = await topTotal();
    check('d' + d + ' total in range', t >= 1 && t <= d, 'got ' + t);
  }
  // qty/mod affect totals: 3d6+2 forced max = 20
  await page.evaluate(() => { for (let i = 0; i < 2; i++) document.querySelector('button[data-step="qty"][data-dir="1"]').click(); });
  await page.evaluate(() => { for (let i = 0; i < 2; i++) document.querySelector('button[data-step="mod"][data-dir="1"]').click(); });
  await forceRandom(0.9999);
  await page.click('button[data-die="6"]');
  check('3d6+2 forced max = 20', await topTotal() === 20, 'got ' + await topTotal());
  check('entry label shows 3d6 +2', (await topWhat()).includes('3d6 +2'));
  await restoreRandom();
  // nat 20 / nat 1 flags need qty 1, mod irrelevant
  await page.evaluate(() => { for (let i = 0; i < 5; i++) document.querySelector('button[data-step="qty"][data-dir="-1"]').click(); });
  await page.evaluate(() => { for (let i = 0; i < 5; i++) document.querySelector('button[data-step="mod"][data-dir="-1"]').click(); });
  await forceRandom(0.9999);
  await page.click('button[data-die="20"]');
  check('nat 20 flagged Badass', await page.locator('#log li').first().locator('.flag').textContent() === 'Badass');
  await forceRandom(0);
  await page.click('button[data-die="20"]');
  check('nat 1 flagged', await page.locator('#log li').first().locator('.flag').textContent() === 'Nat 1');
  await restoreRandom();

  /* ================= B. stepper clamps ================= */
  section('B. Stepper clamps');
  await page.evaluate(() => { for (let i = 0; i < 30; i++) document.querySelector('button[data-step="qty"][data-dir="-1"]').click(); });
  check('qty clamps at 1', await page.textContent('#qty-val') === '1');
  await page.evaluate(() => { for (let i = 0; i < 30; i++) document.querySelector('button[data-step="qty"][data-dir="1"]').click(); });
  check('qty clamps at 20', await page.textContent('#qty-val') === '20');
  await page.evaluate(() => { for (let i = 0; i < 30; i++) document.querySelector('button[data-step="qty"][data-dir="-1"]').click(); });
  await page.evaluate(() => { for (let i = 0; i < 60; i++) document.querySelector('button[data-step="mod"][data-dir="-1"]').click(); });
  check('mod clamps at -20', await page.textContent('#mod-val') === '-20');
  await page.evaluate(() => { for (let i = 0; i < 80; i++) document.querySelector('button[data-step="mod"][data-dir="1"]').click(); });
  check('mod clamps at +30', await page.textContent('#mod-val') === '+30');
  await page.evaluate(() => { for (let i = 0; i < 30; i++) document.querySelector('button[data-step="mod"][data-dir="-1"]').click(); });
  check('mod back to +0', await page.textContent('#mod-val') === '+0');

  /* ================= C. checks & stat mods ================= */
  section('C. Skill checks and stat mods');
  await tab('character');
  await page.evaluate(() => { for (let i = 0; i < 3; i++) document.querySelector('button[data-statmod="acc"][data-dir="1"]').click(); });
  check('ACC mod +3', await page.textContent('#statval-acc') === '+3');
  await page.evaluate(() => { for (let i = 0; i < 20; i++) document.querySelector('button[data-statmod="dmg"][data-dir="-1"]').click(); });
  check('stat mod clamps at -5', await page.textContent('#statval-dmg') === '-5');
  await page.evaluate(() => { for (let i = 0; i < 30; i++) document.querySelector('button[data-statmod="dmg"][data-dir="1"]').click(); });
  check('stat mod clamps at +15', await page.textContent('#statval-dmg') === '+15');
  await page.evaluate(() => { for (let i = 0; i < 10; i++) document.querySelector('button[data-statmod="dmg"][data-dir="-1"]').click(); });
  await tab('dice');
  check('Interact button shows ACC-based +3', (await page.textContent('button[data-check="interact"]')).includes('+3'));
  check('melee button shows die + DMG mod', (await page.textContent('button[data-check="melee"]')).includes('1d6 +5'));
  await forceRandom(0.5);
  await page.click('button[data-check="interact"]');
  check('Interact check = 11+3', await topTotal() === 14, 'got ' + await topTotal());
  check('check label names Interact', (await topWhat()).includes('Interact'));
  await page.click('button[data-check="melee"]');
  check('melee damage = 4 (1d6@0.5) + 5', await topTotal() === 9, 'got ' + await topTotal());
  await page.click('button[data-check="initiative"]');
  check('initiative check = 11 + BR 1 + SPD 0', await topTotal() === 12, 'got ' + await topTotal());
  for (const s of ['talk', 'insight', 'sneak', 'search', 'traverse']) {
    const before = await logCount();
    await page.click('button[data-check="' + s + '"]');
    check(s + ' check logs', await logCount() === before + 1);
  }
  await restoreRandom();

  /* ================= D. guns ================= */
  section('D. Guns');
  await tab('guns');
  // form validation: bad dice string blocks submit
  await page.click('#add-gun');
  await page.fill('#g-name', 'Bad Dice Gun');
  await page.fill('#g-dmg', 'banana');
  await page.click('#gunform-save');
  check('invalid dice string blocks submit', await page.locator('#gunform-panel').isVisible());
  check('no browser validation dialog needed', await page.locator('.gun').count() === 1);
  await page.fill('#g-dmg', '2d6+1');
  await page.fill('#g-crit', '1d10');
  await page.selectOption('#g-element', 'Corrosive');
  await page.selectOption('#g-rarity', 'Legendary');
  await page.click('#gunform-save');
  check('valid gun saves', await page.locator('.gun').count() === 2);
  check('form closes on save', await page.locator('#gunform-panel').isHidden());
  const newCard = page.locator('.gun', { hasText: 'Bad Dice Gun' });
  check('element chip rendered', await newCard.locator('.chip.element').textContent() === 'Corrosive');
  check('damage chip shows 2d6+1', (await newCard.textContent()).includes('2d6+1'));

  // edit
  await newCard.locator('button[data-edit]').click();
  check('edit prefills name', await page.inputValue('#g-name') === 'Bad Dice Gun');
  check('edit prefills dmg', await page.inputValue('#g-dmg') === '2d6+1');
  await page.fill('#g-name', 'Renamed Gun');
  await page.click('#gunform-save');
  check('edit renames in place, no dupe', await page.locator('.gun').count() === 2 &&
    await page.locator('.gun', { hasText: 'Renamed Gun' }).count() === 1);

  // attack: forced nat 20 on starter Rustknuckle (ACC +3): 2 hits ×1d6 max + (1+1) crits ×1d8 max = 12+16=28
  await forceRandom(0.9999);
  await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.attackbtn').click();
  let res = await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.gun-result').textContent();
  check('nat 20 attack is BADASS', res.includes('BADASS'));
  check('nat 20 damage = 28', res.includes('28 damage'), res.slice(0, 80));
  check('nat 20 counts 2 hits 2 crits', res.includes('2 hits, 2 crits'));
  // forced nat 1 jam
  await forceRandom(0);
  await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.attackbtn').click();
  res = await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.gun-result').textContent();
  check('nat 1 jams', res.includes('JAM'));
  check('jam logged with Nat 1 flag', await page.locator('#log li').first().locator('.flag').textContent() === 'Nat 1');
  // normal mid-band attack: die 11 +3 = 14 → mid band 2 hits ×(1d6→4) = 8
  await forceRandom(0.5);
  await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.attackbtn').click();
  res = await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.gun-result').textContent();
  check('mid band attack = 8 dmg, 2 hits', res.includes('8 damage') && res.includes('2 hits'), res.slice(0, 80));
  await restoreRandom();

  // loot: 10 guns, all structurally valid
  const gunsBefore = await page.locator('.gun').count();
  await page.evaluate(() => { for (let i = 0; i < 10; i++) document.getElementById('loot-gun').click(); });
  check('loot ×10 adds 10 guns', await page.locator('.gun').count() === gunsBefore + 10);
  const st = await getState();
  const looted = st.guns.slice(0, 10);
  check('looted guns have valid dice specs', looted.every(g => /^\d+d\d+(\+\d+)?$/.test(g.dmg) && /^\d+d\d+(\+\d+)?$/.test(g.crit)),
    JSON.stringify(looted.map(g => g.dmg)));
  check('looted guns have names/types/mfrs', looted.every(g => g.name && g.type && g.mfr && g.rarity));
  check('looted tiers complete', looted.every(g => ['low', 'mid', 'high'].every(t => Number.isFinite(g.tiers[t].hits) && Number.isFinite(g.tiers[t].crits))));

  // scrap: two-step confirm, no native dialog
  const scrapTarget = page.locator('.gun', { hasText: 'Renamed Gun' });
  await scrapTarget.locator('button[data-del]').click();
  check('first scrap click arms (Sure?)', await scrapTarget.locator('button[data-del]').textContent() === 'Sure?');
  check('armed click does not delete yet', await page.locator('.gun', { hasText: 'Renamed Gun' }).count() === 1);
  await scrapTarget.locator('button[data-del]').click();
  check('second scrap click deletes', await page.locator('.gun', { hasText: 'Renamed Gun' }).count() === 0);
  // arm timeout resets
  const t2 = page.locator('.gun', { hasText: 'Rustknuckle' });
  await t2.locator('button[data-del]').click();
  await page.waitForTimeout(2700);
  check('arm times out back to Scrap', await t2.locator('button[data-del]').textContent() === 'Scrap');
  check('timed-out arm did not delete', await page.locator('.gun', { hasText: 'Rustknuckle' }).count() === 1);

  /* ================= E. gear ================= */
  section('E. Gear');
  await tab('gear');
  await page.click('#add-gear');
  check('shield kind hides grenade fields', await page.locator('#ge-dmg:visible').count() === 0);
  check('shield kind shows capacity', await page.locator('#ge-capacity:visible').count() === 1);
  await page.selectOption('#ge-kind', 'Grenade Mod');
  check('grenade kind shows dmg+element', await page.locator('#ge-dmg:visible').count() === 1 && await page.locator('#ge-element:visible').count() === 1);
  check('grenade kind hides capacity', await page.locator('#ge-capacity:visible').count() === 0);
  await page.selectOption('#ge-kind', 'Relic / Other');
  check('relic kind hides all typed fields', await page.locator('#ge-dmg:visible').count() === 0 && await page.locator('#ge-capacity:visible').count() === 0);
  await page.fill('#ge-name', 'Skag Tooth Charm');
  await page.fill('#ge-effect', '+1 to intimidation checks');
  await page.click('#gearform button[type="submit"]');
  check('relic saves with effect text', (await page.locator('#gear-grid .gun', { hasText: 'Skag Tooth Charm' }).textContent()).includes('+1 to intimidation'));

  // shield equip + edit sync
  await page.click('#add-gear');
  await page.fill('#ge-name', 'Turtle Skin');
  await page.fill('#ge-capacity', '15');
  await page.click('#gearform button[type="submit"]');
  await page.locator('#gear-grid .gun', { hasText: 'Turtle Skin' }).locator('button[data-equip]').click();
  check('equip sets shield pool 15/15', await page.textContent('#num-shield') === '15 / 15');
  check('equipped chip shown', await page.locator('#gear-grid .gun', { hasText: 'Turtle Skin' }).locator('.chip.equipped').count() === 1);
  await page.locator('#gear-grid .gun', { hasText: 'Turtle Skin' }).locator('button[data-gearedit]').click();
  await page.fill('#ge-capacity', '30');
  await page.click('#gearform button[type="submit"]');
  check('editing equipped shield syncs max', await page.textContent('#num-shield') === '15 / 30');

  // grenade throw (forced): 3d6 max = 18
  await page.click('#add-gear');
  await page.selectOption('#ge-kind', 'Grenade Mod');
  await page.fill('#ge-name', 'Sticky Bomb');
  await page.fill('#ge-dmg', '3d6');
  await page.selectOption('#ge-element', 'Incendiary');
  await page.click('#gearform button[type="submit"]');
  await forceRandom(0.9999);
  await page.locator('#gear-grid .gun', { hasText: 'Sticky Bomb' }).locator('button[data-throw]').click();
  await restoreRandom();
  await tab('dice');
  check('grenade throw forced max = 18', await topTotal() === 18, 'got ' + await topTotal());
  check('grenade log names element', (await page.locator('#log li .detail').first().textContent()).includes('incendiary'));

  // scrap equipped shield clears equip state
  await tab('gear');
  const shieldCard = page.locator('#gear-grid .gun', { hasText: 'Turtle Skin' });
  await shieldCard.locator('button[data-geardel]').click();
  await shieldCard.locator('button[data-geardel]').click();
  check('equipped shield scrapped', await page.locator('#gear-grid .gun', { hasText: 'Turtle Skin' }).count() === 0);
  check('equippedShield cleared in state', (await getState()).character.equippedShield === undefined);

  /* ================= F. badass tokens ================= */
  section('F. Badass tokens');
  await tab('dice');
  // ensure a known token count
  await page.evaluate(() => { for (let i = 0; i < 20; i++) document.getElementById('token-minus').click(); });
  check('tokens clamp at 0', await tokens() === 0);
  check('no token actions at 0 tokens', await page.locator('[data-logact]').count() === 0);
  await page.evaluate(() => { for (let i = 0; i < 5; i++) document.getElementById('token-plus').click(); });
  check('tokens back to 5', await tokens() === 5);
  check('token actions appear when tokens gained', await page.locator('[data-logact]').count() > 0);

  // boost a plain check
  await forceRandom(0.5);
  await page.click('button[data-check="talk"]');
  const base = await topTotal();
  await forceRandom(0.9999); // boost d6 = 6
  await page.click('button[data-logact="boost"]');
  check('boost adds exactly the d6 (6)', await topTotal() === base + 6, 'got ' + await topTotal());
  check('boost noted in detail', (await page.locator('#log li .detail').first().textContent()).includes('badass +1d6: 6'));
  check('boost spent a token', await tokens() === 4);
  // reroll the check
  const n = await logCount();
  await forceRandom(0.5);
  await page.click('button[data-logact="reroll"]');
  check('reroll keeps log length', await logCount() === n);
  check('reroll notes the token', (await topWhat()).includes('reroll · 1 token'));
  check('reroll spent a token', await tokens() === 3);
  await restoreRandom();

  // attack boost: only on entries with damage
  await tab('guns');
  await forceRandom(0.5); // mid band, 2 hits, dmg 2×4=8
  await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.attackbtn').click();
  await restoreRandom();
  await tab('dice');
  check('attack entry offers +1d6 dmg', await page.locator('button[data-logact="boostdmg"]').count() === 1);
  await forceRandom(0.9999);
  await page.click('button[data-logact="boostdmg"]');
  await restoreRandom();
  check('dmg boost recorded (8+6=14 total)', (await page.locator('#log li .detail').first().textContent()).includes('→ 14 total damage'));
  check('dmg boost spent a token', await tokens() === 2);
  // jam entry: no dmg boost, reroll only
  await tab('guns');
  await forceRandom(0);
  await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.attackbtn').click();
  await restoreRandom();
  await tab('dice');
  check('jam entry has no dmg boost', await page.locator('button[data-logact="boostdmg"]').count() === 0);
  check('jam entry still offers reroll', await page.locator('button[data-logact="reroll"]').count() === 1);
  // reroll attack goes through the gun again
  await forceRandom(0.9999);
  await page.click('button[data-logact="reroll"]');
  await restoreRandom();
  check('attack reroll spent a token', await tokens() === 1);
  check('attack reroll is a fresh attack', (await topWhat()).includes('Rustknuckle — attack · reroll'));
  // reroll for a scrapped gun: no-op, no token spent
  await tab('guns');
  await page.locator('.gun', { hasText: 'Rustknuckle' }).locator('.attackbtn').click();
  const rust = page.locator('.gun', { hasText: 'Rustknuckle' });
  await rust.locator('button[data-del]').click();
  await rust.locator('button[data-del]').click();
  await tab('dice');
  await page.click('button[data-logact="reroll"]');
  check('reroll of scrapped gun is a safe no-op', await tokens() === 1);

  // grenade boost path (top up tokens so actions stay visible after spending)
  await page.evaluate(() => { for (let i = 0; i < 2; i++) document.getElementById('token-plus').click(); });
  await tab('gear');
  await forceRandom(0.5);
  await page.locator('#gear-grid .gun', { hasText: 'Sticky Bomb' }).locator('button[data-throw]').click();
  await restoreRandom();
  await tab('dice');
  const gBase = await topTotal();
  await forceRandom(0.9999);
  await page.click('button[data-logact="boost"]');
  await restoreRandom();
  check('grenade boost adds d6', await topTotal() === gBase + 6);
  check('grenade reroll available', await page.locator('button[data-logact="reroll"]').count() === 1);

  /* ================= F2. skill trees ================= */
  section('F2. Skill trees');
  await tab('skills');
  check('class picker lists all 10 classes', await page.locator('#class-select option').count() === 11);
  check('empty state before class picked', await page.locator('#skills-body .gun-empty').count() === 1);
  await page.selectOption('#class-select', 'Assassin');
  check('action skill panel renders', (await page.textContent('#skills-body')).includes('Decepti0n'));
  check('one tree renders for Assassin', await page.locator('.tree').count() === 1);
  check('six tiers render', await page.locator('.tier-row').count() === 6);
  check('tier 2 locked at 0 pts', await page.locator('[data-skpt="0|1|0"][data-dir="1"]').isDisabled());
  const headshot = page.locator('.skill', { hasText: 'Headshot' });
  const fastHands = page.locator('.skill', { hasText: 'Fast Hands' });
  for (let i = 0; i < 3; i++) await headshot.locator('[data-dir="1"]').click();
  check('Headshot maxed at 3/3', await headshot.locator('.pval').textContent() === '3/3');
  check('maxed skill + disabled', await headshot.locator('[data-dir="1"]').isDisabled());
  check('tier 2 still locked at 3 pts', await page.locator('[data-skpt="0|1|0"][data-dir="1"]').isDisabled());
  for (let i = 0; i < 2; i++) await fastHands.locator('[data-dir="1"]').click();
  check('tier 2 unlocks at 5 pts', !(await page.locator('[data-skpt="0|1|0"][data-dir="1"]').isDisabled()));
  check('tree total shows 5 pts', await page.locator('.tree').first().locator('.tree-pts').textContent() === '5 pts');
  const capstone = page.locator('.skill', { hasText: 'Death Blossom' });
  check('capstone renders with max 1', await capstone.locator('.pval').textContent() === '0/1');
  check('capstone locked (needs 25 pts)', await capstone.locator('[data-dir="1"]').isDisabled());
  await headshot.locator('[data-dir="-1"]').click();
  check('minus decrements to 2/3', await headshot.locator('.pval').textContent() === '2/3');
  check('tier 2 relocks below threshold', await page.locator('[data-skpt="0|1|0"][data-dir="1"]').isDisabled());
  await headshot.locator('[data-dir="1"]').click();
  await headshot.locator('.skill-name').click();
  check('skill description expands on tap', await page.locator('.skill-desc').count() === 1);
  check('description keeps mechanics', (await page.locator('.skill-desc').textContent()).includes('+2 Crit Damage/SL'));
  await headshot.locator('.skill-name').click();
  check('skill description collapses', await page.locator('.skill-desc').count() === 0);
  // JSON import path
  await page.click('details summary');
  await page.fill('#class-json', JSON.stringify({ 'Test Class': { trees: [{ name: 'T', tiers: [[{ name: 'Solo Skill', max: 2, desc: 'x' }]] }] } }));
  await page.click('#class-json-load');
  check('import reports success', (await page.textContent('#class-json-msg')).includes('Loaded 1'));
  await page.selectOption('#class-select', 'Test Class');
  check('imported class renders', await page.locator('.skill', { hasText: 'Solo Skill' }).count() === 1);
  await page.click('[data-skpt="0|0|0"][data-dir="1"]');
  await page.click('[data-skpt="0|0|0"][data-dir="1"]');
  check('imported skill caps at its max (2/2)', await page.locator('.skill .pval').first().textContent() === '2/2');
  await page.fill('#class-json', '{oops');
  await page.click('#class-json-load');
  check('bad JSON reports a readable error', (await page.textContent('#class-json-msg')).includes("Couldn't load"));

  /* ================= G. log behavior ================= */
  section('G. Log behavior');
  await tab('dice');
  await page.evaluate(() => { for (let i = 0; i < 70; i++) document.querySelector('button[data-die="4"]').click(); });
  check('log caps at 60 entries', (await getState()).log.length === 60);
  check('log DOM matches cap', await logCount() === 60);
  await page.click('#clear-log');
  check('clear log empties', await logCount() === 0);
  check('empty-state message returns', await page.locator('#log-empty').isVisible());

  /* ================= H. identity & vitals ================= */
  section('H. Identity and vitals');
  await tab('character');
  await page.fill('#c-name', 'Tiny Tina');
  await page.fill('#c-archetype', 'Deadeye');
  await page.fill('#c-class', 'Demolitionist');
  await page.fill('#c-background', 'The Blade');
  await page.fill('#c-level', '99');
  check('level clamps to 30', (await getState()).character.level === 30);
  check('header shows name', await page.textContent('#hud-name') === 'Tiny Tina');
  check('header shows archetype + class + level', (await page.textContent('#hud-class')).includes('Deadeye · Demolitionist'));
  await page.fill('#c-gold', '250');
  check('gold saves', (await getState()).character.gold === 250);
  // sheet fields
  await page.fill('input[data-statval="mst"]', '4');
  check('stat value saves', (await getState()).character.stats.mst.val === 4);
  await page.click('button[data-brank][data-dir="1"]');
  check('badass rank steps to 2', await page.textContent('#brank-val') === '2');
  check('initiative total = BR 2 + SPD 0', await page.textContent('#total-initiative') === '+2');
  await page.fill('input[data-checkmisc="initiative"]', '2');
  check('initiative misc feeds total', await page.textContent('#total-initiative') === '+4');
  check('movement total shown', await page.textContent('#total-movement') === '3 sq');
  await page.fill('input[data-checkmisc="traverse"]', '-2');
  check('check misc feeds check total', await page.textContent('#chk-total-traverse') === '-2');
  check('dice tab button reflects misc', (await page.textContent('button[data-check="traverse"]')).includes('-2'));
  await page.fill('#c-meleedie', '1d8');
  check('melee die updates total', (await page.textContent('#total-melee')).includes('1d8'));
  await page.fill('#c-meleedie', '1d6');
  await page.fill('input[data-poolfield="shield:recharge"]', '5');
  check('shield recharge saves', (await getState()).character.pools.shield.recharge === 5);
  await page.evaluate(() => { for (let i = 0; i < 3; i++) document.querySelector('button[data-pool="grenades"][data-part="max"][data-dir="1"]').click(); });
  await page.evaluate(() => { for (let i = 0; i < 2; i++) document.querySelector('button[data-pool="grenades"][data-part="cur"][data-dir="1"]').click(); });
  check('grenade pool tracks 2/3', (await getState()).character.pools.grenades.cur === 2 && (await getState()).character.pools.grenades.max === 3);
  await page.selectOption('#c-favored', 'Sniper Rifle');
  check('favored gun saves', (await getState()).character.favoredGun === 'Sniper Rifle');
  await page.fill('#c-feat', 'Line of Sight: +1 Search with Sniper equipped');
  check('feat text saves', (await getState()).character.feat.includes('Line of Sight'));
  // pool: cur can't exceed max; lowering max drags cur down
  await page.evaluate(() => { for (let i = 0; i < 50; i++) document.querySelector('button[data-pool="hp"][data-part="cur"][data-dir="1"]').click(); });
  const hp1 = (await getState()).character.pools.hp;
  check('pool cur capped at max', hp1.cur === hp1.max);
  await page.evaluate(() => { for (let i = 0; i < 5; i++) document.querySelector('button[data-pool="hp"][data-part="max"][data-dir="-1"]').click(); });
  const hp2 = (await getState()).character.pools.hp;
  check('lowering max drags cur down', hp2.cur === hp2.max);
  await page.evaluate(() => { for (let i = 0; i < 500; i++) document.querySelector('button[data-pool="armor"][data-part="cur"][data-dir="-1"]').click(); });
  check('pool cur floors at 0', (await getState()).character.pools.armor.cur === 0);

  /* ================= I. persistence ================= */
  section('I. Persistence');
  await page.reload();
  await page.waitForTimeout(200);
  check('name persists', await page.textContent('#hud-name') === 'Tiny Tina');
  const persisted = await getState();
  check('guns persist', persisted.guns.length > 0);
  check('gear persists', persisted.gear.length === 2, 'got ' + persisted.gear.length);
  check('tokens persist', await tokens() === 2);
  await tab('skills');
  check('selected class persists', await page.evaluate(() => document.getElementById('class-select').value) === 'Test Class');
  check('imported class survives reload', await page.locator('.skill', { hasText: 'Solo Skill' }).count() === 1);
  check('imported class points persist', await page.locator('.skill .pval').first().textContent() === '2/2');
  await page.selectOption('#class-select', 'Assassin');
  check('per-class allocations kept when switching back',
    await page.locator('.skill', { hasText: 'Headshot' }).locator('.pval').textContent() === '3/3');

  /* ================= J. responsive: no horizontal overflow ================= */
  section('J. Responsive layout');
  // long unbroken name stress
  await tab('guns');
  await page.click('#add-gun');
  await page.fill('#g-name', 'Superrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrgun');
  await page.click('#gunform-save');
  for (const width of [320, 360, 375, 414, 768, 1200]) {
    await page.setViewportSize({ width, height: 800 });
    for (const t of ['dice', 'guns', 'gear', 'skills', 'character']) {
      await tab(t);
      await page.waitForTimeout(50);
      const overflow = await page.evaluate(() => {
        const d = document.documentElement;
        let worst = d.scrollWidth - d.clientWidth;
        let culprit = worst > 1 ? 'document' : '';
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right - d.clientWidth > Math.max(worst, 1)) { worst = r.right - d.clientWidth; culprit = el.tagName + '.' + el.className; }
        });
        return { worst: Math.round(worst), culprit };
      });
      check(width + 'px ' + t + ' no overflow', overflow.worst <= 1, overflow.worst + 'px from ' + overflow.culprit);
    }
    // gun form open at this width
    if (width <= 414) {
      await tab('guns');
      await page.click('#add-gun');
      await page.waitForTimeout(50);
      const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      check(width + 'px gun form no overflow', o <= 1, o + 'px');
      await page.click('#gunform-cancel');
    }
  }

  // mobile screenshots
  await page.setViewportSize({ width: 375, height: 750 });
  await tab('dice');
  await page.screenshot({ path: 'mobile-dice.png' });
  await tab('guns');
  await page.screenshot({ path: 'mobile-guns.png' });

  /* ================= K. environment sanity ================= */
  section('K. Sanity');
  check('no native dialogs used anywhere', dialogs.length === 0, dialogs.join(','));
  check('no console/page errors', consoleErrors.length === 0, consoleErrors.join(' | '));

  await browser.close();
  console.log('\n==============================');
  console.log(pass + ' passed, ' + failures.length + ' failed');
  if (failures.length) { console.log(failures.map(f => ' - ' + f).join('\n')); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
