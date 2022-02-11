import Navbar from './components/Navbar.js'
import MainListPanel from './components/MainListPanel.js';
import AnnoucementPanel from './components/AnnoucementPanel.js';
import Main from './components/Main/Topplayer.js'

function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=0.85, user-scalable=no" />
      <Navbar />
      <div className='pageContent'>
        <div className='sidePanel'>
          <div className='topSpacer' />
          <MainListPanel />
          <AnnoucementPanel />
        </div>
        <Main />
      </div>
    </div>
  );
}

export default App;