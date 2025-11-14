import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Fetch all teas with their compounds and effects
    const { data: teas, error } = await supabase
      .from('teas')
      .select(`
        *,
        tea_compounds (
          amount_mg_per_cup,
          compounds (name)
        ),
        tea_effects (
          intensity,
          effects (name, category)
        )
      `)
      .order('name');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Format the response to match the original API structure
    const formattedTeas = teas?.map(tea => ({
      ...tea,
      compounds: tea.tea_compounds?.map((tc: any) => ({
        name: tc.compounds?.name,
        amount_mg: tc.amount_mg_per_cup
      })) || [],
      effects: tea.tea_effects?.map((te: any) => ({
        name: te.effects?.name,
        category: te.effects?.category,
        intensity: te.intensity
      })) || []
    }));

    return NextResponse.json({
      success: true,
      teas: formattedTeas || []
    });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teas', details: error.message },
      { status: 500 }
    );
  }
}