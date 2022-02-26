import { collection, getDocs, query, orderBy, enableIndexedDbPersistence } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';

function Main(players) {
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
                    <img src={players[i].bestplay.thumbnail} alt=''></img>
                    <div className="fadeEffect1"></div>
                    <a className="smalltop">#1</a><a><div id="bold">{processTitle(players[0].bestplay.name)}</div>by {processAuthor(players[0].bestplay.creator)} - {players[0].bestplay.point}pt</a>
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

Main.defaultProps = [
  {
    avatar: "https://cdn.donmai.us/original/61/6d/__uruha_rushia_and_piyoko_hololive_drawn_by_ixia_ixia424__616ddf55c52baa0cced4fdb8f3a432b8.png",
    name: "Rushia",
    bestplay: {
      thumbnail: "https://i.imgur.com/BdBy1Ky.png",
      name: "Rushia",
      creator: "Hololive JP",
      point: "1000"
    }
    ,
    point: "1000"
  },
  {
    avatar: "https://yt3.ggpht.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s900-c-k-c0x00ffffff-no-rj",
    name: "Gawr Gura",
    bestplay: {
      thumbnail: "https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg",
      name: "Gawr Gura",
      creator: "Hololive EN",
      point: "1000"
    },
    point: "1000"
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNNN5dgb1PmbjPexSmVtLS2PisLXvvEWMADg&usqp=CAU",
    name: "Amelia",
    bestplay: {
      thumbnail: "https://wallpaperaccess.com/full/6391518.jpg",
      name: "Watson Amelia",
      creator: "Hololive EN",
      point: "1000"
    },
  }
]

export default Main;