import AnnoucementPanel from './components/AnnoucementPanel.js';
import JoinDiscordPanel from './components/JoinDiscordPanel.js';
import Navbar from './components/Navbar.js';

import dynamic from 'next/dynamic'
const Main = dynamic(
  () => import('./components/Main/Submit.js'),
  { ssr: false }
)
function App() {
  return (
    <>
      <Navbar />
      <title>Submit - VN Featured Demons</title>
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
