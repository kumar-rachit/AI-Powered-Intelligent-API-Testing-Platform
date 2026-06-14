import axios from 'axios';
import { getFirestore } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

const executeTest = async (testCase, targetApi) => {
  const startTime = Date.now();
  const result = {
    testCaseId: testCase.id,
    testName: testCase.name,
    status: 'pending',
    startTime,
    endTime: null,
    duration: 0,
    response: null,
    error: null,
    validations: [],
  };

  try {
    const url = `${targetApi}${testCase.endpoint}`;
    
    const response = await axios({
      method: testCase.method || 'GET',
      url,
      data: testCase.payload,
      timeout: 30000,
      validateStatus: () => true, // Don't throw on any status
    });

    result.response = {
      status: response.status,
      headers: response.headers,
      data: response.data,
    };

    // Validate response
    const validations = validateResponse(response, testCase);
    result.validations = validations;
    result.status = validations.every(v => v.passed) ? 'passed' : 'failed';

    result.endTime = Date.now();
    result.duration = result.endTime - startTime;

    return result;
  } catch (error) {
    result.error = error.message;
    result.status = 'error';
    result.endTime = Date.now();
    result.duration = result.endTime - startTime;

    return result;
  }
};

const validateResponse = (response, testCase) => {
  const validations = [];

  // Check status code
  if (testCase.expectedStatus) {
    validations.push({
      type: 'statusCode',
      expected: testCase.expectedStatus,
      actual: response.status,
      passed: response.status === testCase.expectedStatus,
    });
  }

  // Check response structure
  if (testCase.expectedValidations?.includes('schema') && response.data) {
    validations.push({
      type: 'schema',
      passed: typeof response.data === 'object',
      details: 'Response is valid JSON object',
    });
  }

  // Check for error message if expected to fail
  if (testCase.expectedStatus >= 400 && testCase.expectedValidations?.includes('errorMessage')) {
    const hasErrorMessage = response.data?.error || response.data?.message || response.data?.errors;
    validations.push({
      type: 'errorMessage',
      passed: !!hasErrorMessage,
      details: hasErrorMessage ? 'Error message present' : 'No error message',
    });
  }

  return validations;
};

const storeTestResults = async (runId, projectId, userId, testResults) => {
  try {
    const db = getFirestore();
    
    const testRunRef = db.collection('testRuns').doc(runId);
    
    await testRunRef.set({
      runId,
      projectId,
      userId,
      createdAt: new Date(),
      testResults,
      summary: {
        total: testResults.length,
        passed: testResults.filter(r => r.status === 'passed').length,
        failed: testResults.filter(r => r.status === 'failed').length,
        errors: testResults.filter(r => r.status === 'error').length,
        coverage: `${Math.round((testResults.filter(r => r.status === 'passed').length / testResults.length) * 100)}%`,
      },
    });

    return runId;
  } catch (error) {
    console.error('Error storing test results:', error);
    throw error;
  }
};

export { executeTest, validateResponse, storeTestResults };
