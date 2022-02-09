import Navbar from './components/Navbar.js'
import TopplayerPanel from './components/TopplayerPanel.js';
import AnnoucementPanel from './components/AnnoucementPanel.js';
import Main from './components/Main/Mainlist.js'

function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=0.9, user-scalable=no" />
      <Navbar />
      <div className='pageContent'>
        <div className='sidePanel'>
          <div className='topSpacer' />
          <TopplayerPanel />
          <AnnoucementPanel />
        </div>
        <Main />
      </div>
    </div>
  );
}

export default App;