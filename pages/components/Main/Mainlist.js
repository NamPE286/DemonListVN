import levels from "../../../public/levels.js"
import { useState } from 'react';

function Main(levels) {
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="800">
      <h2>Main List</h2>
      <div className="mainpanelContent">
        {Object.keys(levels).map(i => {
          const [open, setOpen] = useState(false)
          function toggle() {
            setOpen(!open)
          }
          //Added Object.keys(levels) to get rid of the error
          //Delete key={i} won't break the website but it will have a not so pretty error in console
          return (
            <div key={i}>
              <div className='levelCard' onClick={toggle} data-aos="fade-up" data-aos-duration="500">
                <img src={`https://i.ytimg.com/vi/${levels[i].thumbnail}/hqdefault.jpg`} alt=""></img>
                <div className='fadeEffect'></div>
                <p className='top'>#{levels[i].top}</p>
                <div className='levelInfo'>
                  <h3>{levels[i].name}</h3>
                  <p>by {levels[i].creator}</p>
                  <br></br>
                  <p>{levels[i].points}pt</p>
                </div>
              </div>
              <div style={{ display: "none" }} style={{ display: open ? "flex" : "none" }}>
                <div className="lvinfo">
                  <iframe width="384" height="216" src="https://www.youtube-nocookie.com/embed/BnkhBwzBqlQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  <div className="verticalLine"></div>
                  <div className="lvinfoContent">
                    <a><b>ID: </b>12345678</a><br></br>
                    <a><b>Verifier: </b>Player Name</a><br></br>
                    <a><b>First Victor: </b>Player Name</a><br></br>
                    <a><b>Rating: </b>Extreme Demon</a><br></br>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// If levels == null

// Points will be pre-calculated when storing data into the-
// database instead of calculating points directly.
// So do 'top' and other props to increase website performance.

// Fetch data from the API next time
Main.defaultProps = levels

export default Main;
