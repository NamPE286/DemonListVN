import { collection, getDocs, query, orderBy, enableIndexedDbPersistence } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';

function Main() {
  const [data, setData] = useState([]);
  const lvCol = query(collection(db, "data"))

  useEffect(() => {
    async function getData() {
      const data = await getDocs(lvCol);
      setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [])
  console.log(data[1])

  // Subsequent queries will use persistence, if it was enabled successfully
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="800">
      <h2>Main List</h2>
      <div className="mainpanelContent">
      {Object.keys(data).map(i => {
          console.log(data[1][i])
          //Added Object.keys(datas) to get rid of the error
          //Delete key={i} won't break the website but it will have a not so pretty error in console
          return (
            <div className="levelWrapper" key={i}>
              <div className='levelCard' data-aos="fade-up" data-aos-duration="600">
                <img src={`https://i.ytimg.com/vi/${data[1][i].thumbnail}/hqdefault.jpg`} alt=""></img>
                <div className='fadeEffect'></div>
                <div className='levelInfo'>
                  <h3>{data[1][i].name}</h3>
                  <p>by {data[1][i].creator}</p>
                  <br></br>
                  <p>ID: {data[1][i].lvid}</p>
                  <p>Verified by: {data[1][i].verifier}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// If data == null

export default Main;
