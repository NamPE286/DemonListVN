import './styles/styles.css';

function App() {
  return (
    <div className="App">
      <div className='navbar'>
        <a className='pageName'>Demon List VN</a>
        <div className='navItem'>
          <ul>
            <li><a>Main List</a></li>
            <li><a>Legacy List</a></li>
            <li><a>Top Player</a></li>
          </ul>
        </div>
      </div>
      <div className='pageContent'>
        <div className='sidePanel'>
          <div className='topplayerPanel'>
            <h2>Top Player</h2>
          </div>
        </div>
        <div className='mainpanel'>
          <h2>Main List</h2>
          <div className='mainpanelContent'>
            <div className='levelCard'>
              <img src='https://i.imgur.com/BdBy1Ky.png'></img>
              <div className='fadeEffect'></div>
              <p className='top'>#1</p>
              <div className='levelInfo'>
                <h3>Level Name</h3>
                <p>by Creator</p>
                <br></br>
                <p>1000pt</p>
              </div>
            </div>
            <div className='levelCard'>
              <img src='https://c4.wallpaperflare.com/wallpaper/262/965/121/gawr-gura-anime-girls-water-hd-wallpaper-preview.jpg'></img>
              <div className='fadeEffect'></div>
              <p className='top'>#2</p>
              <div className='levelInfo'>
                <h3>Level Name</h3>
                <p>by Creator</p>
                <br></br>
                <p>1000pt</p>
              </div>
            </div>
            <div className='levelCard'>
              <img src='https://wallpaperaccess.com/full/6391518.jpg'></img>
              <div className='fadeEffect'></div>
              <p className='top'>#3</p>
              <div className='levelInfo'>
                <h3>Level Name</h3>
                <p>by Creator</p>
                <br></br>
                <p>1000pt</p>
              </div>
            </div>
            <div className='levelCard'>
              <img src='https://wallpaperaccess.com/full/4858745.jpg'></img>
              <div className='fadeEffect'></div>
              <p className='top'>#4</p>
              <div className='levelInfo'>
                <h3>Level Name</h3>
                <p>by Creator</p>
                <br></br>
                <p>1000pt</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
