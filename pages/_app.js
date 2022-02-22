import '../styles/globals.scss'
import Navbar from './components/Navbar.js'

function MyApp({ Component, pageProps }) {
  return (

    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
