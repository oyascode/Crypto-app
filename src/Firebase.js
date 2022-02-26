import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './config/FirebaseConfig';

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth}; 
