import AnnoucementPanel from './components/AnnoucementPanel.js';
import JoinDiscordPanel from './components/JoinDiscordPanel.js';
import Navbar from './components/Navbar.js';
import Head from 'next/head';
import Main from './components/Main/Settings.js';

function App() {
  return (
    <>
      <Head>
        <title>Settings - Demon List VN</title>
      </Head>
      <Navbar />
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
