import TopplayerPanel from './components/TopplayerPanel.js';
import AnnoucementPanel from './components/AnnoucementPanel.js';
import MainListPanel from './components/MainListPanel.js';
import Main from './components/Main/Submit.js'

function App() {
  return (
      <div className='pageContent'>
        <div className='sidePanel' data-aos="fade-right" data-aos-duration="600">
          <div className='topSpacer' />
          <AnnoucementPanel />
          <TopplayerPanel />
          <MainListPanel/>
        </div>
        <Main />
      </div>
  );
}

export default App;
