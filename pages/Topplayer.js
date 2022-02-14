import Navbar from './components/Navbar.js'
import MainListPanel from './components/MainListPanel.js';
import AnnoucementPanel from './components/AnnoucementPanel.js';
import Main from './components/Main/Topplayer.js'

function App() {
  return (
      <div className='pageContent'>
        <div className='sidePanel'>
          <div className='topSpacer' />
          <MainListPanel />
          <AnnoucementPanel />
        </div>
        <Main />
      </div>
  );
}

export default App;
