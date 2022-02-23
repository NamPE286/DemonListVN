import {db} from '../firebase-config.js'
import {collection, getDocs} from "firebase/firestore"
import { useState, useEffect } from 'react';


function main() {
    var a = [];
    const [level, setLevel] = useState([]);
    const lvCol = collection(db, "testdata");

    useEffect(() => {
      async function getData() {
        const data = await getDocs(lvCol);
        setLevel(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        level.map(lv => 
            a.push(lv)
        )
        console.log(a)
      };
      getData();
    }, [])
}

export default main;