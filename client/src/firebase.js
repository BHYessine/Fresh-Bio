import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_EBUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app, "gs://fresh-bio.appspot.com");
