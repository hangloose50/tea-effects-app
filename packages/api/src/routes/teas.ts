import { Router, Request, Response } from 'express';
import SupabaseService from '../services/database/SupabaseClient';

const router = Router();
const supabase = SupabaseService.getInstance();

/**
 * GET /api/teas
 * Get all teas with optional filtering
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { type, _effect } = req.query;

    let query = supabase.from('teas').select(`
      *,
      tea_compounds (
        amount_mg_per_cup,
        compounds (name)
      ),
      tea_effects (
        intensity,
        effects (name, category)
      )
    `);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      teas: data,
      count: data?.length || 0
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/teas/:id
 * Get a specific tea by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('teas')
      .select(`
        *,
        tea_compounds (
          amount_mg_per_cup,
          optimal_extraction_temp_c,
          optimal_steep_time_sec,
          compounds (*)
        ),
        tea_effects (
          intensity,
          onset_minutes,
          duration_minutes,
          effects (*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      tea: data
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
