import TopplayerPanel from './components/TopplayerPanel.js';
import AnnoucementPanel from './components/AnnoucementPanel.js';
import Main from './components/Main/Mainlist.js'

function App() {
  return (
      <div className='pageContent'>
        <div className='sidePanel'>
          <div className='topSpacer' />
          <TopplayerPanel />
          <AnnoucementPanel />
        </div>
        <Main />
      </div>
  );
}

export default App;
