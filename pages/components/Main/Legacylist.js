import { getDoc, doc } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import Image from "next/image";

function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {

      const lvRef = doc(db, "FDLVNLegacy", "list")
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

  function showAds(i){
    if(i == 2){
    return(
      <div id="container-ad80a2f0f05651f1a5916edbc7b4e0ab"></div>
    )
    }
  }
  function getRandomLevel(){
    var random = Math.floor(Math.random() * Object.keys(data).length);
    var lv = data[random]
    window.location.href = `/Legacylist/${lv.id}`
  }
  // Subsequent queries will use persistence, if it was enabled successfully
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />
      <div className="mainpanel">
        <h2>Legacy List</h2>
        <div className="mainpanelContent">
          <a href="#!" onClick={getRandomLevel}>
            <div className="randomBtn">
              <p>Pick a random level</p>
            </div>
          </a>
          {Object.keys(data).map(i => {
            if (data[i].name != null) {
                return (
                  <>
                  <div className="levelWrapper" key={i}>
                    <a href={`/Legacylist/${data[i].id}`}>
                      <div className='levelCard'>
                        <Image src={`https://i.ytimg.com/vi/${data[i].thumbnail}/hqdefault.jpg`} alt="" layout="fill" objectFit='cover' loading='lazy' quality={35}></Image>
                        <div className='fadeEffect'></div>
                        <div className='levelInfo'>
                          <h3>{data[i].name}</h3>
                          <p>by {data[i].creator}</p>
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
