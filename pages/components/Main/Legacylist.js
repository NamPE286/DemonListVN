import levels from "../../../public/levels.js"
import { db } from '../../api/firebase-config.js'
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { useState, useEffect } from 'react';
function Main() {
  const [level, setLevel] = useState([]);
  const lvCol = query(collection(db, "legacylist"), orderBy("name", "asc"))

  useEffect(() => {
    async function getData() {
      const data = await getDocs(lvCol);
      setLevel(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [])
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="800">
      <h2>Legacy List</h2>
      <div className="mainpanelContent">
        {Object.keys(level).map(i => {
          console.log(level[i])
          //Added Object.keys(levels) to get rid of the error
          //Delete key={i} won't break the website but it will have a not so pretty error in console
          return (
            <div className="levelWrapper" key={i}>
              <div className='levelCard' data-aos="fade-up" data-aos-duration="600">
                <img src={`https://i.ytimg.com/vi/${level[i].thumbnail}/hqdefault.jpg`} alt=""></img>
                <div className='fadeEffect'></div>
                <div className='levelInfo'>
                  <h3>{level[i].name}</h3>
                  <p>by {level[i].creator}</p>
                  <br></br>
                  <p>ID: {level[i].lvid}</p>
                  <p>Verified by: {level[i].verifier}</p>
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
