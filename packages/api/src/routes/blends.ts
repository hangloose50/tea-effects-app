import { Router, Request, Response } from 'express';
import BlendEngine from '../services/blending/BlendEngine';
import { BlendCreationRequest } from '../models/types';

const router = Router();
const blendEngine = new BlendEngine();

/**
 * POST /api/blends
 * Create a custom tea blend
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const request: BlendCreationRequest = req.body;
    const userId = req.headers['x-user-id'] as string || 'anonymous'; // Simple auth for now

    if (!request.target_effects || request.target_effects.length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'target_effects are required'
      });
    }

    const blend = await blendEngine.createBlend(request, userId);

    res.json({
      success: true,
      blend
    });
  } catch (error: any) {
    console.error('Blend creation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

export default router;
