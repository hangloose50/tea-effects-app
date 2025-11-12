import { Router } from 'express';
import SupabaseService from '../services/database/SupabaseClient';

const router = Router();
const supabase = SupabaseService.getInstance();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('effects').select('*');
    if (error) throw error;
    res.json({ success: true, effects: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
