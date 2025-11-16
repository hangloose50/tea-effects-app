import { Router } from 'express';
import RAGService from '../services/rag/RAGService';

const router = Router();
const rag = new RAGService();

router.post('/query', async (req, res) => {
  try {
    const { query, filters, limit } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'query is required' });
    }

    const result = await rag.query(query, filters, limit);

    return res.json({ success: true, ...result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
