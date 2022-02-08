
function Main(levels) {
  return (
    <div className="mainpanel">
      <h2>Main List</h2>
      <div className="mainpanelContent">
        
      {levels.map((level) => ( 
        <div className='levelCard'>
          <img src={level.thumbnail}></img>
          <div className='fadeEffect'></div>
          <p className='top'>{level.top}</p>
          <div className='levelInfo'>
            <h3>{level.name}</h3>
            <p>by {level.creator}</p>
            <br></br>
            <p>{level.top}</p>
          </div>
        </div>
      ))}
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
    creator: "Hololive JP"
  },
  {
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg",
    top: 2,
    name: "Gawr Gura",
    creator: "Hololive EN"
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/6391518.jpg",
    top: 3,
    name: "Watson Amelia",
    creator: "Hololive EN"
  },
  {
    thumbnail: "https://wallpaperaccess.com/full/4858745.jpg",
    top: 4,
    name: "Minato Aqua",
    creator: "Hololive JP"
  },
];

export default Main;
