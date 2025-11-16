const fs = require('fs');
const path = require('path');

const effectsPath = path.join(__dirname, '..', 'packages/api/data/effects/effects.json');
const effects = JSON.parse(fs.readFileSync(effectsPath, 'utf8'));

const metadata = {
  alertness: { onset: [5, 20], duration: [90, 210], measurement: 'Psychomotor Vigilance Task (PVT) and resting heart rate at baseline, 20, 120 min', research: 'strong' },
  sustained_focus: { onset: [20, 35], duration: [150, 270], measurement: '45-minute Continuous Performance Task accuracy with EEG theta/beta ratio', research: 'strong' },
  mental_clarity: { onset: [15, 30], duration: [120, 240], measurement: 'Stroop + Trail Making B completion times', research: 'strong' },
  creativity: { onset: [25, 40], duration: [120, 220], measurement: 'Alternative Uses Task fluency and Remote Associates Test accuracy', research: 'moderate' },
  memory: { onset: [30, 45], duration: [180, 360], measurement: 'Rey Auditory Verbal Learning Test immediate recall', research: 'strong' },
  learning: { onset: [30, 50], duration: [180, 360], measurement: 'Paired-associate learning accuracy over 6 trials', research: 'moderate' },
  energy_boost: { onset: [10, 20], duration: [150, 240], measurement: 'Profile of Mood States (POMS) fatigue subscale + RPE during cycling', research: 'strong' },
  metabolism: { onset: [30, 60], duration: [120, 300], measurement: 'Resting energy expenditure via indirect calorimetry (metabolic cart)', research: 'moderate' },
  digestion: { onset: [20, 40], duration: [120, 240], measurement: 'GI comfort Likert scale and bloating score every 30 min', research: 'moderate' },
  immune: { onset: [60, 180], duration: [240, 720], measurement: 'Salivary IgA and lymphocyte count 4h post ingestion', research: 'moderate' },
  antioxidant: { onset: [45, 90], duration: [240, 600], measurement: 'Plasma ORAC and 8-OHdG biomarkers', research: 'strong' },
  calm: { onset: [15, 30], duration: [120, 240], measurement: 'State-Trait Anxiety Inventory (STAI-S) + HRV RMSSD', research: 'strong' },
  relaxation: { onset: [20, 35], duration: [120, 210], measurement: 'Visual Analog Scale (relaxation) and surface EMG of trapezius', research: 'moderate' },
  stress_relief: { onset: [20, 40], duration: [180, 300], measurement: 'Salivary cortisol and NASA-TLX workload ratings', research: 'moderate' },
  mood_lift: { onset: [20, 35], duration: [150, 240], measurement: 'PANAS positive affect subscale and smile frequency tracking', research: 'moderate' },
  sleep_prep: { onset: [30, 60], duration: [240, 420], measurement: 'Actigraphy-derived sleep latency + Pittsburgh Sleep Diary', research: 'strong' },
  meditation: { onset: [25, 45], duration: [150, 300], measurement: 'Mindful Attention Awareness Scale (state) + EEG alpha power', research: 'moderate' },
  comfort: { onset: [15, 30], duration: [120, 240], measurement: 'Thermal comfort Likert scale and skin conductance level', research: 'moderate' },
  grounding: { onset: [20, 35], duration: [180, 300], measurement: 'Body Awareness Questionnaire and postural sway variance', research: 'preliminary' },
  memory_enhancement: { onset: [35, 60], duration: [210, 420], measurement: 'Delayed word recall and paired-associate retention 24h later', research: 'strong' },
  working_memory: { onset: [20, 35], duration: [150, 270], measurement: '2-back accuracy + reaction time with EEG theta power', research: 'strong' },
  long_term_memory: { onset: [40, 70], duration: [240, 480], measurement: 'Rey AVLT delayed recall and recognition after 1h', research: 'moderate' },
  information_processing: { onset: [15, 30], duration: [120, 240], measurement: 'Choice reaction time task and P300 latency', research: 'strong' },
  neuroplasticity: { onset: [45, 90], duration: [240, 480], measurement: 'Serum BDNF + learning curve slope on novel task', research: 'moderate' },
  neuroprotection: { onset: [60, 120], duration: [360, 720], measurement: 'Oxidative stress markers (MDA) and inflammatory cytokines', research: 'moderate' },
  learning_speed: { onset: [30, 50], duration: [180, 360], measurement: 'Skill acquisition slope on serial reaction task', research: 'moderate' },
  mental_stamina: { onset: [25, 45], duration: [210, 360], measurement: 'Sustained attention to response task (SART) lapses over 2h', research: 'moderate' },
  motivation_support: { onset: [20, 40], duration: [150, 300], measurement: 'Intrinsic Motivation Inventory (effort/interest) + task initiation latency', research: 'preliminary' },
  executive_function: { onset: [25, 45], duration: [150, 270], measurement: 'Trail Making Test Part B and Wisconsin Card Sort errors', research: 'strong' },
  stress_resilience: { onset: [30, 50], duration: [210, 420], measurement: 'Cortisol response to Trier Social Stress Test + HRV recovery', research: 'moderate' },
  physical_endurance: { onset: [20, 35], duration: [180, 360], measurement: 'Cycle ergometer time-to-exhaustion at 70% VO2max', research: 'strong' },
  muscle_recovery: { onset: [45, 90], duration: [240, 720], measurement: 'Perceived soreness (VAS) + serum CK 24h post exercise', research: 'moderate' },
  metabolic_boost: { onset: [30, 60], duration: [180, 360], measurement: 'Resting metabolic rate via indirect calorimetry every hour', research: 'moderate' },
  thermogenesis: { onset: [20, 40], duration: [150, 300], measurement: 'Postprandial energy expenditure and skin temperature', research: 'moderate' },
  appetite_regulation: { onset: [15, 30], duration: [120, 240], measurement: 'Visual Analog Scale hunger ratings + ghrelin levels', research: 'moderate' },
  digestive_health: { onset: [30, 60], duration: [180, 360], measurement: 'Gastrointestinal Symptom Rating Scale and stool form', research: 'moderate' },
  gut_balance: { onset: [45, 90], duration: [240, 480], measurement: 'Bristol stool scale + microbiome diversity snapshot', research: 'preliminary' },
  immune_support: { onset: [60, 180], duration: [360, 720], measurement: 'Natural killer cell activity and salivary IgA', research: 'moderate' },
  cardiovascular_support: { onset: [30, 60], duration: [240, 480], measurement: 'Flow-mediated dilation (FMD) and resting blood pressure', research: 'moderate' },
  anti_inflammatory: { onset: [60, 120], duration: [300, 600], measurement: 'CRP and IL-6 levels pre/post intervention', research: 'moderate' },
  antioxidant_defense: { onset: [45, 90], duration: [300, 600], measurement: 'Glutathione peroxidase activity and isoprostane levels', research: 'strong' },
  anxiety_reduction: { onset: [15, 30], duration: [120, 240], measurement: 'GAD-7 short form and HRV RMSSD', research: 'strong' },
  emotional_stability: { onset: [25, 45], duration: [180, 360], measurement: 'Daily mood variance (EMA) and PANAS balance', research: 'moderate' },
  depression_relief: { onset: [45, 90], duration: [240, 420], measurement: 'PHQ-9 short form administered weekly', research: 'moderate' }
};

const categoryDefaults = {
  mental: { onset: [20, 40], duration: [150, 300], measurement: 'Cognitive battery (n-back, Stroop, Trail Making) every 30 min', research: 'moderate' },
  physical: { onset: [20, 40], duration: [150, 300], measurement: 'VO2 / HR / blood biomarkers as relevant to effect', research: 'moderate' },
  emotional: { onset: [15, 30], duration: [120, 240], measurement: 'Likert affect scale + HRV tracking', research: 'moderate' }
};

const updated = effects.map(effect => {
  const meta = metadata[effect.name] || categoryDefaults[effect.category];
  if (!meta) {
    throw new Error(`Missing metadata for effect: ${effect.name}`);
  }
  return {
    ...effect,
    onset_range_min: meta.onset[0],
    onset_range_max: meta.onset[1],
    duration_range_min: meta.duration[0],
    duration_range_max: meta.duration[1],
    measurement_protocol: meta.measurement,
    research_support: meta.research
  };
});

fs.writeFileSync(effectsPath, JSON.stringify(updated, null, 2) + '\n');
console.log(`Updated ${updated.length} effects with measurement metadata.`);

