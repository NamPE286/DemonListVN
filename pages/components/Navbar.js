import Link from 'next/link'

function Navbar() {
  return (
    <div className='navbar'>
      <a className='pageName' href="App.js">Demon List VN</a>
      <div className='navItem'>
        <ul>
          <li><Link href='/'><a>Main List</a></Link></li>
          <li><Link href='/Legacylist'><a>Legacy List</a></Link></li>
          <li><Link href="/Topplayer">Top Player</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
