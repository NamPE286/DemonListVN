import { useState } from "react";
function Main() {
    const [sel, setSel] = useState(0);

    function showGGF() {
        if (sel == 0) {
            return (
                <>
                    <div className="submitForm">
                        <iframe className="google-form" src="https://docs.google.com/forms/d/e/1FAIpQLScyjv64Ezp9-3kQPUvZ-aCpEjKue9jhXKqVnq2bFSGqARpzUg/viewform?embedded=true" width="90%" height="1260" frameBorder="0" marginHeight="0" marginWidth="0"></iframe>
                    </div>
                    <p className="submitP">Doesn't work? <a href="https://forms.gle/YfRLRSrb1MPB8vqG7"><u>Click Here</u></a></p>

                </>
            )
        }
        else{
            return (
                <>
                    <div className="submitForm">
                        <iframe className="google-form" src="https://docs.google.com/forms/d/e/1FAIpQLScnysX6n-jJZJV-Y5acianEVF7hML-tEdGa78qTh6hX0C8gTg/viewform?embedded=true" width="90%" height="1260" frameBorder="0" marginHeight="0" marginWidth="0"></iframe>
                    </div>
                    <p className="submitP">Doesn't work? <a href="https://forms.gle/YfRLRSrb1MPB8vqG7"><u>Click Here</u></a></p>

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
                <a href="#!" id="ab" onClick={() => setSel(0)} style={{background:"var(--a2)"}}>Submit to VNFDL</a>
                <a href="#!" id="ac" onClick={() => setSel(1)}>Submit to GDVNAL</a>
            </div>
            <hr id='lineUnderBtn1'></hr>
            {showGGF()}
        </div>
    )
}

export default Main;
