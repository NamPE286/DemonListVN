import '../styles/globals.scss'
import Navbar from './components/Navbar.js'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmzUUZJuNKp9cJZMb1oZsVO7pdHaOim88",
  authDomain: "demon-list-vn.firebaseapp.com",
  projectId: "demon-list-vn",
  storageBucket: "demon-list-vn.appspot.com",
  messagingSenderId: "160004010760",
  appId: "1:160004010760:web:34e34ba411844e8492b2bd",
  measurementId: "G-VGMHYZN5RP"
};

const app = initializeApp(firebaseConfig);

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({})
  }, [])
  // Initialize Firebase
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp