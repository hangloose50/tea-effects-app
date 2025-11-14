import { Router, Request, Response } from 'express';
import EffectEngine from '../services/effects/EffectEngine';
import { RecommendationRequest } from '../models/types';

const router = Router();
const effectEngine = new EffectEngine();

/**
 * POST /api/recommendations
 * Get personalized tea recommendations based on desired effects
 */
router.post('/', async (_req: Request, res: Response) => {
  try {
    const request: RecommendationRequest = req.body;

    // Validate request
    if (!request.desired_effect) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'desired_effect is required'
      });
    }

    if (!request.time_of_day) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'time_of_day is required'
      });
    }

    // Get recommendations
    const recommendations = await effectEngine.recommend(request);

    res.json({
      success: true,
      request: {
        desired_effect: request.desired_effect,
        time_of_day: request.time_of_day
      },
      recommendations,
      count: recommendations.length
    });
  } catch (error: any) {
    console.error('Recommendation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * GET /api/recommendations/effects
 * Get list of available effects
 */
router.get('/effects', async (req: Request, res: Response) => {
  try {
    // This would normally come from the database
    // For now, return a static list
    const effects = [
      'alertness',
      'sustained_focus',
      'mental_clarity',
      'creativity',
      'memory',
      'learning',
      'energy_boost',
      'calm',
      'relaxation',
      'stress_relief',
      'mood_lift',
      'sleep_prep'
    ];

    return res.json({
      success: true,
      effects
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

export default router;
