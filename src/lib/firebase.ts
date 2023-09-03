import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

 const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
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