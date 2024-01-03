
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from 'firebase/auth'
import { Firestore, getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCrTf5wyJYX1QWtrcyduHAjDHxm3lU_ks4",
  authDomain: "dudurewa-super-admin.firebaseapp.com",
  projectId: "dudurewa-super-admin",
  storageBucket: "dudurewa-super-admin.appspot.com",
  messagingSenderId: "263290400322",
  appId: "1:263290400322:web:044ed65a6a7ef326f6c7db"
};


const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)