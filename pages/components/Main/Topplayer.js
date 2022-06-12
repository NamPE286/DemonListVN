import { getDoc, doc } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';

function Main() {
  var m = 'mainlist'
  if (typeof window !== 'undefined') {
    m = localStorage.getItem('mode')
    if (m === null) {
      m = 'mainlist'
    }
  }
  const [data, setData] = useState([]);
  const [data0, setData0] = useState([]);
  const [mode, setMode] = useState(m)

  useEffect(() => {
    async function getData() {

      const lvRef = doc(db, "FDLVNPlayer", "list")
      const docSnap = await getDoc(lvRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      const lvRef0 = doc(db, "DLVNPlayer", "list")
      const docSnap0 = await getDoc(lvRef0);

      if (docSnap0.exists()) {
        setData0(docSnap0.data());
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
  function showContent() {
    if (mode == 'mainlist') {
      try {
        document.getElementById('ab').style.background = 'var(--a2)';
        document.getElementById('ac').style.background = 'none';
      }
      catch (err) {
      }
      return (
        <div className="mainpanelContent">
          {Object.keys(data).map(i => {
            if (i < 3) {
              return (
                <a href={`/players/${data[i].name}?mode=0`}>
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
                    <a id="playerName" href={`/players/${data[i].name}?mode=0`}>#{parseInt(i) + 1} {data[i].name}</a><a id="playerTotalPoint">{data[i].points}pt</a><a id="playerBestplay">{data[i].bestplay}</a>
                  </section>
                  {Object.keys(data).map(i => {
                    if (i > 3) {
                      return (
                        <section className="allPlayerInfo">
                          <a id="playerName" href={`/players/${data[i].name}?mode=0`}>#{parseInt(i) + 1} {data[i].name}</a><a id="playerTotalPoint">{data[i].points}pt</a><a id="playerBestplay">{data[i].bestplay}</a>
                        </section>
                      )
                    }
                  })}
                </div>
              )
            }
          })}

        </div>
      )
    }
    else if (mode == 'GDVNAL') {
      try{
        document.getElementById('ab').style.background = 'none';
        document.getElementById('ac').style.background = 'var(--a2)';  
      }
      catch(err){}
      return (
        <div className="mainpanelContent">
          {Object.keys(data0).map(i => {
            if (i < 3) {
              return (
                <a href={`/players/${data0[i].name}?mode=1`}>
                  <div className="topMostPlayer">
                    <section className="sect">
                      <img src={data0[i].avatar} alt="" />
                    </section>
                    <div className="topMostPlayerInfo">
                      <h3>#{parseInt(i) + 1} {data0[i].name}</h3>
                      <hr id="topplayerLine"></hr>
                      <p>{data0[i].points}pt <p>Best Play: {processTitle(data0[i].bestplay)} by {processAuthor(data0[i].bestplayCreator)}</p></p>
                    </div>
                    <div className="levelThumbWrapper">
                      <section className="levelThumb">
                        <img src={`https://i.ytimg.com/vi/${data0[i].bestplayThumbnail}/hqdefault.jpg`} alt=''></img>
                        <div className="fadeEffect1"></div>
                        <a><div id="bold">{processTitle(data0[i].bestplay)}</div>by {processAuthor(data0[i].bestplayCreator)} - {data0[i].bestplayPt}pt</a>
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
                    <a id="playerName" href={`/players/${data0[i].name}?mode=1`}>#{parseInt(i) + 1} {data0[i].name}</a><a id="playerTotalPoint">{data0[i].points}pt</a><a id="playerBestplay">{data0[i].bestplay}</a>
                  </section>
                  {Object.keys(data0).map(i => {
                    if (i > 3) {
                      return (
                        <section className="allPlayerInfo">
                          <a id="playerName" href={`/players/${data0[i].name}?mode=1`}>#{parseInt(i) + 1} {data0[i].name}</a><a id="playerTotalPoint">{data0[i].points}pt</a><a id="playerBestplay">{data0[i].bestplay}</a>
                        </section>
                      )
                    }
                  })}
                </div>
              )
            }
          })}

        </div>
      )
    }
  }
  return (
    <div className="mainpanel">
      <h2 id="title">Top Player</h2>
      <div className="submitSelect">
            <a href="#!" id="ab" onClick={() => {
              setMode('mainlist')
              if (typeof window !== 'undefined') {
                localStorage.setItem('mode', 'mainlist')
              }
            }} style={{ background: "var(--a2)" }}>Featured List</a>
            <a href="#!" id="ac" onClick={() => {
              setMode('GDVNAL')
              if (typeof window !== 'undefined') {
                localStorage.setItem('mode', 'GDVNAL')
              }
            }} >Demon List</a>
          </div>
          <hr id='lineUnderBtn'></hr>
      {showContent()}
    </div>

  )
}

export default Main;