import { v4 as uuidv4 } from 'uuid';
import { getFirestore } from '../config/firebase.js';

const uploadSpecification = async (specFile, projectName, userId) => {
  try {
    const projectId = uuidv4();
    const db = getFirestore();

    // Parse the specification
    let specData;
    if (typeof specFile === 'string') {
      specData = JSON.parse(specFile);
    } else {
      specData = specFile;
    }

    // Extract API information
    const apis = extractApis(specData);

    // Store in Firestore
    const projectRef = db.collection('projects').doc(projectId);
    await projectRef.set({
      projectId,
      projectName,
      userId,
      createdAt: new Date(),
      specType: specData.swagger ? 'swagger' : specData.openapi ? 'openapi' : 'unknown',
      apiCount: apis.length,
      specification: specData,
      apis,
    });

    return {
      projectId,
      projectName,
      specType: specData.swagger ? 'swagger' : specData.openapi ? 'openapi' : 'unknown',
      apiCount: apis.length,
      apis: apis.slice(0, 10), // Return first 10 for preview
    };
  } catch (error) {
    console.error('Error uploading specification:', error);
    throw error;
  }
};

const extractApis = (spec) => {
  const apis = [];

  if (spec.paths) {
    Object.entries(spec.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, details]) => {
        if (['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].includes(method.toLowerCase())) {
          apis.push({
            path,
            method: method.toUpperCase(),
            summary: details.summary || '',
            description: details.description || '',
            parameters: details.parameters || [],
            requestBody: details.requestBody || null,
            responses: details.responses || {},
          });
        }
      });
    });
  }

  return apis;
};

const getProject = async (projectId, userId) => {
  try {
    const db = getFirestore();
    const projectDoc = await db.collection('projects').doc(projectId).get();

    if (!projectDoc.exists) {
      throw new Error('Project not found');
    }

    const projectData = projectDoc.data();
    if (projectData.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return projectData;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

const listProjects = async (userId) => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection('projects')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    console.error('Error listing projects:', error);
    return [];
  }
};

export { uploadSpecification, extractApis, getProject, listProjects };
