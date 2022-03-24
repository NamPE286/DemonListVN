import Link from 'next/link'
import {useState} from 'react'
function Navbar() {
  const [open, setOpen] = useState(false)
  function toggle(){
    setOpen(!open)
  }

  return (
    <div className='navbar'>
      <Link href='/'><a className='pageName'>Demon List VN <a id='beta'>Beta</a></a></Link>
      <div className='navItem'>
        <ul>
          <div className='a'>
            <li><Link href='/mainlist'><a>Main List</a></Link></li>
            <li><Link href='/Legacylist'><a>Legacy List</a></Link></li>
            <li><Link href="/players">Top Player</Link></li>
            <li><Link href="/About">About</Link></li>
            <li className='submitBtn'><Link href="/Submit">Submit</Link></li>
          </div>
          <li id="dropdown">
            <button className="dropbtn" onClick={toggle}><img src='dropdownMenu.svg' alt=""></img></button>
            <div className="dropdown-content" style={{display: open?'block':'none'}}>
              <a><Link href='/mainlist'><a>Main List</a></Link></a>
              <a><Link href='/Legacylist'><a>Legacy List</a></Link></a>
              <a><Link href="/players">Top Player</Link></a>
              <a><Link href="/About">About</Link></a>
              <a><Link href="/Submit">Submit</Link></a>
            </div>
          </li>
        </ul>
      </div>
    </div>

  )
}

export default Navbar;
