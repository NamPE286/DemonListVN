import Link from 'next/link'

function Navbar() {
  return (
    <div className='navbar'>
      <Link href='/'><a className='pageName'>Demon List VN</a></Link>
      <div className='navItem'>
        <ul>
          <div className='a'>
            <li><Link href='/'><a>Main List</a></Link></li>
            <li><Link href='/Legacylist'><a>Legacy List</a></Link></li>
            <li><Link href="/Topplayer">Top Player</Link></li>
            <li className='submitBtn'><a href='#'>Submit</a></li>
          </div>
          <li id="dropdown">
            <button className="dropbtn"><img src='dropdownMenu.svg'></img></button>
            <div className="dropdown-content">
              <a><Link href='/'><a>Main List</a></Link></a>
              <a><Link href='/Legacylist'><a>Legacy List</a></Link></a>
              <a><Link href="/Topplayer">Top Player</Link></a>
              <a><a href='#'>Submit</a></a>
            </div>
          </li>
        </ul>
      </div>
    </div>

  )
}

export default Navbar;
