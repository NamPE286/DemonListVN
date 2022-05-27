import { useState } from "react";
function Main() {
    const [sel, setSel] = useState(0);

    function showGGF() {
        if (sel == 0) {
            return (
                <div className="submit">
                    <label for='userName'>Your in-game name:</label><br></br>
                    <input type='text' id='userName' name='userName' /><br></br>
                    <label for='lvID'>ID of the level you've beaten:</label><br></br>
                    <input type='text' id='lvID' name='lvID' /><br></br> 
                    <label for='link'>YouTube video's link:</label><br></br>
                    <input type='text' id='link' name='link' /><br></br>
                    <button onClick={() => console.log('ok')}>Submit</button>
                </div>
            )
        }
        else{
            return (
                <>
                </>
            )
        }
    }

    if(sel == 0){
        try{
            document.getElementById('ab').style.background = 'var(--a2)';
            document.getElementById('ac').style.background = 'none';   
        }
        catch(err){
        }
    }
    else{
        try{
            document.getElementById('ab').style.background = 'none';
            document.getElementById('ac').style.background = 'var(--a2)';    
        }
        catch(err){}
    }
    return (
        <div className="mainpanel">
            <h2>Submit</h2>
            <div className="submissionRules">
                <h3>Submission Rules</h3>
                <ul>
                    <li>Only 100% records of any demons in the list are accepted.</li>
                    <li>Any records related to any cheat tools or secret ways will be rejected (However, FPS bypass is allowed, up to 300 FPS).</li>
                    <li>Stealing videos from others will not be accepted.</li>
                </ul>
            </div>
            <div className="submitSelect">
                <a href="#!" id="ab" onClick={() => setSel(0)} style={{background:"var(--a2)"}}>Submit to Featured List</a>
                <a href="#!" id="ac" onClick={() => setSel(1)}>Submit to Demon List</a>
            </div>
            <hr id='lineUnderBtn1'></hr>
            {showGGF()}
        </div>
    )
}

export default Main;
