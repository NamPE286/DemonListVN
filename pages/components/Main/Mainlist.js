import { collection, getDocs, query, orderBy, enableIndexedDbPersistence } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';

function Main() {
  const [level, setLevel] = useState([]);
  const lvCol = query(collection(db, 'mainlist'), orderBy("points", "desc"))

  useEffect(() => {
    async function getData() {
      const data = await getDocs(lvCol);
      setLevel(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [])


// Subsequent queries will use persistence, if it was enabled successfully
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="800">
      <h2>Main List</h2>
      <div className="mainpanelContent">
        {Object.keys(level).map(i => {
          //Added Object.keys(level) to get rid of the error
          //Delete key={i} won't break the website but it will have a not so pretty error in console
          return (
            <div className="levelWrapper" key={i}>
              <div className='levelCard' data-aos="fade-up" data-aos-duration="600">
                <img src={`https://i.ytimg.com/vi/${level[i].thumbnail}/hqdefault.jpg`} alt=""></img>
                <div className='fadeEffect'></div>
                <p className='top'>#{parseInt(i) + 1}</p>
                <div className='levelInfo'>
                  <h3>{level[i].name}</h3>
                  <p>by {level[i].creator}</p>
                  <br></br>
                  <p>{level[i].points}pt</p>
                </div>
              </div>
              <div>
                <div className="lvinfo" id="lvf">
                  <iframe src="https://www.youtube-nocookie.com/embed/BnkhBwzBqlQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  <div className="verticalLine"></div>
                  <div className="lvinfoContent">
                    <a><b>ID: </b>{level[i].lvid}</a><br></br>
                    <a><b>Verifier: </b>{level[i].verifier}</a><br></br>
                    <a><b>First Victor: </b>N/a</a><br></br>
                    <a><b>Rating: </b>N/a</a><br></br>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// If level == null

// Points will be pre-calculated when storing data into the-
// database instead of calculating points directly.
// So do 'top' and other props to increase website performance.

// Fetch data from the API next time
export default Main;
