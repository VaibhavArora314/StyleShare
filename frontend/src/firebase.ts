import { initializeApp } from "firebase/app";

async function fetchFirebaseConfig() {
  try {
    const response = await fetch('/config');
    if (!response.ok) {
      throw new Error('Failed to fetch Firebase config');
    }
    const config = await response.json();
   // console.log('Fetched Firebase config:', config);
    return config;
  } catch (error) {
    console.error('Error fetching Firebase config:', error);
    throw error;
  }
}

async function initializeFirebase() {
  const config = await fetchFirebaseConfig();
  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId,
  };

  return initializeApp(firebaseConfig);
}

export const appPromise = initializeFirebase().catch((error) => {
  console.error('Error initializing Firebase:', error);
  throw error;
});
