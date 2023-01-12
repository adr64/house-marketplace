import { initializeApp } from "firebase/app";
import { getFirestore } from  "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB41OHd59sWOCbyBVUWbVQGTuWLPIW1-kM",
  authDomain: "house-marketplace-app-ca455.firebaseapp.com",
  projectId: "house-marketplace-app-ca455",
  storageBucket: "house-marketplace-app-ca455.appspot.com",
  messagingSenderId: "1037336029614",
  appId: "1:1037336029614:web:3aea846212bf335616c03f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()