import React from 'react';
import { useParams } from 'react-router-dom';

const AnalyticsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-2">Test Coverage</p>
          <p className="text-3xl font-bold text-blue-600">92%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-2">Pass Rate</p>
          <p className="text-3xl font-bold text-green-600">88%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-2">Total Tests</p>
          <p className="text-3xl font-bold text-purple-600">245</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-2">Avg Response Time</p>
          <p className="text-3xl font-bold text-orange-600">142ms</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test Execution Trends</h2>
        <p className="text-gray-500 py-8 text-center">Chart placeholder - Connect with your analytics data</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
