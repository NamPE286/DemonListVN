function Main(){
    function showContestCard(i){
        if(i == 0) return(
            <div className="contestCard">
                <label id='contestName'><b>Contest Name</b></label>
                <label id='endIn'>Start in: 00:00:00</label>
            </div>
        )
        if(i == 1) return(
            <div className="contestCard">
                <a href='/contest/test' id='joinContest'>Enter</a>
                <label id='contestName'><b>Contest Name</b></label>
                <label id='endIn'>End in: 00:00:00</label>
            </div>
        )
        if(i == 2) return(
            <div className="contestCard">
                <a href='/contest/test' id='joinContest'>View</a>
                <label id='contestName'><b>Contest Name</b></label>
            </div>
        )
    }
    return (
        <div className="mainpanel mainpanel5">
            <h2>Contest</h2>
            <h3>Upcoming Contest</h3>
            {showContestCard(0)}
            <h3>Ongoing Contest</h3>
            {showContestCard(1)}
            <h3>Past Contest</h3>
            {showContestCard(2)}
        </div>
    )
}
export default Main