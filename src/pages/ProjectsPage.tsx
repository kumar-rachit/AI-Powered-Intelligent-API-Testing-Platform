import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
  projectId: string;
  projectName: string;
  specType: string;
  apiCount: number;
  createdAt: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [specFile, setSpecFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('/api/spec', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!specFile || !projectName) return;

    setLoading(true);
    try {
      const fileContent = await specFile.text();
      const specification = JSON.parse(fileContent);
      
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        '/api/spec/upload',
        { specification, projectName },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      setProjects([...projects, response.data]);
      setSpecFile(null);
      setProjectName('');
    } catch (error) {
      console.error('Error uploading specification:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload API Specification</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="My API Project"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Specification File</label>
            <input
              type="file"
              accept=".json,.yaml,.yml"
              onChange={(e) => setSpecFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <p className="text-sm text-gray-500 mt-2">Supports Swagger JSON, OpenAPI, or Postman collections</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload Specification'}
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No projects yet. Upload a specification to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.projectId} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-2">{project.projectName}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Type: {project.specType} | APIs: {project.apiCount}
                </p>
                <div className="flex gap-2">
                  <a
                    href={`/test-generation/${project.projectId}`}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-center hover:bg-blue-700"
                  >
                    Generate Tests
                  </a>
                  <a
                    href={`/analytics/${project.projectId}`}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-center hover:bg-green-700"
                  >
                    Analytics
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
