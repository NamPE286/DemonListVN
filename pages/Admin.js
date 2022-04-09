import Navbar from './components/Navbar.js';
import Main from './components/Main/Admin.js';
import Head from 'next/head';

function App() {
  return (
    <>
      <Head>
        <title>Admin - Demon List VN</title>
      </Head>
      <Navbar />
      <div className='pageContent'>
        <div className='sidePanel'>
          <div className='topSpacer' />
        </div>
        <Main />
      </div>
    </>

  );
}

export default App;
