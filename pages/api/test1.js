import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from './firebase-config.js'

var a = [];
const data = query(collection(db, 'levels'), orderBy("top", "asc"))
onSnapshot(data, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
        a.push(doc.data());
    });
});

