function Main(players) {
  function processTitle(s) {
    if (s.length > 7) {
      return s.slice(0, 4) + "...";
    }
    return s;
  }
  function processAuthor(s) {
    if (s.length > 12) {
      return s.slice(0, 12) + "...";
    }
    return s;
  }
  //just making it work first
  const levels = [
    {
      thumbnail: "https://i.imgur.com/BdBy1Ky.png",
      name: "Rushia",
      creator: "Hololive JP",
    },
    {
      thumbnail: "https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg",
      name: "Gawr Gura",
      creator: "Hololive EN",
    },
    {
      thumbnail: "https://wallpaperaccess.com/full/6391518.jpg",
      name: "Watson Amelia",
      creator: "Hololive EN",
    },
    {
      thumbnail: "https://wallpaperaccess.com/full/4858745.jpg",
      name: "Minato Aqua",
      creator: "Hololive JP",
    },
    {
      thumbnail: "https://i.imgur.com/BdBy1Ky.png",
      name: "Rushia",
      creator: "Hololive JP",
    },
    {
      thumbnail: "https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg",
      name: "Gawr Gura",
      creator: "Hololive EN",
    },
    {
      thumbnail: "https://wallpaperaccess.com/full/6391518.jpg",
      name: "Watson Amelia",
      creator: "Hololive EN",
    },
    {
      thumbnail: "https://wallpaperaccess.com/full/4858745.jpg",
      name: "Minato Aqua",
      creator: "Hololive JP",
    },
  ];
  return (
    <div className="mainpanel">
      <h2>Top Player</h2>
      <div className="mainpanelContent">
        <div className="topMostPlayer">
          <section className="sect">
            <img src={players[0].avatar} alt="" />
          </section>
          <div className="topMostPlayerInfo">
            <h3>Player Name</h3>
            <hr></hr>
            <p>{players[0].point}pt</p>
          </div>
          <div className="levelThumbWrapper">
            <section className="levelThumb">
              <img src={levels[0].thumbnail} alt=''></img>
              <div className="fadeEffect1"></div>
              <a className="smalltop">#1</a><a><div id="bold">{processTitle(levels[0].name)}</div>by {processAuthor(levels[0].creator)} - {+(2100 / (0.3 * (parseInt(1) + 1) + 9) - 80).toFixed(1)}pt</a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

Main.defaultProps = [
  {
    avatar: "https://cdn.donmai.us/original/61/6d/__uruha_rushia_and_piyoko_hololive_drawn_by_ixia_ixia424__616ddf55c52baa0cced4fdb8f3a432b8.png",
    name: "Rushia",
    point: "1000"
  },
  {
    avatar: "https://yt3.ggpht.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s900-c-k-c0x00ffffff-no-rj",
    name: "Gawr Gura",
    point: "1000"
  },
  {
    avatar: "https://pbs.twimg.com/profile_images/1318958836120649728/7JHxy2UO.jpg",
    name: "Amelia",
    point: "1000"
  }
]

export default Main;