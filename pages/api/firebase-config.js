import {getFirestore, enableIndexedDbPersistence} from "@firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRw1m2AcNCKJ0fMugRsoR8-2axr9xob_w",
  authDomain: "demon-list-vn-test.firebaseapp.com",
  projectId: "demon-list-vn-test",
  storageBucket: "demon-list-vn-test.appspot.com",
  messagingSenderId: "183950928584",
  appId: "1:183950928584:web:2db358198f1f10471313fd"
};

//google analytics

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);