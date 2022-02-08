
function Navbar() {
  return (
    <div className='navbar'>
      <a className='pageName' href="App.js">Demon List VN</a>
      <div className='navItem'>
        <ul>
          <li><a href="App.js">Main List</a></li>
          <li><a href="Legacylist.js">Legacy List</a></li>
          <li><a href="#">Top Player</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
