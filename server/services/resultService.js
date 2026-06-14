import { getFirestore } from '../config/firebase.js';

const getTestResults = async (runId) => {
  try {
    const db = getFirestore();
    const testRunDoc = await db.collection('testRuns').doc(runId).get();

    if (!testRunDoc.exists) {
      throw new Error('Test run not found');
    }

    return testRunDoc.data();
  } catch (error) {
    console.error('Error retrieving test results:', error);
    throw error;
  }
};

const getProjectResults = async (projectId, userId) => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection('testRuns')
      .where('projectId', '==', projectId)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    console.error('Error retrieving project results:', error);
    return [];
  }
};

export { getTestResults, getProjectResults };
