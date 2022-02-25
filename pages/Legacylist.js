import AnnoucementPanel from './components/AnnoucementPanel.js';
import Main from './components/Main/Legacylist.js';
import JoinDiscordPanel from './components/JoinDiscordPanel.js';

function App() {
  return (
      <div className='pageContent'>
        <div className='sidePanel' data-aos="fade-right" data-aos-duration="800">
          <div className='topSpacer' />
          <JoinDiscordPanel />
          <AnnoucementPanel />
        </div>
        <Main />
      </div>
  );
}

export default App;
