import { v4 as uuidv4 } from 'uuid';
import { getGenerativeModel } from '../config/gemini.js';

const generateTestCases = async (apiSpec) => {
  try {
    const generativeModel = getGenerativeModel();
    
    const prompt = `
You are an expert API testing specialist. Analyze the following API specification and generate comprehensive test cases.

API Specification:
${JSON.stringify(apiSpec, null, 2)}

Generate test cases covering:
1. Functional tests (valid requests, business logic)
2. Boundary tests (min/max values, null values)
3. Negative tests (invalid inputs, missing fields)
4. Security tests (SQL injection, XSS, JWT manipulation)
5. Performance tests (concurrent requests)

Return as JSON with structure:
{
  "functional": [...],
  "boundary": [...],
  "negative": [...],
  "security": [...],
  "performance": [...]
}

Each test should have: name, endpoint, method, payload, expectedStatus, expectedValidations
    `;

    if (!generativeModel) {
      // Mock response for development
      return generateMockTestCases(apiSpec);
    }

    const response = await generativeModel.generateContent(prompt);
    const content = response.response.candidates[0].content.parts[0].text;
    
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return generateMockTestCases(apiSpec);
  } catch (error) {
    console.error('Test generation error:', error);
    return generateMockTestCases(apiSpec);
  }
};

const generateMockTestCases = (apiSpec) => {
  return {
    functional: [
      {
        id: uuidv4(),
        name: 'Valid request test',
        endpoint: apiSpec.paths?.[Object.keys(apiSpec.paths || {})[0]]?.post ? Object.keys(apiSpec.paths || {})[0] : '/api/test',
        method: 'POST',
        payload: { test: 'data' },
        expectedStatus: 200,
        expectedValidations: ['statusCode', 'schema']
      }
    ],
    boundary: [
      {
        id: uuidv4(),
        name: 'Empty payload test',
        endpoint: apiSpec.paths?.[Object.keys(apiSpec.paths || {})[0]]?.post ? Object.keys(apiSpec.paths || {})[0] : '/api/test',
        method: 'POST',
        payload: {},
        expectedStatus: 400,
        expectedValidations: ['errorMessage']
      }
    ],
    negative: [
      {
        id: uuidv4(),
        name: 'Invalid data type test',
        endpoint: apiSpec.paths?.[Object.keys(apiSpec.paths || {})[0]]?.post ? Object.keys(apiSpec.paths || {})[0] : '/api/test',
        method: 'POST',
        payload: { id: 'not-a-number' },
        expectedStatus: 400,
        expectedValidations: ['errorMessage']
      }
    ],
    security: [
      {
        id: uuidv4(),
        name: 'SQL injection test',
        endpoint: apiSpec.paths?.[Object.keys(apiSpec.paths || {})[0]]?.post ? Object.keys(apiSpec.paths || {})[0] : '/api/test',
        method: 'POST',
        payload: { query: "'; DROP TABLE users; --" },
        expectedStatus: 400,
        expectedValidations: ['secure']
      }
    ],
    performance: [
      {
        id: uuidv4(),
        name: 'Concurrent load test',
        endpoint: apiSpec.paths?.[Object.keys(apiSpec.paths || {})[0]]?.post ? Object.keys(apiSpec.paths || {})[0] : '/api/test',
        method: 'POST',
        concurrentRequests: 100,
        duration: 10000,
        expectedMetrics: ['avgResponseTime', 'p95ResponseTime']
      }
    ]
  };
};

export { generateTestCases };
