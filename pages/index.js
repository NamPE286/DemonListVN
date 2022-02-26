import AnnoucementPanel from './components/AnnoucementPanel.js';
import JoinDiscordPanel from './components/JoinDiscordPanel.js';
import dynamic from 'next/dynamic'
const Test = dynamic(
  () => import('./components/Main/Mainlist.js'),
  { ssr: false }
)
function App() {
  return (
      <div className='pageContent'>
        <div className='sidePanel' data-aos="fade-right" data-aos-duration="800">
          <div className='topSpacer' />
          <JoinDiscordPanel />
          <AnnoucementPanel />
        </div>
        <Test />
      </div>
  );
}

export default App;
