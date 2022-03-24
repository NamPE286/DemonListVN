import { collection, getDocs, query, orderBy, enableIndexedDbPersistence } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import Image from "next/image";

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
                  function toggle_visibility() {
                    var e = document.getElementById('lvf' + i);
                    try {
                      if (e.style.display == 'block')
                        e.style.display = 'none';
                      else
                        e.style.display = 'block';
                    }
                    catch (err) {
                      e.style.display = 'block';
                    }
                  }
                  //test
                  if (data[0][i].name != null) {
                    return (
                      <div className="levelWrapper" key={i}>
                        <a href="#!">
                        <div className='levelCard' onClick={toggle_visibility}>
                          <Image src={`https://i.ytimg.com/vi/${data[0][i].thumbnail}/hqdefault.jpg`} alt="" layout="fill" objectFit='cover' priority='true' quality={35}></Image>
                          <div className='fadeEffect'></div>
                          <p className='top'>#{parseInt(i) + 1}</p>
                          <div className='levelInfo'>
                            <h3>{data[0][i].name}</h3>
                            <p>by {data[0][i].creator}</p>
                          </div>
                        </div>
                        </a>
                        <div>
                          <div className="lvinfo" id={`lvf${i}`}>
                            <div className="ytVid">
                            <a href={`https://www.youtube.com/watch?v=${data[0][i].thumbnail}`} target="_blank"><span>▶</span></a>
                            </div>
                            <div className="verticalLine"></div>
                            <div className="lvinfoContent">
                              <a><b>ID: </b>{data[0][i].id}</a><br></br>
                              <a><b>Verifier: </b>{data[0][i].verifier}</a><br></br>
                              <a><b>Victor: <a href={`/mainlist/${data[0][i].id}`}>Click Here</a></b></a><br></br>
                            </div>
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
