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
      .order('name');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Format the response to match the original API structure
    const formattedTeas = teas?.map(tea => ({
      ...tea,
      compounds: tea.tea_compounds?.map((tc: any) => ({
        ...tc.compounds,
        amount_mg: tc.amount_mg
      })) || [],
      effects: tea.tea_effects?.map((te: any) => ({
        ...te.effects,
        intensity: te.intensity,
        onset_minutes: te.onset_minutes,
        duration_minutes: te.duration_minutes
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