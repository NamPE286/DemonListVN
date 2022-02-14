function Main(players) {
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
    <div className="mainpanel">
      <h2>Top Player</h2>
      <div className="mainpanelContent">
        <div className="topMostPlayer">
          <section className="sect">
            <img src={players[0].avatar} alt="" />
          </section>
          <div className="topMostPlayerInfo">
            <h3>#1 {players[0].name}</h3>
            <hr></hr>
            <p>{players[0].point}pt</p>
          </div>
          <div className="levelThumbWrapper">
            <section className="levelThumb">
              <img src={players[0].bestplay.thumbnail} alt=''></img>
              <div className="fadeEffect1"></div>
              <a className="smalltop">#1</a><a><div id="bold">{processTitle(players[0].bestplay.name)}</div>by {processAuthor(players[0].bestplay.creator)} - {players[0].bestplay.point}pt</a>
            </section>
          </div>
        </div>

        <div className="topMostPlayer">
          <section className="sect">
            <img src={players[1].avatar} alt="" />
          </section>
          <div className="topMostPlayerInfo">
            <h3>#1 {players[1].name}</h3>
            <hr></hr>
            <p>{players[1].point}pt</p>
          </div>
          <div className="levelThumbWrapper">
            <section className="levelThumb">
              <img src={players[1].bestplay.thumbnail} alt=''></img>
              <div className="fadeEffect1"></div>
              <a className="smalltop">#1</a><a><div id="bold">{processTitle(players[1].bestplay.name)}</div>by {processAuthor(players[1].bestplay.creator)} - {players[1].bestplay.point}pt</a>
            </section>
          </div>
        </div>

        <div className="topMostPlayer">
          <section className="sect">
            <img src={players[2].avatar} alt="" />
          </section>
          <div className="topMostPlayerInfo">
            <h3>#1 {players[2].name}</h3>
            <hr></hr>
            <p>{players[2].point}pt</p>
          </div>
          <div className="levelThumbWrapper">
            <section className="levelThumb">
              <img src={players[2].bestplay.thumbnail} alt=''></img>
              <div className="fadeEffect1"></div>
              <a className="smalltop">#1</a><a><div id="bold">{processTitle(players[2].bestplay.name)}</div>by {processAuthor(players[2].bestplay.creator)} - {players[2].bestplay.point}pt</a>
            </section>
          </div>
        </div>

        <div className="allPlayer">
          <section>
            <a id="playerName"></a><a id="playerTotalPoint">Total Point</a><a id="playerBestplay">Best Play</a>
          </section>
          <section className="allPlayerInfo">
            <a id="playerName">#1 Player name</a><a id="playerTotalPoint">1000pt</a><a id="playerBestplay">Level Name</a>
          </section>
        </div>
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
    avatar: "https://pbs.twimg.com/profile_images/1318958836120649728/7JHxy2UO.jpg",
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