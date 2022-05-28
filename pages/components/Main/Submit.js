import { getDoc, doc, setDoc } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState } from 'react';

function Main() {
    const [sel, setSel] = useState(0);    
    function showGGF() {
        if (sel == 0) {
            async function sendSubmit(){
                var dat = {}
                dat['vids'] = {}
                dat['id'] = document.getElementById('lvID').value
                dat['vids']['user'] = document.getElementById('userName').value
                dat['vids']['link'] = document.getElementById('link').value

                const lvRef = doc(db, "submit", 'FDLVN')
                const docSnap = await getDoc(lvRef);
                if (docSnap.exists()) {
                  const data = docSnap.data();
                  var d = Object.values(data)
                  d.push(dat)
                  d = Object.assign({}, d)
                  await setDoc(lvRef, d)
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
                alert('Your submission has been sent!')
            }
            return (
                <div className="submit">
                    <label for='userName'>Your in-game name:</label><br></br>
                    <input type='text' id='userName' name='userName' /><br></br>
                    <label for='lvID'>ID of the level you've beaten:</label><br></br>
                    <input type='text' id='lvID' name='lvID' /><br></br> 
                    <label for='link'>YouTube video's link:</label><br></br>
                    <input type='text' id='link' name='link' /><br></br>
                    <button onClick={() => sendSubmit()}>Submit</button>
                </div>
            )
        }
        else{
            async function sendSubmit(){
                var dat = {}
                dat['vids'] = {}
                dat['id'] = document.getElementById('lvID').value
                dat['vids']['user'] = document.getElementById('userName').value
                dat['vids']['link'] = document.getElementById('link').value
                dat['vids']['hz'] = document.getElementById('device').value
                dat['vids']['percent'] = document.getElementById('percent').value
                const lvRef = doc(db, "submit", 'DLVN')
                const docSnap = await getDoc(lvRef);
                if (docSnap.exists()) {
                  const data = docSnap.data();
                  var d = Object.values(data)
                  d.push(dat)
                  d = Object.assign({}, d)
                  await setDoc(lvRef, d)
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
                alert('Your submission has been sent!')
            }
            return (
                <div className="submit">
                    <label for='userName'>Your in-game name:</label><br></br>
                    <input type='text' id='userName' name='userName' /><br></br>
                    <label for='lvID'>ID of the level you've beaten:</label><br></br>
                    <input type='text' id='lvID' name='lvID' /><br></br> 
                    <label for='device'>Device (refresh rate):</label><br></br>
                    <select type='text' id='device' name='device'>
                        <option value="60Hz">60Hz</option>
                        <option value="144Hz">144Hz</option>
                        <option value="240Hz">240Hz</option>
                        <option value="300Hz">300Hz</option>
                        <option value="Mobile 60Hz">Mobile 60Hz</option>
                        <option value="Mobile 144Hz">Mobile 144Hz</option>
                        <option value="Mobile 240Hz">Mobile 240Hz</option>
                        <option value="Mobile 300Hz">Mobile 300Hz</option>
                    </select><br></br>
                    <label for='percent'>Progress:</label><br></br>
                    <input type='text' id='percent' name='percent' /><br></br>
                    <label for='link'>YouTube video's link:</label><br></br>
                    <input type='text' id='link' name='link' /><br></br>
                    <button onClick={() => sendSubmit()}>Submit</button>
                </div>
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
