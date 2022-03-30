import {getDoc, doc} from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import Image from "next/image";

function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {

      const lvRef = doc(db, "data", "mainlist")
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
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="800">
      <h2>Main List</h2>
      <div className="mainpanelContent">
        {Object.keys(data).map(i => {
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
          if (data[i].name != null) {
            return (
              <div className="levelWrapper" key={i}>
                <a href="#!">
                  <div className='levelCard' onClick={toggle_visibility}>
                    <Image src={`https://i.ytimg.com/vi/${data[i].thumbnail}/hqdefault.jpg`} alt="" layout="fill" objectFit='cover' priority='true' quality={35}></Image>
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
                <div>
                  <div className="lvinfo" id={`lvf${i}`}>
                    <div className="ytVid">
                      <a href={`https://www.youtube.com/watch?v=${data[i].thumbnail}`} target="_blank"><span>▶</span></a>
                    </div>
                    <div className="verticalLine"></div>
                    <div className="lvinfoContent">
                      <a><b>ID: </b>{data[i].id}</a><br></br>
                      <a><b>Verifier: </b>{data[i].verifier}</a><br></br>
                      <a><b>Victor: <a href={`/mainlist/${data[i].id}`}>Click Here</a></b></a><br></br>
                    </div>
                  </div>
                </div>
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
