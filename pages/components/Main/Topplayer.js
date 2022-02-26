import { collection, getDocs, query, orderBy, enableIndexedDbPersistence } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';

function Main() {
  const [player, setPlayer] = useState([]);
  const lvCol = query(collection(db, 'playerPt'), orderBy("points", "desc"))

  useEffect(() => {
    async function getData() {
      const data = await getDocs(lvCol);
      setPlayer(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="600">
      <h2>Top Player</h2>
      <div className="mainpanelContent">
        {Object.keys(player).map(i => {
          if (i < 3) {
            return (
              <div className="topMostPlayer">
                <section className="sect">
                  <img src={player[i].avatar} alt="" />
                </section>
                <div className="topMostPlayerInfo">
                  <h3>#{parseInt(i) + 1} {player[i].name}</h3>
                  <hr></hr>
                  <p>{player[i].points}pt</p>
                </div>
                <div className="levelThumbWrapper">
                  <section className="levelThumb">
                    <img src={`https://i.ytimg.com/vi/${player[i].bestplayThumbnail}/hqdefault.jpg`} alt=''></img>
                    <div className="fadeEffect1"></div>
                    <a className="smalltop">#1</a><a><div id="bold">{processTitle(player[i].bestplay)}</div>by {processAuthor(player[i].bestplayCreator)} - {player[i].bestplayPt}pt</a>
                  </section>
                </div>
              </div>
            )
          }
          else if (i == 4) {
            return (
              <div className="allPlayer">
                <section>
                  <a id="playerName"></a><a id="playerTotalPoint">Total Point</a><a id="playerBestplay">Best Play</a>
                </section>
                <section className="allPlayerInfo">
                  <a id="playerName">#{parseInt(i) + 1} {player[i].name}</a><a id="playerTotalPoint">{player[i].points}pt</a><a id="playerBestplay">{player[i].bestplay}</a>
                </section>
                {Object.keys(player).map(i => {
                  if (i > 4) {
                    return (
                      <section className="allPlayerInfo">
                        <a id="playerName">#{parseInt(i) + 1} {player[i].name}</a><a id="playerTotalPoint">{player[i].points}pt</a><a id="playerBestplay">{player[i].bestplay}</a>
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