import '../styles/globals.scss'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

// Import the functions you need from the SDKs you need


//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({})
  }, [])
  // Initialize Firebase
  return (
    <>
      <div className="App">
        <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />
        <meta name="description" content="Welcome to Demon List VN, this is where we keep track of the hardest demons created, verified and beaten by Vietnamese and" />
        <ThemeProvider defaultTheme="dark">
          <Component {...pageProps} />
        </ThemeProvider>
      </div>
    </>

  )
}

export default MyApp
