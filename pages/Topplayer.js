import MainListPanel from './components/MainListPanel.js';
import AnnoucementPanel from './components/AnnoucementPanel.js';
import TopplayerPanel from './components/TopplayerPanel.js';
import Main from './components/Main/Topplayer.js'

function App() {
  return (
      <div className='pageContent'>
        <div className='sidePanel' data-aos="fade-right" data-aos-duration="600">
          <div className='topSpacer' />
          <MainListPanel/>
          <TopplayerPanel />
          <AnnoucementPanel />
        </div>
        <Main />
      </div>
  );
}

export default App;
