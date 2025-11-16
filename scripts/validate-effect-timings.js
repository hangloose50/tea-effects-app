const fs = require('fs');
const path = require('path');

const effectsPath = path.join(__dirname, '..', 'packages/api/data/effects/effects.json');
const teasDir = path.join(__dirname, '..', 'packages/api/data/teas');

const effects = Object.fromEntries(
  JSON.parse(fs.readFileSync(effectsPath, 'utf8')).map(effect => [effect.name, effect])
);

const violations = [];

for (const file of fs.readdirSync(teasDir)) {
  if (!file.endsWith('.json')) continue;
  const teas = JSON.parse(fs.readFileSync(path.join(teasDir, file), 'utf8'));
  teas.forEach(tea => {
    tea.effects.forEach(effect => {
      const meta = effects[effect.effect];
      if (!meta) {
        violations.push({ tea: tea.name, effect: effect.effect, issue: 'missing effect metadata' });
        return;
      }
      if (effect.onset_minutes < meta.onset_range_min) {
        violations.push({ tea: tea.name, effect: effect.effect, issue: `onset ${effect.onset_minutes} < min ${meta.onset_range_min}` });
      }
      if (effect.onset_minutes > meta.onset_range_max) {
        violations.push({ tea: tea.name, effect: effect.effect, issue: `onset ${effect.onset_minutes} > max ${meta.onset_range_max}` });
      }
      if (effect.duration_minutes < meta.duration_range_min) {
        violations.push({ tea: tea.name, effect: effect.effect, issue: `duration ${effect.duration_minutes} < min ${meta.duration_range_min}` });
      }
      if (effect.duration_minutes > meta.duration_range_max) {
        violations.push({ tea: tea.name, effect: effect.effect, issue: `duration ${effect.duration_minutes} > max ${meta.duration_range_max}` });
      }
    });
  });
}

if (!violations.length) {
  console.log('✅ No effect timing violations.');
} else {
  console.log(`❌ ${violations.length} violations found:`);
  violations.slice(0, 50).forEach(v => console.log(`${v.tea} – ${v.effect}: ${v.issue}`));
  if (violations.length > 50) console.log('...');
}
