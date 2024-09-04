import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBTVCTlld0NOciIdMNQZ-Z10CMIoAuC0BE",
  authDomain: "react-demo-project-a0e30.firebaseapp.com",
  databaseURL: "https://react-demo-project-a0e30-default-rtdb.firebaseio.com",
  projectId: "react-demo-project-a0e30",
  storageBucket: "react-demo-project-a0e30.appspot.com",
  messagingSenderId: "695487246838",
  appId: "1:695487246838:web:47ec122ff7b4fcc8ef17d7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage };
