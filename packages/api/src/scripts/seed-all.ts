import * as fs from 'fs';
import * as path from 'path';
import SupabaseService from '../services/database/SupabaseClient';
import RAGService from '../services/rag/RAGService';

const supabase = SupabaseService.getInstance();
const rag = new RAGService();

interface CompoundData {
  name: string;
  chemical_formula?: string;
  mechanism?: string;
  half_life_minutes?: number;
  safe_daily_limit_mg?: number;
}

interface EffectData {
  name: string;
  category: string;
  description?: string;
  icon?: string;
}

interface TeaData {
  name: string;
  type: string;
  origin?: string;
  description?: string;
  price_per_oz?: number;
  compounds: Record<string, number>;
  brewing: {
    temp_c: number;
    time_sec: number;
    amount_g: number;
  };
  effects: Array<{
    effect: string;
    intensity: number;
    onset_minutes: number;
    duration_minutes: number;
  }>;
}

async function seedCompounds() {
  console.log('🧪 Seeding compounds...');

  const compoundsPath = path.join(__dirname, '../../data/compounds/compounds.json');
  const compoundsData: CompoundData[] = JSON.parse(fs.readFileSync(compoundsPath, 'utf-8'));

  for (const compound of compoundsData) {
    const { error } = await supabase
      .from('compounds')
      .upsert(compound, { onConflict: 'name' });

    if (error) {
      console.error(`Error inserting compound ${compound.name}:`, error.message);
    } else {
      console.log(`✓ Compound: ${compound.name}`);
    }
  }

  console.log(`✅ Seeded ${compoundsData.length} compounds\n`);
}

async function seedEffects() {
  console.log('⚡ Seeding effects...');

  const effectsPath = path.join(__dirname, '../../data/effects/effects.json');
  const effectsData: EffectData[] = JSON.parse(fs.readFileSync(effectsPath, 'utf-8'));

  for (const effect of effectsData) {
    const { error } = await supabase
      .from('effects')
      .upsert(effect, { onConflict: 'name' });

    if (error) {
      console.error(`Error inserting effect ${effect.name}:`, error.message);
    } else {
      console.log(`✓ Effect: ${effect.name}`);
    }
  }

  console.log(`✅ Seeded ${effectsData.length} effects\n`);
}

async function seedTeas() {
  console.log('🍵 Seeding teas...');

  const teaFiles = [
    'oolong-teas.json',
    'pu-erh-teas.json',
    'green-teas.json',
    'herbal-teas.json'
  ];

  let totalTeas = 0;

  for (const file of teaFiles) {
    const teasPath = path.join(__dirname, `../../data/teas/${file}`);

    if (!fs.existsSync(teasPath)) {
      console.log(`⚠️  File not found: ${file}, skipping...`);
      continue;
    }

    const teasData: TeaData[] = JSON.parse(fs.readFileSync(teasPath, 'utf-8'));

    for (const tea of teasData) {
      // Insert tea
      const { data: insertedTea, error: teaError } = await supabase
        .from('teas')
        .insert({
          name: tea.name,
          type: tea.type,
          origin: tea.origin,
          description: tea.description,
          price_per_oz: tea.price_per_oz
        })
        .select()
        .single();

      if (teaError) {
        console.error(`Error inserting tea ${tea.name}:`, teaError.message);
        continue;
      }

      console.log(`✓ Tea: ${tea.name}`);

      // Insert tea compounds
      for (const [compoundName, amount] of Object.entries(tea.compounds)) {
        const { data: compound } = await supabase
          .from('compounds')
          .select('id')
          .eq('name', compoundName)
          .single();

        if (compound) {
          await supabase.from('tea_compounds').insert({
            tea_id: insertedTea.id,
            compound_id: compound.id,
            amount_mg_per_cup: amount,
            optimal_extraction_temp_c: tea.brewing.temp_c,
            optimal_steep_time_sec: tea.brewing.time_sec
          });
        }
      }

      // Insert tea effects
      for (const effect of tea.effects) {
        const { data: effectData } = await supabase
          .from('effects')
          .select('id')
          .eq('name', effect.effect)
          .single();

        if (effectData) {
          await supabase.from('tea_effects').insert({
            tea_id: insertedTea.id,
            effect_id: effectData.id,
            intensity: effect.intensity,
            onset_minutes: effect.onset_minutes,
            duration_minutes: effect.duration_minutes,
            confidence_score: 0.9,
            data_source: 'research'
          });
        }
      }

      totalTeas++;
    }
  }

  console.log(`✅ Seeded ${totalTeas} teas\n`);
}

async function seedRAG() {
  console.log('📚 Seeding RAG knowledge base...');

  const ragSourcesPath = path.join(__dirname, '../../data/rag-sources');

  if (!fs.existsSync(ragSourcesPath)) {
    console.log('⚠️  RAG sources directory not found, skipping...\n');
    return;
  }

  const files = fs.readdirSync(ragSourcesPath).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(ragSourcesPath, file), 'utf-8');

    console.log(`Processing: ${file}...`);

    try {
      await rag.ingestDocument(content, {
        source: file,
        title: file.replace('.md', ''),
        category: 'research'
      });

      console.log(`✓ Ingested: ${file}`);
    } catch (error: any) {
      console.error(`Error ingesting ${file}:`, error.message);
    }
  }

  console.log(`✅ RAG knowledge base populated\n`);
}

async function main() {
  console.log('🚀 Starting database seeding...\n');

  try {
    await seedCompounds();
    await seedEffects();
    await seedTeas();
    await seedRAG();

    console.log('✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();
