import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, teas, target_effects } = body;

    if (!name || !teas || teas.length === 0) {
      return NextResponse.json(
        { error: 'Name and at least one tea are required' },
        { status: 400 }
      );
    }

    // For now, use anonymous user_id
    const userId = '00000000-0000-0000-0000-000000000000';

    // Create the blend
    const { data: blend, error: blendError } = await supabase
      .from('blends')
      .insert({
        user_id: userId,
        name,
        description: description || '',
        target_effects: target_effects || [],
        is_public: true,
        times_favorited: 0
      })
      .select()
      .single();

    if (blendError) {
      console.error('Error creating blend:', blendError);
      return NextResponse.json({ error: blendError.message }, { status: 500 });
    }

    // Create blend components
    const components = teas.map((tea: any, index: number) => ({
      blend_id: blend.id,
      tea_id: tea.tea_id,
      ratio: tea.ratio || 100 / teas.length,
      steep_time_sec: tea.steep_time_sec || 180,
      steep_temp_c: tea.steep_temp_c || 85,
      notes: tea.notes || '',
      order_added: index + 1
    }));

    const { error: componentsError } = await supabase
      .from('blend_components')
      .insert(components);

    if (componentsError) {
      console.error('Error creating blend components:', componentsError);
      // Rollback: delete the blend
      await supabase.from('blends').delete().eq('id', blend.id);
      return NextResponse.json({ error: componentsError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      blend: {
        ...blend,
        components
      }
    });
  } catch (error: any) {
    console.error('Blend creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all public blends
    const { data: blends, error } = await supabase
      .from('blends')
      .select(`
        *,
        blend_components (
          tea_id,
          ratio,
          steep_time_sec,
          steep_temp_c,
          notes,
          order_added,
          teas (name, type)
        )
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blends:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      blends: blends || []
    });
  } catch (error: any) {
    console.error('Blends fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}