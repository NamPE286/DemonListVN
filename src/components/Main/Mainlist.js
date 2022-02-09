function Main(levels) {
  return (
    <div className="mainpanel">
      <h2>Main List</h2>
      <div className="mainpanelContent">
        {Object.keys(levels).map(i => {
          //Added Object.keys(levels) to get rid of the error
          //Delete key={i} won't break the website but it will have a not so pretty error in console
          return (
            <div className='levelCard' key={i}>
              <img src={levels[i].thumbnail}></img>
              <div className='fadeEffect'></div>
              <p className='top'>#{parseInt(i) + 1}</p>
              <div className='levelInfo'>
                <h3>{levels[i].name}</h3>
                <p>by {levels[i].creator}</p>
                <br></br>
                <p>{+(2100/(0.3*levels[i].top+9)-80).toFixed(1)}pt</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// If levels == null

Main.defaultProps = [
  {
    thumbnail: "https://i.imgur.com/BdBy1Ky.png",
    top: 1,
    name: "Rushia",
    creator: "Hololive JP",
  },
  {
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg",
    top: 2,
    name: "Gawr Gura",
    creator: "Hololive EN",
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/6391518.jpg",
    top: 3,
    name: "Watson Amelia",
    creator: "Hololive EN",
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/4858745.jpg",
    top: 4,
    name: "Minato Aqua",
    creator: "Hololive JP",
  {
    thumbnail: "https://i.imgur.com/BdBy1Ky.png",
    top: 5,
    name: "Rushia",
    creator: "Hololive JP",
  },
  {
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg",
    top: 6,
    name: "Gawr Gura",
    creator: "Hololive EN",
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/6391518.jpg",
    top: 7,
    name: "Watson Amelia",
    creator: "Hololive EN",
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/4858745.jpg",
    top: 8,
    name: "Minato Aqua",
    creator: "Hololive JP",
  },
];

export default Main;
