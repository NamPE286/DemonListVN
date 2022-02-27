import AnnoucementPanel from './components/AnnoucementPanel.js';
import JoinDiscordPanel from './components/JoinDiscordPanel.js';
import dynamic from 'next/dynamic'
const Main = dynamic(
  () => import('./components/Main/Mainlist.js'),
  { ssr: false }
)
function App() {
  return (
      <div className='pageContent'>
        <div className='sidePanel' data-aos="fade-right" data-aos-duration="800">
          <div className='topSpacer' />
          <amp-ad width="100vw" height="320"
     type="adsense"
     data-ad-client="ca-pub-4605218533506777"
     data-ad-slot="8384269781"
     data-auto-format="rspv"
     data-full-width="">
  <div overflow=""></div>
</amp-ad>
          <JoinDiscordPanel />
          <AnnoucementPanel />
        </div>
        <Main />
      </div>
  );
}

export default App;
