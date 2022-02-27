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
      <h2>Main List</h2>
      <div className="mainpanelContent">
        {Object.keys(data).map(a => {
          if (a == data.length - 1) {
            return (
              <div>
                {Object.keys(data[1]).map(i => {
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
                  return (
                    <div className="levelWrapper" key={i}>
                      <div className='levelCard' data-aos="fade-up" data-aos-duration="600" onClick={toggle_visibility}>
                        <img src={`https://i.ytimg.com/vi/${data[1][i].thumbnail}/hqdefault.jpg`} alt=""></img>
                        <div className='fadeEffect'></div>
                        <p className='top'>#{parseInt(i) + 1}</p>
                        <div className='levelInfo'>
                          <h3>{data[1][i].name}</h3>
                          <p>by {data[1][i].creator}</p>
                          <br></br>
                          <p>{data[1][i].points}pt</p>
                        </div>
                      </div>
                      <div>
                        <div className="lvinfo" id={`lvf${i}`}>
                          <iframe src={`https://www.youtube-nocookie.com/embed/${data[1][i].thumbnail}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          <div className="verticalLine"></div>
                          <div className="lvinfoContent">
                            <a><b>ID: </b>{data[1][i].lvid}</a><br></br>
                            <a><b>Verifier: </b>{data[1][i].verifier}</a><br></br>
                            <a><b>First Victor: </b>N/a</a><br></br>
                            <a><b>Rating: </b>N/a</a><br></br>
                          </div>
                        </div>
                      </div>
                    </div>

                  )
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
