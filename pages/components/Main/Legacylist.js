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
  // Subsequent queries will use persistence, if it was enabled successfully
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="800">
      <h2>Legacy List</h2>
      <div className="mainpanelContent">
        {Object.keys(data).map(a => {
          if (a == data.length - 1) {
            return (
              <div>
                {Object.keys(data[0]).map(i => {
                  if (i < 50) {
                    return (
                      <div className="levelWrapper" key={i}>
                        <div className='levelCard' data-aos="fade-up" data-aos-duration="600">
                          <img src={`https://i.ytimg.com/vi/${data[0][i].thumbnail}/hqdefault.jpg`} alt=""></img>
                          <div className='fadeEffect'></div>
                          <div className='levelInfo'>
                            <h3>{data[0][i].name}</h3>
                            <p>by {data[0][i].creator}</p>
                            <br></br>
                            <p>ID: {data[0][i].lvid}</p>
                            <p>Verified by: {data[0][i].verifier}</p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

// If data == null

export default Main;
