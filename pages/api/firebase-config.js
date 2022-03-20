import {getFirestore, enableIndexedDbPersistence} from "@firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBmzUUZJuNKp9cJZMb1oZsVO7pdHaOim88",
  authDomain: "demon-list-vn.firebaseapp.com",
  projectId: "demon-list-vn",
  storageBucket: "demon-list-vn.appspot.com",
  messagingSenderId: "160004010760",
  appId: "1:160004010760:web:34e34ba411844e8492b2bd",
  measurementId: "G-VGMHYZN5RP"
};

//google analytics

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();
export const db = getFirestore(app);