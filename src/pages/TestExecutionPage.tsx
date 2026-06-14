import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TestExecutionPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRunTests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        '/api/tests/run',
        { projectId, testCases: [], targetApi: 'https://api.example.com' },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setResults(response.data);
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Execute Tests</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <button
          onClick={handleRunTests}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Running Tests...' : 'Run All Tests'}
        </button>
      </div>

      {results && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Results Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-blue-600">{results.summary.total}</p>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <p className="text-sm text-gray-600">Passed</p>
              <p className="text-2xl font-bold text-green-600">{results.summary.passed}</p>
            </div>
            <div className="p-4 bg-red-50 rounded">
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{results.summary.failed}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded">
              <p className="text-sm text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-yellow-600">{results.summary.errors}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestExecutionPage;
