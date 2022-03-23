import AnnoucementPanel from './components/AnnoucementPanel.js';
import JoinDiscordPanel from './components/JoinDiscordPanel.js';
import Navbar from './components/Navbar.js';
import Main from './components/Main/Legacylist';
function App() {
  return (
    <>
      <Navbar />
      <title>Legacy List - Demon List VN</title>
      <div className='pageContent'>
        <div className='sidePanel' data-aos="fade-right" data-aos-duration="800">
          <div className='topSpacer' />
          <JoinDiscordPanel />
          <AnnoucementPanel />
        </div>
        <Main />
      </div>
    </>

  );
}

export default App;
