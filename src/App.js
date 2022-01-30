import './styles/styles.css';

function App() {
  return (
    <div className="App">
      <div className='navbar'>
        <a className='pageName'>Demon List VN</a>
        <div className='navItem'>
          <ul>
            <li><a>Main List</a></li>
            <li><a>Legacy List</a></li>
            <li><a>Top Player</a></li>
          </ul>
        </div>
      </div>
      <div className='pageContent'>
        <div className='sidePanel'>
          <div className='topplayerPanel'>
            <h2>Top Player</h2>
          </div>
        </div>
        <div className='mainpanel'>
          <h2>Main List</h2>
          <div className='mainpanelContent'>
            <p>Sample content</p>
            <p>Sample content</p>
            <p>Sample content</p>
            <p>Sample content</p>
            <p>Sample content</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
