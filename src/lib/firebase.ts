import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

 const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaseApp);

export async function saveSummaryData(data: any) {
    try {
      const docRef = await addDoc(collection(firebaseDb, 'summaries'), data);
      return docRef;
    } catch (error) {
      console.error('Error adding document:', error);
      return null;
    }
}

export async function getAllSummaryData() {
  const summariesRef = collection(firebaseDb, 'summaries');
  const sortedQuery = query(summariesRef, orderBy('timestamp', 'desc')); 
  const querySnapshot = await getDocs(sortedQuery);
  const summaries = querySnapshot.docs.map(doc => doc.data());
  return summaries;
}