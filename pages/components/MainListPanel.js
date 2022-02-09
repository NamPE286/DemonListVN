function Main(levels){
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
    return(
        <div className="mainlistPanel">
            <h2>Main List</h2>
            <section>
                <img src={levels[0].thumbnail}></img>
                <div className="fadeEffect1"></div>
                <a className="smalltop">#1</a><a><div id="bold">{processTitle(levels[0].name)}</div>by {processAuthor(levels[0].creator)} - {+(2100/(0.3*(parseInt(1) + 1)+9)-80).toFixed(1)}pt</a>
            </section>
            <section>
                <img src={levels[1].thumbnail}></img>
                <div className="fadeEffect1"></div>
                <a className="smalltop">#2</a><a><div id="bold">{processTitle(levels[1].name)}</div>by {processAuthor(levels[1].creator)} - {+(2100/(0.3*(parseInt(1) + 1)+9)-80).toFixed(1)}pt</a>
            </section>
            <section>
                <img src={levels[2].thumbnail}></img>
                <div className="fadeEffect1"></div>
                <a className="smalltop">#3</a><a><div id="bold">{processTitle(levels[2].name)}</div>by {processAuthor(levels[2].creator)} - {+(2100/(0.3*(parseInt(1) + 1)+9)-80).toFixed(1)}pt</a>
            </section>
            <section>
                <img src={levels[3].thumbnail}></img>
                <div className="fadeEffect1"></div>
                <a className="smalltop">#4</a><a><div id="bold">{processTitle(levels[3].name)}</div>by {processAuthor(levels[3].creator)} - {+(2100/(0.3*(parseInt(1) + 1)+9)-80).toFixed(1)}pt</a>
            </section>
            <section>
                <img src={levels[4].thumbnail}></img>
                <div className="fadeEffect1"></div>
                <a className="smalltop">#5</a><a><div id="bold">{processTitle(levels[4].name)}</div>by {processAuthor(levels[4].creator)} - {+(2100/(0.3*(parseInt(1) + 1)+9)-80).toFixed(1)}pt</a>
            </section>
        </div>
    )
}

Main.defaultProps = [
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
    

export default Main;