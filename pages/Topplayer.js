import Navbar from './components/Navbar.js'
import Side from './components/Side.js'
import Main from './components/Main/Topplayer.js'

function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=0.9, user-scalable=no"/>
      <Navbar />
      <div className='pageContent'>
        <Side />
        <Main />
      </div>
    </div>
  );
}

export default App;