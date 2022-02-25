import {getFirestore, enableIndexedDbPersistence} from "@firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBmzUUZJuNKp9cJZMb1oZsVO7pdHaOim88",
  authDomain: "demon-list-vn.firebaseapp.com",
  projectId: "demon-list-vn",
  storageBucket: "demon-list-vn.appspot.com",
  messagingSenderId: "160004010760",
  appId: "1:160004010760:web:34e34ba411844e8492b2bd",
  measurementId: "G-VGMHYZN5RP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);