import './styles/styles.css';
import Navbar from './components/Navbar.js'
import Side from './components/Side.js'
import Main from './components/Main.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='pageContent'>
        <Side />
        <Main />
      </div>
    </div>
  );
}

export default App;
