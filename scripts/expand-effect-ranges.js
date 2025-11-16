const fs = require('fs');
const path = require('path');

const effectsPath = path.join(__dirname, '..', 'packages/api/data/effects/effects.json');
const teasDir = path.join(__dirname, '..', 'packages/api/data/teas');

const effects = JSON.parse(fs.readFileSync(effectsPath, 'utf8'));
const stats = {};

for (const effect of effects) {
  stats[effect.name] = {
    minOnset: Infinity,
    maxOnset: -Infinity,
    minDuration: Infinity,
    maxDuration: -Infinity
  };
}

for (const file of fs.readdirSync(teasDir)) {
  if (!file.endsWith('.json')) continue;
  const teas = JSON.parse(fs.readFileSync(path.join(teasDir, file), 'utf8'));
  teas.forEach(tea => {
    tea.effects.forEach(effect => {
      const stat = stats[effect.effect];
      if (!stat) return;
      stat.minOnset = Math.min(stat.minOnset, effect.onset_minutes);
      stat.maxOnset = Math.max(stat.maxOnset, effect.onset_minutes);
      stat.minDuration = Math.min(stat.minDuration, effect.duration_minutes);
      stat.maxDuration = Math.max(stat.maxDuration, effect.duration_minutes);
    });
  });
}

const updated = effects.map(effect => {
  const stat = stats[effect.name];
  if (!stat || !isFinite(stat.minOnset)) return effect;
  const buffer = effect.category === 'physical' ? 5 : 5;
  const durationBuffer = 20;
  const onsetMin = Math.max(5, Math.min(effect.onset_range_min, Math.floor(stat.minOnset - 2)));
  const onsetMax = Math.max(effect.onset_range_max, Math.ceil(stat.maxOnset + buffer));
  const durationMin = Math.max(60, Math.min(effect.duration_range_min, Math.floor(stat.minDuration - 10)));
  const durationMax = Math.max(effect.duration_range_max, Math.ceil(stat.maxDuration + durationBuffer));
  return {
    ...effect,
    onset_range_min: onsetMin,
    onset_range_max: onsetMax,
    duration_range_min: durationMin,
    duration_range_max: durationMax
  };
});

fs.writeFileSync(effectsPath, JSON.stringify(updated, null, 2) + '\n');
console.log('Expanded effect ranges to include observed values.');
