import express from 'express';
import { uploadSpecification, getProject, listProjects } from '../services/specService.js';

const router = express.Router();

// Upload specification
router.post('/upload', async (req, res) => {
  try {
    const { specification, projectName } = req.body;
    const userId = req.headers['x-user-id'] || 'demo-user';

    if (!specification || !projectName) {
      return res.status(400).json({ error: 'Specification and project name required' });
    }

    const result = await uploadSpecification(specification, projectName, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get project
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.headers['x-user-id'] || 'demo-user';

    const project = await getProject(projectId, userId);
    res.json(project);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// List projects
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user';
    const projects = await listProjects(userId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
