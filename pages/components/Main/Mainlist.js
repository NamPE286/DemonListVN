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
                  //test
                  if (data[1][i].name != null) {
                    return (
                      <div className="levelWrapper" key={i}>
                        <a href="#!">
                        <div className='levelCard' onClick={toggle_visibility}>
                          <Image src={`https://i.ytimg.com/vi/${data[1][i].thumbnail}/hqdefault.jpg`} alt="" layout="fill" objectFit='cover' priority='true' quality={35}></Image>
                          <div className='fadeEffect'></div>
                          <p className='top'>#{parseInt(i) + 1}</p>
                          <div className='levelInfo'>
                            <h3>{data[1][i].name}</h3>
                            <p>by {data[1][i].creator}</p>
                            <br></br>
                            <p>{data[1][i].points}pt</p>
                          </div>
                        </div>
                        </a>
                        <div>
                          <div className="lvinfo" id={`lvf${i}`}>
                            <iframe
                              src={`https://www.youtube.com/embed/${data[1][i].thumbnail}&autoplay=1`}
                              srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${data[1][i].thumbnail}?autoplay=1><span>▶</span></a>`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                            <div className="verticalLine"></div>
                            <div className="lvinfoContent">
                              <a><b>ID: </b>{data[1][i].id}</a><br></br>
                              <a><b>Verifier: </b>{data[1][i].verifier}</a><br></br>
                              <a><b>Victor: <a href={`/mainlist/${data[1][i].id}`}>Click Here</a></b></a><br></br>
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
