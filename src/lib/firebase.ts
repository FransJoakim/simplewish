import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  DocumentSnapshot,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx9TiREYWSu9-dTZxbiylJbdXhFYvDLt4",
  authDomain: "simplewish-ba6d8.firebaseapp.com",
  projectId: "simplewish-ba6d8",
  storageBucket: "simplewish-ba6d8.appspot.com",
  messagingSenderId: "305875419660",
  appId: "1:305875419660:web:de6a3e385740a66c5ee429",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getUserWithUsername(username: string) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

interface WishInterface {
  createdAt: Timestamp;
  createdBy: string;
  description: string;
  links: string[];
  title: string[];
}

export function postToJSON(doc: QueryDocumentSnapshot<WishInterface>) {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    createdAt: data.createdAt.toMillis(),
    // updatedAt: data.updatedAt.toMillis(),
  };
}
