import TopplayerPanel from './TopplayerPanel.js';
import AnnoucementPanel from './AnnoucementPanel.js';

function Side() {
  return (
    <div className='sidePanel'>
      <div className='topSpacer'/>
      <TopplayerPanel />
      <AnnoucementPanel />
    </div>
  )
}

export default Side

