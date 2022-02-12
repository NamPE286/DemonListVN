import levels from "../../../public/levels.js"

function Main(levels) {
  return (
    <div className="mainpanel">
      <h2>Main List</h2>
      <div className="mainpanelContent">
        {Object.keys(levels).map(i => {
          //Added Object.keys(levels) to get rid of the error
          //Delete key={i} won't break the website but it will have a not so pretty error in console
          return (
            <div className='levelCard' key={i}>
              <img src={`https://i.ytimg.com/vi/${levels[i].thumbnail}/hq720.jpg`} alt=""></img>
              <div className='fadeEffect'></div>
              <p className='top'>#{levels[i].top}</p>
              <div className='levelInfo'>
                <h3>{levels[i].name}</h3>
                <p>by {levels[i].creator}</p>
                <br></br>
                <p>{levels[i].points}pt</p>
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
