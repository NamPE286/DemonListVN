import AnnoucementPanel from './components/AnnoucementPanel.js';
import JoinDiscordPanel from './components/JoinDiscordPanel.js';
import Navbar from './components/Navbar.js';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Main = dynamic(
  () => import('./components/Main/Submit.js'),
  { ssr: false }
)
function App() {
  return (
    <>
      <Head>
        <title>Submit - Demon List VN</title>
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
