import React from 'react';
import { useParams } from 'react-router-dom';

const ReportsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Reports</h1>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Latest Test Run Report</h3>
              <p className="text-sm text-gray-600">Generated on 2024-01-15</p>
            </div>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Report
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Download PDF
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Comprehensive Coverage Report</h3>
              <p className="text-sm text-gray-600">Generated on 2024-01-14</p>
            </div>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Report
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
