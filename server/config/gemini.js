import dotenv from 'dotenv';

dotenv.config();

let generativeModel = null;

const initializeGemini = () => {
  // Gemini AI will be initialized when Google Cloud SDK is properly configured
  // For now, mock implementation is provided
  try {
    console.log('⚠️  Gemini AI: Using mock mode (configure GOOGLE_CLOUD_PROJECT_ID for real integration)');
  } catch (error) {
    console.error('⚠️  Gemini initialization:', error.message);
  }
};

const getGenerativeModel = () => {
  return null; // Returns null, services will use mock implementation
};

export { initializeGemini, getGenerativeModel };
