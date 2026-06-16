import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfSjO0Eo-3oc80sHwQtDpXcQoTCY-NYwU",
  authDomain: "nhammarket-rebecca.firebaseapp.com",
  projectId: "nhammarket-rebecca",
  storageBucket: "nhammarket-rebecca.firebasestorage.app",
  messagingSenderId: "35272793147",
  appId: "1:35272793147:web:d486ae70e73b8c71a8d01e",
  measurementId: "G-C42HZ5T1MG"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };