import '../styles/globals.scss'
import Navbar from './components/Navbar.js'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Helmet from 'react-helmet';

// Import the functions you need from the SDKs you need


//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({})
  }, [])
  // Initialize Firebase
  return (
    <div className="App">
      <Helmet>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4605218533506777"
          crossOrigin="anonymous"></script>
          <script src="https://itweepinbelltor.com/pfe/current/tag.min.js?z=4969814" data-cfasync="false" async></script>
      </Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />
      <meta name="description" content="Welcome to Demon List VN, this is where we keep track of the 50 hardest demons created and verified by Vietnamese and other Vietnamese players managed to beat one of those levels!" />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp