import levels from "../../../public/levels.js"
import { db } from '../../api/firebase-config.js'
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { useState, useEffect } from 'react';
function Main() {
  const [level, setLevel] = useState([]);
  const lvCol = query(collection(db, 'levels'), orderBy("points", "asc"))

  useEffect(() => {
    async function getData() {
      const data = await getDocs(lvCol);
      setLevel(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [])
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="800">
      <h2>Main List</h2>
      <div className="mainpanelContent">
        {Object.keys(level).map(i => {
          //Added Object.keys(levels) to get rid of the error
          //Delete key={i} won't break the website but it will have a not so pretty error in console
          return (
            <div className="levelWrapper" key={i}>
              <div className='levelCard' data-aos="fade-up" data-aos-duration="600">
                <img src={`https://i.ytimg.com/vi/${levels[i].thumbnail}/hqdefault.jpg`} alt=""></img>
                <div className='fadeEffect'></div>
                <p className='top'>#{parseInt(i) + 1}</p>
                <div className='levelInfo'>
                  <h3>{levels[i].name}</h3>
                  <p>by {levels[i].creator}</p>
                  <br></br>
                  <p>{levels[i].points}pt</p>
                </div>
              </div>
              <div>
                <div className="lvinfo" id="lvf">
                  <iframe src="https://www.youtube-nocookie.com/embed/BnkhBwzBqlQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  <div className="verticalLine"></div>
                  <div className="lvinfoContent">
                    <a><b>ID: </b>12345678</a><br></br>
                    <a><b>Verifier: </b>Player Name</a><br></br>
                    <a><b>First Victor: </b>Player Name</a><br></br>
                    <a><b>Rating: </b>Extreme Demon</a><br></br>
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

// If levels == null

// Points will be pre-calculated when storing data into the-
// database instead of calculating points directly.
// So do 'top' and other props to increase website performance.

// Fetch data from the API next time
Main.defaultProps = levels

export default Main;
