import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

let firebaseApp;
let firestoreDb;
let auth;

const initializeFirebase = () => {
  if (firebaseApp) return;

  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    firestoreDb = admin.firestore();
    auth = admin.auth();

    console.log('✅ Firebase initialized');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
    // Continue without Firebase in development
  }
};

const getFirestore = () => {
  if (!firestoreDb) {
    initializeFirebase();
  }
  return firestoreDb;
};

const getAuth = () => {
  if (!auth) {
    initializeFirebase();
  }
  return auth;
};

export { initializeFirebase, getFirestore, getAuth };
