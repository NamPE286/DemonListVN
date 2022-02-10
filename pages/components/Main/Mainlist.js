function Main(levels) {
  console.log(levels);
  return (
    <div className="mainpanel">
      <h2>Main List</h2>
      <div className="mainpanelContent">
        {Object.keys(levels).map(i => {
          //Added Object.keys(levels) to get rid of the error
          //Delete key={i} won't break the website but it will have a not so pretty error in console
          return (
            <div className='levelCard' key={i}>
              <img src={levels[i].thumbnail} alt=""></img>
              <div className='fadeEffect'></div>
              <p className='top'>#{parseInt(i) + 1}</p>
              <div className='levelInfo'>
                <h3>{levels[i].name}</h3>
                <p>by {levels[i].creator}</p>
                <br></br>
                <p>{levels[i].point}pt</p>
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
Main.defaultProps = [
  {
    thumbnail: "https://i.imgur.com/BdBy1Ky.png",
    name: "Rushia",
    creator: "Hololive JP",
    point: "1000"
  },
  {
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg",
    name: "Gawr Gura",
    creator: "Hololive EN",
    point: "1000"
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/6391518.jpg",
    name: "Watson Amelia",
    creator: "Hololive EN",
    point: "1000"
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/4858745.jpg",
    name: "Minato Aqua",
    creator: "Hololive JP",
    point: "1000"
  },
  {
    thumbnail: "https://i.imgur.com/BdBy1Ky.png",
    name: "Rushia",
    creator: "Hololive JP",
    point: "1000"
  },
  {
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg",
    name: "Gawr Gura",
    creator: "Hololive EN",
    point: "1000"
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/6391518.jpg",
    name: "Watson Amelia",
    creator: "Hololive EN",
    point: "1000"
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/4858745.jpg",
    name: "Minato Aqua",
    creator: "Hololive JP",
    point: "1000"
  },
];

export default Main;
