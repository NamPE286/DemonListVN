import Link from 'next/link'

function Navbar() {
  return (
    <div className='navbar'>
      <Link href='/'><a className='pageName'>Demon List VN</a></Link>
      <div className='navItem'>
        <ul>
          <li><Link href='/'><a>Main List</a></Link></li>
          <li><Link href='/Legacylist'><a>Legacy List</a></Link></li>
          <li><Link href="/Topplayer">Top Player</Link></li>
          <li className='submitBtn'><a href='#'>Submit</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
