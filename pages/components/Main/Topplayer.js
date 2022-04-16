import { getDoc, doc } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';

function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {

      const lvRef = doc(db, "data", "playerPt")
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

  function processTitle(s) {
    if (s.length > 13) {
      return s.slice(0, 11) + "...";
    }
    return s;
  }
  function processAuthor(s) {
    if (s.length > 10) {
      return s.slice(0, 8) + "...";
    }
    return s;
  }
  return (
    <div className="mainpanel">
      <h2>Top Player</h2>
      <div className="mainpanelContent">
        {Object.keys(data).map(i => {
          if (i < 3) {
            return (
              <a href={`/players/${data[i].name}`}>
                <div className="topMostPlayer">
                  <section className="sect">
                    <img src={data[i].avatar} alt="" />
                  </section>
                  <div className="topMostPlayerInfo">
                    <h3>#{parseInt(i) + 1} {data[i].name}</h3>
                    <hr id="topplayerLine"></hr>
                    <p>{data[i].points}pt <p>Best Play: {processTitle(data[i].bestplay)} by {processAuthor(data[i].bestplayCreator)}</p></p>
                  </div>
                  <div className="levelThumbWrapper">
                    <section className="levelThumb">
                      <img src={`https://i.ytimg.com/vi/${data[i].bestplayThumbnail}/hqdefault.jpg`} alt=''></img>
                      <div className="fadeEffect1"></div>
                      <a><div id="bold">{processTitle(data[i].bestplay)}</div>by {processAuthor(data[i].bestplayCreator)} - {data[i].bestplayPt}pt</a>
                    </section>
                  </div>
                </div>
              </a>

            )
          }
          else if (i == 3) {
            return (
              <div className="allPlayer">
                <section>
                  <a id="playerName"></a><a id="playerTotalPoint">Total Point</a><a id="playerBestplay">Best Play</a>
                </section>
                <section className="allPlayerInfo">
                  <a id="playerName" href={`/players/${data[i].name}`}>#{parseInt(i) + 1} {data[i].name}</a><a id="playerTotalPoint">{data[i].points}pt</a><a id="playerBestplay">{data[i].bestplay}</a>
                </section>
                {Object.keys(data).map(i => {
                  if (i > 3) {
                    return (
                      <section className="allPlayerInfo">
                        <a id="playerName" href={`/players/${data[i].name}`}>#{parseInt(i) + 1} {data[i].name}</a><a id="playerTotalPoint">{data[i].points}pt</a><a id="playerBestplay">{data[i].bestplay}</a>
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