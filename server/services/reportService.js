import { v4 as uuidv4 } from 'uuid';

const generateReport = (testResults) => {
  const summary = {
    totalTests: testResults.length,
    passed: testResults.filter(t => t.status === 'passed').length,
    failed: testResults.filter(t => t.status === 'failed').length,
    errors: testResults.filter(t => t.status === 'error').length,
    coverage: calculateCoverage(testResults),
    duration: calculateDuration(testResults),
    timestamp: new Date().toISOString(),
  };

  const byType = groupTestsByType(testResults);
  const failedTests = testResults.filter(t => t.status !== 'passed');

  return {
    reportId: uuidv4(),
    summary,
    testsByType: byType,
    failedTests,
    recommendations: generateRecommendations(testResults),
  };
};

const calculateCoverage = (testResults) => {
  const passed = testResults.filter(t => t.status === 'passed').length;
  return Math.round((passed / testResults.length) * 100);
};

const calculateDuration = (testResults) => {
  return testResults.reduce((sum, t) => sum + (t.duration || 0), 0);
};

const groupTestsByType = (testResults) => {
  return testResults.reduce((acc, test) => {
    const type = test.testName?.split(' ')[0]?.toLowerCase() || 'other';
    if (!acc[type]) {
      acc[type] = { total: 0, passed: 0, failed: 0 };
    }
    acc[type].total++;
    if (test.status === 'passed') {
      acc[type].passed++;
    } else {
      acc[type].failed++;
    }
    return acc;
  }, {});
};

const generateRecommendations = (testResults) => {
  const recommendations = [];

  const failureRate = (testResults.filter(t => t.status !== 'passed').length / testResults.length) * 100;
  if (failureRate > 30) {
    recommendations.push({
      priority: 'high',
      message: 'High failure rate detected. Review API implementation.',
    });
  }

  const errorRate = (testResults.filter(t => t.status === 'error').length / testResults.length) * 100;
  if (errorRate > 10) {
    recommendations.push({
      priority: 'high',
      message: 'Test execution errors detected. Check API availability and network.',
    });
  }

  const slowTests = testResults.filter(t => t.duration > 5000);
  if (slowTests.length > 0) {
    recommendations.push({
      priority: 'medium',
      message: `${slowTests.length} tests exceeded 5 second threshold. Consider performance optimization.`,
    });
  }

  recommendations.push({
    priority: 'low',
    message: 'Schedule regular test runs to catch regressions early.',
  });

  return recommendations;
};

export { generateReport, calculateCoverage, calculateDuration, groupTestsByType, generateRecommendations };
