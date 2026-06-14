import express from 'express';
import { getTestResults, getProjectResults } from '../services/resultService.js';

const router = express.Router();

// Get test run results
router.get('/:runId', async (req, res) => {
  try {
    const { runId } = req.params;
    const results = await getTestResults(runId);
    res.json(results);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get project results history
router.get('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.headers['x-user-id'] || 'demo-user';
    const results = await getProjectResults(projectId, userId);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
