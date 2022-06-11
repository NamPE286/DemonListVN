import Navbar from '../components/Navbar.js';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Main = dynamic(
  () => import('../components/Main/SubmitCheck1.js'),
  { ssr: false }
)
function App() {
  return (
    <>
      <Head>
        <title>Submit Check (DLVN) - Demon List VN</title>
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
