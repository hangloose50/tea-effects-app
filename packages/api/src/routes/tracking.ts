import { Router } from 'express';
import SupabaseService from '../services/database/SupabaseClient';

const router = Router();
const supabase = SupabaseService.getInstance();

router.post('/log', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string || 'anonymous';
    const logData = { ...req.body, user_id: userId };

    const { data, error } = await supabase
      .from('effect_logs')
      .insert(logData)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, log: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
