import express from 'express';
import { runFullSynthesis, getAnalysisHistory } from '../controllers/analysisController.js';

const router = express.Router();

router.post('/analyze', runFullSynthesis);
router.get('/history', getAnalysisHistory);

export default router;
