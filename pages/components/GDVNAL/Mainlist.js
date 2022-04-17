import { getDoc, doc } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Head from "next/head";

function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {

      const lvRef = doc(db, "data", "GDVNAL")
      const docSnap = await getDoc(lvRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getData()
  }, [])


  // Subsequent queries will use persistence, if it was enabled successfully
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />

      <div className="mainpanel">
        <h2>GDVN Achievement List</h2>
        <div className="mainpanelContent">
          {Object.keys(data).map(i => {
            if (data[i].name != null) {
                return (
                  <>
                  <div className="levelWrapper" key={i}>
                    <a href={`/GDVNAL/${data[i].id}`}>
                      <div className='levelCard'>
                        <Image src={`https://i.ytimg.com/vi/${data[i].thumbnail}/hqdefault.jpg`} alt="" layout="fill" objectFit='cover' priority='true' quality={35}></Image>
                        <div className='fadeEffect'></div>
                        <p className='top'>#{parseInt(i) + 1}</p>
                        <div className='levelInfo'>
                          <h3>{data[i].name}</h3>
                          <p>by {data[i].creator}</p>
                          <br/>
                          <p>{data[i].points}pt</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  </>
                )
              
            }
          })}
        </div>
      </div>
    </>
  )
}


// If data == null

export default Main;
