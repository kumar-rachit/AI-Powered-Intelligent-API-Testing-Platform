import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateTestCases } from '../services/testGenerator.js';
import { executeTest, storeTestResults } from '../services/testExecutor.js';
import { getFirestore } from '../config/firebase.js';

const router = express.Router();

// Generate test cases
router.post('/generate', async (req, res) => {
  try {
    const { projectId, apiSpec, targetApi } = req.body;

    if (!projectId || !apiSpec) {
      return res.status(400).json({ error: 'Project ID and API spec required' });
    }

    const testCases = await generateTestCases(apiSpec);
    
    res.json({
      testCases,
      count: Object.values(testCases).flat().length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Execute tests
router.post('/run', async (req, res) => {
  try {
    const { projectId, testCases, targetApi } = req.body;
    const userId = req.headers['x-user-id'] || 'demo-user';

    if (!projectId || !testCases || !targetApi) {
      return res.status(400).json({ error: 'Project ID, test cases, and target API required' });
    }

    const runId = uuidv4();
    
    // Execute tests in parallel batches
    const batchSize = 5;
    const results = [];

    for (let i = 0; i < testCases.length; i += batchSize) {
      const batch = testCases.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(tc => executeTest(tc, targetApi))
      );
      results.push(...batchResults);
    }

    // Store results
    await storeTestResults(runId, projectId, userId, results);

    res.json({
      runId,
      summary: {
        total: results.length,
        passed: results.filter(r => r.status === 'passed').length,
        failed: results.filter(r => r.status === 'failed').length,
        errors: results.filter(r => r.status === 'error').length,
      },
      results: results.slice(0, 20), // Return first 20 for preview
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
