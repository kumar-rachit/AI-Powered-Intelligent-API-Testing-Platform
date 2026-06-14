import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TestGenerationPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [testCases, setTestCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [targetApi, setTargetApi] = useState('');

  const handleGenerateTests = async () => {
    if (!targetApi || !projectId) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        '/api/tests/generate',
        { projectId, targetApi, apiSpec: {} },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setTestCases(response.data.testCases || []);
    } catch (error) {
      console.error('Error generating tests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Generate Test Cases</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Target API URL</label>
            <input
              type="url"
              value={targetApi}
              onChange={(e) => setTargetApi(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="https://api.example.com"
            />
          </div>

          <button
            onClick={handleGenerateTests}
            disabled={loading || !targetApi}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Test Cases'}
          </button>
        </div>
      </div>

      {Object.keys(testCases).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generated Tests</h2>
          {Object.entries(testCases).map(([category, tests]: any) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 capitalize">{category} Tests</h3>
              <div className="space-y-2">
                {Array.isArray(tests) && tests.map((test: any, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="font-medium">{test.name}</p>
                    <p className="text-sm text-gray-600">{test.endpoint}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestGenerationPage;
