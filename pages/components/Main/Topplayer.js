import { collection, getDocs, query, orderBy, enableIndexedDbPersistence } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';

function Main() {
  const test = []
  const [data, setData] = useState(test);
  const lvCol = query(collection(db, "data"))

  useEffect(() => {
    async function getData() {
      const data = await getDocs(lvCol);
      setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [])

  function processTitle(s) {
    if (s.length > 8) {
      return s.slice(0, 6) + "...";
    }
    return s;
  }
  function processAuthor(s) {
    if (s.length > 8) {
      return s.slice(0, 6) + "...";
    }
    return s;
  }
  console.log(data[3])
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="600">
      <h2>Top Player</h2>
      <div className="mainpanelContent">
        {Object.keys(data).map(i => {
          if (i < 3) {
            return (
              <div className="topMostPlayer">
                <section className="sect">
                  <img src={data[3][i].avatar} alt="" />
                </section>
                <div className="topMostPlayerInfo">
                  <h3>#{parseInt(i) + 1} {data[3][i].name}</h3>
                  <hr></hr>
                  <p>{data[3][i].points}pt</p>
                </div>
                <div className="levelThumbWrapper">
                  <section className="levelThumb">
                    <img src={`https://i.ytimg.com/vi/${data[3][i].bestplayThumbnail}/hqdefault.jpg`} alt=''></img>
                    <div className="fadeEffect1"></div>
                    <a className="smalltop">#1</a><a><div id="bold">{processTitle(data[3][i].bestplay)}</div>by {processAuthor(data[3][i].bestplayCreator)} - {data[3][i].bestplayPt}pt</a>
                  </section>
                </div>
              </div>
            )
          }
          else if (i == 3) {
            return (
              <div className="allPlayer">
                <section>
                  <a id="playerName"></a><a id="playerTotalPoint">Total Point</a><a id="playerBestplay">Best Play</a>
                </section>
                <section className="allPlayerInfo">
                  <a id="playerName">#{parseInt(i) + 1} {data[3][i].name}</a><a id="playerTotalPoint">{data[3][i].points}pt</a><a id="playerBestplay">{data[3][i].bestplay}</a>
                </section>
                {Object.keys(data[3]).map(i => {
                  if (i > 3) {
                    return (
                      <section className="allPlayerInfo">
                        <a id="playerName">#{parseInt(i) + 1} {data[3][i].name}</a><a id="playerTotalPoint">{data[3][i].points}pt</a><a id="playerBestplay">{data[3][i].bestplay}</a>
                      </section>
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

export default Main;