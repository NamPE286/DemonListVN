import AnnoucementPanel from '../components/AnnoucementPanel.js';
import JoinDiscordPanel from '../components/JoinDiscordPanel.js';
import Navbar from '../components/Navbar.js';
import Main from '../components/Main/Mainlist.js';
import Head from 'next/head';

function App() {
  return (
    <>
      <Head>
        <title>Main List - Demon List VN</title>
      </Head>
      <Navbar />
      <div className='pageContent'>
        <div className='sidePanel'>
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
