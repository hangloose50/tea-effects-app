import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Fallback recommendations (same as in effects page)
const fallbackRecommendations: Record<string, any[]> = {
  creativity: [
    {
      tea: {
        name: "Tie Guan Yin (Iron Goddess)",
        type: "oolong",
        description: "Premium oolong with exceptional L-theanine content. Known for producing a calm, creative mental state.",
        compounds: [
          { name: "caffeine", amount_mg: 45 },
          { name: "l-theanine", amount_mg: 40 }
        ]
      },
      reasoning: "High L-theanine balances caffeine for calm focus and creative thinking",
      brewing_method: {
        temperature_c: 85,
        steep_time_sec: 180,
        amount_g: 3
      },
      compound_breakdown: { caffeine_mg: 45, l_theanine_mg: 40 }
    },
    {
      tea: {
        name: "Gyokuro",
        type: "green",
        description: "Shade-grown premium green tea with very high L-theanine. Produces exceptional calm-focus state.",
        compounds: [
          { name: "caffeine", amount_mg: 40 },
          { name: "l-theanine", amount_mg: 50 }
        ]
      },
      reasoning: "Highest L-theanine content promotes alpha brain waves for creativity",
      brewing_method: {
        temperature_c: 70,
        steep_time_sec: 120,
        amount_g: 3
      },
      compound_breakdown: { caffeine_mg: 40, l_theanine_mg: 50 }
    }
  ],
  sustained_focus: [
    {
      tea: {
        name: "Sencha",
        type: "green",
        description: "Classic Japanese green tea with balanced caffeine and L-theanine for sustained focus.",
        compounds: [
          { name: "caffeine", amount_mg: 35 },
          { name: "l-theanine", amount_mg: 25 }
        ]
      },
      reasoning: "Balanced compounds provide steady energy without jitters",
      brewing_method: {
        temperature_c: 75,
        steep_time_sec: 90,
        amount_g: 2.5
      },
      compound_breakdown: { caffeine_mg: 35, l_theanine_mg: 25 }
    }
  ],
  calm: [
    {
      tea: {
        name: "Chamomile Lavender",
        type: "herbal",
        description: "Caffeine-free herbal blend with natural calming properties.",
        compounds: [
          { name: "apigenin", amount_mg: 5 },
          { name: "linalool", amount_mg: 3 }
        ]
      },
      reasoning: "Natural compounds that promote GABA activity for relaxation",
      brewing_method: {
        temperature_c: 95,
        steep_time_sec: 300,
        amount_g: 2
      },
      compound_breakdown: { caffeine_mg: 0, l_theanine_mg: 0 }
    }
  ],
  energy_boost: [
    {
      tea: {
        name: "Yerba Mate",
        type: "herbal",
        description: "South American tea with high caffeine and unique xanthine alkaloids for clean energy.",
        compounds: [
          { name: "caffeine", amount_mg: 80 },
          { name: "theobromine", amount_mg: 20 }
        ]
      },
      reasoning: "High caffeine with theobromine provides sustained energy without crash",
      brewing_method: {
        temperature_c: 80,
        steep_time_sec: 240,
        amount_g: 3
      },
      compound_breakdown: { caffeine_mg: 80, l_theanine_mg: 0 }
    }
  ],
  sleep_prep: [
    {
      tea: {
        name: "Passionflower Valerian",
        type: "herbal",
        description: "Powerful sleep-promoting herbal blend. Best consumed 30-60 minutes before bed.",
        compounds: [
          { name: "valerenic acid", amount_mg: 10 },
          { name: "chrysin", amount_mg: 5 }
        ]
      },
      reasoning: "Compounds that enhance GABA and reduce neural activity for sleep",
      brewing_method: {
        temperature_c: 95,
        steep_time_sec: 420,
        amount_g: 2.5
      },
      compound_breakdown: { caffeine_mg: 0, l_theanine_mg: 0 }
    }
  ],
  memory: [
    {
      tea: {
        name: "Ginkgo Green",
        type: "green",
        description: "Green tea enhanced with ginkgo biloba for memory and cognitive function.",
        compounds: [
          { name: "caffeine", amount_mg: 30 },
          { name: "ginkgolides", amount_mg: 15 }
        ]
      },
      reasoning: "Ginkgo compounds improve blood flow to brain for enhanced memory",
      brewing_method: {
        temperature_c: 80,
        steep_time_sec: 150,
        amount_g: 2.5
      },
      compound_breakdown: { caffeine_mg: 30, l_theanine_mg: 20 }
    }
  ]
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { desired_effect, time_of_day } = body;

    if (!desired_effect) {
      return NextResponse.json(
        { error: 'desired_effect is required' },
        { status: 400 }
      );
    }

    // Try to get recommendations from database first
    try {
      const { data: teas, error } = await supabase
        .from('teas')
        .select(`
          *,
          tea_compounds (
            amount_mg,
            compounds (*)
          ),
          tea_effects (
            intensity,
            onset_minutes,
            duration_minutes,
            effects (*)
          )
        `)
        .order('name')
        .limit(3);

      if (!error && teas && teas.length > 0) {
        // Format database results
        const recommendations = teas.map((tea, index) => ({
          tea: {
            ...tea,
            compounds: tea.tea_compounds?.map((tc: any) => ({
              name: tc.compounds?.name,
              amount_mg: tc.amount_mg
            })) || []
          },
          reasoning: `Selected based on ${desired_effect} effect and ${time_of_day} timing`,
          brewing_method: {
            temperature_c: tea.type === 'green' ? 75 : tea.type === 'oolong' ? 85 : 95,
            steep_time_sec: tea.type === 'green' ? 90 : tea.type === 'oolong' ? 180 : 240,
            amount_g: 3
          },
          compound_breakdown: {
            caffeine_mg: tea.tea_compounds?.find((tc: any) => tc.compounds?.name === 'caffeine')?.amount_mg || 0,
            l_theanine_mg: tea.tea_compounds?.find((tc: any) => tc.compounds?.name === 'l-theanine')?.amount_mg || 0
          }
        }));

        return NextResponse.json({
          success: true,
          recommendations,
          request: { desired_effect, time_of_day }
        });
      }
    } catch (dbError) {
      console.log('Database unavailable, using fallbacks');
    }

    // Use fallback recommendations
    const recommendations = fallbackRecommendations[desired_effect] ||
                          fallbackRecommendations.creativity || [];

    return NextResponse.json({
      success: true,
      recommendations: recommendations.slice(0, 3),
      request: { desired_effect, time_of_day }
    });

  } catch (error: any) {
    console.error('Recommendations API error:', error);
    return NextResponse.json(
      { error: 'Failed to get recommendations', details: error.message },
      { status: 500 }
    );
  }
}