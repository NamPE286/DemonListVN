import AnnoucementPanel from './components/AnnoucementPanel.js';
import Main from './components/Main/About.js';
import JoinDiscordPanel from './components/JoinDiscordPanel.js';

function App() {
  return (
      <div className='pageContent'>
        <div className='sidePanel' data-aos="fade-right" data-aos-duration="800">
          <div className='topSpacer' />
        </div>
        <Main />
      </div>
  );
}

export default App;
