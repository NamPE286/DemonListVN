import { getDoc, doc } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Head from "next/head";

function Main() {
  const [data, setData] = useState([]);
  const [data0, setData0] = useState([]);
  const [mode, setMode] = useState('mainlist');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {

      const lvRef = doc(db, "data", 'mainlist')
      const docSnap = await getDoc(lvRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      const lvRef0 = doc(db, "data", 'GDVNAL')
      const docSnap0 = await getDoc(lvRef0);

      if (docSnap0.exists()) {
        setData0(docSnap0.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      setLoading(true);
    }
    getData()
  }, [loading])

  function showList() {
    if (mode === 'mainlist') {
      try {
        document.getElementById('ab').style.background = 'var(--a2)';
        document.getElementById('ac').style.background = 'none';
      }
      catch (err) {
      }

      return (
        <>
          <div className="mainpanelContent">
            {Object.keys(data).map(i => {
              if (data[i].name != null) {
                return (
                  <>
                    <div className="levelWrapper" key={i}>
                      <a href={`/mainlist/${data[i].id}`}>
                        <div className='levelCard'>
                          <Image src={`https://i.ytimg.com/vi/${data[i].thumbnail}/hqdefault.jpg`} alt="" layout="fill" objectFit='cover' loading='lazy' quality={35}></Image>
                          <div className='fadeEffect'></div>
                          <p className='top'>#{parseInt(i) + 1}</p>
                          <div className='levelInfo'>
                            <h3>{data[i].name}</h3>
                            <p>by {data[i].creator}</p>
                            <br />
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
        </>
      )
    }
    else if (mode === 'GDVNAL') {
      try{
        document.getElementById('ab').style.background = 'none';
        document.getElementById('ac').style.background = 'var(--a2)';  
      }
      catch(err){}
      return (
        <>
          <div className="mainpanelContent">
            {Object.keys(data0).map(i => {
              if (data0[i].name != null) {
                return (
                  <>
                    <div className="levelWrapper" key={i}>
                      <a href={`/GDVNAL/${data0[i].id}`}>
                        <div className='levelCard'>
                          <Image src={`https://i.ytimg.com/vi/${data0[i].thumbnail}/hqdefault.jpg`} alt="" layout="fill" objectFit='cover' loading='lazy' quality={35}></Image>
                          <div className='fadeEffect'></div>
                          <p className='top'>#{parseInt(i) + 1}</p>
                          <div className='levelInfo'>
                            <h3>{data0[i].name}</h3>
                            <p>by {data0[i].creator}</p>
                            <br />
                            <p>{data0[i].points}pt</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </>
                )

              }
            })}
          </div>
        </>
      )
    }
  }

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />

      <div className="mainpanel">
        <h2 id="title">Main List</h2>
        <div>
        <div className="submitSelect">
          <a href="#!" id="ab" onClick={() => setMode('mainlist')} style={{background:"var(--a2)"}}>Featured List</a>
          <a href="#!" id="ac" onClick={() => setMode('GDVNAL')} >Demon List</a>
        </div>
        <hr id='lineUnderBtn'></hr>
        </div>
        {showList()}
      </div>
    </>
  )
}



// If data == null

export default Main;
