import express from 'express';
import { generateReport } from '../services/reportService.js';
import { getTestResults } from '../services/resultService.js';

const router = express.Router();

// Generate report from test run
router.get('/:runId', async (req, res) => {
  try {
    const { runId } = req.params;
    const testRun = await getTestResults(runId);

    const report = generateReport(testRun.testResults);
    
    res.json({
      runId,
      report,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Export report as JSON
router.get('/:runId/export', async (req, res) => {
  try {
    const { runId } = req.params;
    const testRun = await getTestResults(runId);
    const report = generateReport(testRun.testResults);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="report-${runId}.json"`);
    res.json({
      runId,
      report,
      generatedAt: new Date().toISOString(),
      testRun: testRun.summary,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
