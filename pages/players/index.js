import AnnoucementPanel from '../components/AnnoucementPanel.js';
import JoinDiscordPanel from '../components/JoinDiscordPanel.js';
import Navbar from '../components/Navbar.js';
import Main from '../components/Main/Topplayer';
function App() {
  return (
    <>
      <head>
        <meta name="google-site-verification" content="X16WBQlc0YO_vA6usdN_KKfX0viP5rG8QVpgN497l84" />
      </head>
      <Navbar />
      <title>Top Players - Demon List VN</title>
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
