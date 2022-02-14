import levels from "../../public/levels";

function Main(levels) {
  function processTitle(s) {
    if (s.length > 8) {
      return s.slice(0, 6) + "...";
    }
    return s;
  }
  function processAuthor(s) {
    if (s.length > 8) {
      return s.slice(0, 6) + "...";
    }
    return s;
  }
  return (
    <div className="mainlistPanel">
      <h2>Main List</h2>
      <section title={`${levels[0].name} by ${levels[0].creator} - ${levels[0].points}pt`}>
        <img src={`https://i.ytimg.com/vi/${levels[0].thumbnail}/hqdefault.jpg`} alt=''></img>
        <div className="fadeEffect1"></div>
        <a className="smalltop">#1</a><a><div id="bold">{processTitle(levels[0].name)}</div><div>by {processAuthor(levels[0].creator)} - {levels[0].points}pt</div></a>
      </section>
      <section title={`${levels[1].name} by ${levels[1].creator} - ${levels[1].points}pt`}>
        <img src={`https://i.ytimg.com/vi/${levels[1].thumbnail}/hqdefault.jpg`} alt=''></img>
        <div className="fadeEffect1"></div>
        <a className="smalltop">#2</a><a><div id="bold">{processTitle(levels[1].name)}</div><div>by {processAuthor(levels[1].creator)} - {levels[1].points}pt</div></a>
      </section>
      <section title={`${levels[2].name} by ${levels[2].creator} - ${levels[2].points}pt`}>
        <img src={`https://i.ytimg.com/vi/${levels[2].thumbnail}/hqdefault.jpg`} alt=''></img>
        <div className="fadeEffect1"></div>
        <a className="smalltop">#3</a><a><div id="bold">{processTitle(levels[2].name)}</div><div>by {processAuthor(levels[2].creator)} - {levels[2].points}pt</div></a>
      </section>
      <section title={`${levels[3].name} by ${levels[3].creator} - ${levels[3].points}pt`}>
        <img src={`https://i.ytimg.com/vi/${levels[3].thumbnail}/hqdefault.jpg`} alt=''></img>
        <div className="fadeEffect1"></div>
        <a className="smalltop">#4</a><a><div id="bold">{processTitle(levels[3].name)}</div><div>by {processAuthor(levels[3].creator)} - {levels[3].points}pt</div></a>
      </section>
      <section title={`${levels[4].name} by ${levels[4].creator} - ${levels[4].points}pt`}>
        <img src={`https://i.ytimg.com/vi/${levels[4].thumbnail}/hqdefault.jpg`} alt=''></img>
        <div className="fadeEffect1"></div>
        <a className="smalltop">#5</a><a><div id="bold">{processTitle(levels[4].name)}</div><div>by {processAuthor(levels[4].creator)} - {levels[4].points}pt</div></a>
      </section>
    </div>
  )
}

Main.defaultProps = levels;


export default Main;