const fs = require('fs');
const path = require('path');

const effectsPath = path.join(__dirname, '..', 'packages/api/data/effects/effects.json');
const teasDir = path.join(__dirname, '..', 'packages/api/data/teas');

const effects = Object.fromEntries(JSON.parse(fs.readFileSync(effectsPath, 'utf8')).map(e => [e.name, e]));
const stats = {};

for (const name of Object.keys(effects)) {
  stats[name] = {
    onsetMin: Infinity,
    onsetMax: -Infinity,
    durationMin: Infinity,
    durationMax: -Infinity
  };
}

for (const file of fs.readdirSync(teasDir)) {
  if (!file.endsWith('.json')) continue;
  const teas = JSON.parse(fs.readFileSync(path.join(teasDir, file), 'utf8'));
  teas.forEach(tea => {
    tea.effects.forEach(effect => {
      if (!stats[effect.effect]) return;
      stats[effect.effect].onsetMin = Math.min(stats[effect.effect].onsetMin, effect.onset_minutes);
      stats[effect.effect].onsetMax = Math.max(stats[effect.effect].onsetMax, effect.onset_minutes);
      stats[effect.effect].durationMin = Math.min(stats[effect.effect].durationMin, effect.duration_minutes);
      stats[effect.effect].durationMax = Math.max(stats[effect.effect].durationMax, effect.duration_minutes);
    });
  });
}

Object.entries(stats).forEach(([name, stat]) => {
  if (!isFinite(stat.onsetMin)) return;
  const meta = effects[name];
  const issues = [];
  if (stat.onsetMin < meta.onset_range_min || stat.onsetMax > meta.onset_range_max) {
    issues.push(`onset actual [${stat.onsetMin}, ${stat.onsetMax}] vs range [${meta.onset_range_min}, ${meta.onset_range_max}]`);
  }
  if (stat.durationMin < meta.duration_range_min || stat.durationMax > meta.duration_range_max) {
    issues.push(`duration actual [${stat.durationMin}, ${stat.durationMax}] vs range [${meta.duration_range_min}, ${meta.duration_range_max}]`);
  }
  if (issues.length) {
    console.log(`${name}: ${issues.join('; ')}`);
  }
});
