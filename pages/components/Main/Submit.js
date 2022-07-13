import { getDoc, doc, setDoc, onSnapshot } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';

function Main() {
    const [data, setData] = useState(false)
    const [data1, setData1] = useState(false)
    const [sel, setSel] = useState(0);
    const [sel1, setSel1] = useState(0);
    const [FDLVN, setFDLVN] = useState(false);
    const [DLVN, setDLVN] = useState(false);
    const [player, setPlayer] = useState(false);
    const [acp, setAcp] = useState(false);
    const [acp1, setAcp1] = useState(false);
    const [rej, setRej] = useState(false);
    const [rej1, setRej1] = useState(false);
    var uName = ''
    if (typeof window !== 'undefined') {
        uName = localStorage.getItem('userName')
        if (uName == null) {
            uName = ''
        }
    }
    useEffect(() => {
        const dat0 = onSnapshot(doc(db, "submit", 'FDLVN'), (doc) => {
            var d = doc.data()
            d = Object.values(d)
            d.reverse()
            d = Object.assign({}, d)
            setData(d);
        })
        const dat01 = onSnapshot(doc(db, "submit", 'DLVN'), (doc) => {
            var d = doc.data()
            d = Object.values(d)
            d.reverse()
            d = Object.assign({}, d)
            setData1(d);
        })
        const dat1 = onSnapshot(doc(db, "FDLVN", 'index'), (doc) => {
            setFDLVN(doc.data());
        })
        const dat2 = onSnapshot(doc(db, "DLVN", 'index'), (doc) => {
            setDLVN(doc.data());
        })
        const dat3 = onSnapshot(doc(db, "player", 'index'), (doc) => {
            setPlayer(doc.data());
        })
        const dat4 = onSnapshot(doc(db, "submit", 'FDLVNAccepted'), (doc) => {
            setAcp(doc.data());
        })
        const dat5 = onSnapshot(doc(db, "submit", 'DLVNAccepted'), (doc) => {
            setAcp1(doc.data());
        })
        const dat6 = onSnapshot(doc(db, "submit", 'FDLVNRejected'), (doc) => {
            setRej(doc.data());
        })
        const dat7 = onSnapshot(doc(db, "submit", 'DLVNRejected'), (doc) => {
            setRej1(doc.data());
        })
        return () => {
            dat0();
            dat01();
            dat1();
            dat2();
            dat3();
            dat4();
            dat5();
            dat6();
            dat7();
        }
    }, [])
    function showGGF() {
        if (sel == 0) {
            async function sendSubmit1(dat) {
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
            async function sendSubmit() {
                document.getElementById('userName').value = document.getElementById('userName').value.replace(/\s+/g, ' ').trim();
                document.getElementById('link').value = document.getElementById('link').value.replace(/\s+/g, ' ').trim();
                document.getElementById('comment').value = document.getElementById('comment').value.replace(/\s+/g, ' ').trim();
                document.getElementById('lvID').value = document.getElementById('lvID').value.replace(/\s+/g, ' ').trim();
                localStorage.setItem('userName', document.getElementById('userName').value)
                var dat = {}
                dat['vids'] = {}
                dat['id'] = document.getElementById('lvID').value
                dat['vids']['user'] = document.getElementById('userName').value
                dat['vids']['link'] = document.getElementById('link').value
                dat['comment'] = document.getElementById('comment').value
                if (document.getElementById('lvID').value.length == 0 || document.getElementById('userName').value.length == 0 || document.getElementById('link').value.length == 0) {
                    alert('Please fill in all the fields')
                    return
                }
                if (parseInt(document.getElementById('lvID').value) in FDLVN == false) {
                    alert('Level does not exist in the list. Please check the level ID')
                    return
                }
                if (dat['vids']['user'] in player) {
                    const lvRef = doc(db, "FDLVNPlayer", "index")
                    const docSnap = await getDoc(lvRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        var d = data[dat['vids']['user']]
                        if (dat['id'] in d['vids']) {
                            if (videoId == videoId1) {
                                alert('You have already submitted this level')
                                return
                            }
                        }
                    }
                    sendSubmit1(dat)
                }
                else {
                    if (confirm('You do not have a profile. Do you want to create one? (or check your spelling)')) {
                        sendSubmit1(dat)
                    }
                }
            }


            return (
                <div className="submit">
                    <label for='userName'>Your in-game name:</label><br></br>
                    <input type='text' id='userName' name='userName' defaultValue={uName} /><br></br>
                    <label for='lvID'>ID of the level you've beaten:</label><br></br>
                    <input type='number' id='lvID' name='lvID' /><br></br>
                    <label for='link'>YouTube video's link:</label><br></br>
                    <input type='text' id='link' name='link' /><br></br>
                    <label for='link'>Comment (optional):</label><br></br>
                    <input type='text' id='comment' name='comment' /><br></br>
                    <div className="submitBtn1">
                        <button onClick={() => sendSubmit()}>Submit</button>
                    </div>
                </div>
            )
        }
        else {
            async function sendSubmit1(dat) {
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
            async function sendSubmit() {
                document.getElementById('userName').value = document.getElementById('userName').value.replace(/\s+/g, ' ').trim();
                document.getElementById('lvID').value = document.getElementById('lvID').value.replace(/\s+/g, ' ').trim();
                document.getElementById('link').value = document.getElementById('link').value.replace(/\s+/g, ' ').trim();
                document.getElementById('comment').value = document.getElementById('comment').value.replace(/\s+/g, ' ').trim();
                localStorage.setItem('userName', document.getElementById('userName').value)
                var dat = {}
                dat['vids'] = {}
                dat['id'] = document.getElementById('lvID').value
                dat['vids']['user'] = document.getElementById('userName').value
                dat['vids']['link'] = document.getElementById('link').value
                dat['vids']['hz'] = document.getElementById('device').value
                dat['vids']['percent'] = document.getElementById('percent').value
                dat['comment'] = document.getElementById('comment').value
                if (document.getElementById('lvID').value.length == 0 || document.getElementById('userName').value.length == 0 || document.getElementById('link').value.length == 0) {
                    alert('Please fill in all the fields')
                    return
                }
                if (dat['vids']['user'] in player) {
                    const lvRef = doc(db, "DLVNPlayer", "index")
                    const docSnap = await getDoc(lvRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        var d = data[dat['vids']['user']]
                        if (dat['id'] in d['vids']) {
                            var videoId = "";
                            var videoId1 = "";
                            if (dat['vids']['link'].includes("youtu.be")) {
                                videoId = dat['vids']['link'].split('youtu.be/')[1]
                            }
                            else if (dat['vids']['link'].includes('&') == false) {
                                videoId = dat['vids']['link'].split('watch?v=')[1]
                            }
                            else {
                                videoId = dat['vids']['link'].split('&')[0].split('watch?v=')[1]
                            }
                            if (d['vids'][dat['id']]['link'].includes("youtu.be")) {
                                videoId1 = d['vids'][dat['id']]['link'].split('youtu.be/')[1]
                            }
                            else if (d['vids'][dat['id']]['link'].includes('&') == false) {
                                videoId1 = d['vids'][dat['id']]['link'].split('watch?v=')[1]
                            }
                            else {
                                videoId1 = d['vids'][dat['id']]['link'].split('&')[0].split('watch?v=')[1]
                            }
                            if (videoId == videoId1) {
                                alert('You have already submitted this level')
                                return
                            }
                            if (parseInt(dat['vids']['percent']) < parseInt(d['vids'][dat['id']]['percent'])) {
                                alert('Your progress is lower than your previous submission of this level')
                                return
                            }
                        }
                    }
                    sendSubmit1(dat)
                }
                else {
                    if (confirm('You haven\'t had a profile. Do you want to create one? (or check your spelling)')) {
                        sendSubmit1(dat)
                    }
                }
            }
            return (
                <div className="submit">
                    <label for='userName'>Your in-game name:</label><br></br>
                    <input type='text' id='userName' name='userName' defaultValue={uName} /><br></br>
                    <label for='lvID'>ID of the level you've beaten:</label><br></br>
                    <input type='number' id='lvID' name='lvID' /><br></br>
                    <label for='device'>Device (refresh rate):</label><br></br>
                    <select type='text' id='device' name='device'>
                        <option value="60Hz">60fps</option>
                        <option value="144Hz">144fps</option>
                        <option value="240Hz">240fps</option>
                        <option value="300Hz">300fps</option>
                        <option value="300Hz">360fps</option>
                        <option value="Mobile 60Hz">Mobile 60fps</option>
                        <option value="Mobile 144Hz">Mobile 144fps</option>
                        <option value="Mobile 240Hz">Mobile 240fps</option>
                        <option value="Mobile 300Hz">Mobile 300fps</option>
                        <option value="Mobile 300Hz">Mobile 360fps</option>
                    </select><br></br>
                    <label for='percent'>Progress:</label><br></br>
                    <input type='number' min='0' max='100' id='percent' name='percent' /><br></br>
                    <label for='link'>YouTube video's link:</label><br></br>
                    <input type='text' id='link' name='link' /><br></br>
                    <label for='link'>Comment (optional):</label><br></br>
                    <input type='text' id='comment' name='comment' /><br></br>
                    <div className="submitBtn1">
                        <button onClick={() => sendSubmit()}>Submit</button>
                    </div>
                </div>
            )
        }
    }

    if (sel == 0) {
        try {
            document.getElementById('ab').style.background = 'var(--a2)';
            document.getElementById('ac').style.background = 'none';
        }
        catch (err) {
        }
    }
    else {
        try {
            document.getElementById('ab').style.background = 'none';
            document.getElementById('ac').style.background = 'var(--a2)';
        }
        catch (err) { }
    }
    if (sel1 == 0) {
        try {
            document.getElementById('ba').style.background = 'var(--a2)';
            document.getElementById('bb').style.background = 'none';
            document.getElementById('bc').style.background = 'none';
        }
        catch (err) {
        }
    }
    else if (sel1 == 1) {
        try {
            document.getElementById('ba').style.background = 'none';
            document.getElementById('bb').style.background = 'var(--a2)';
            document.getElementById('bc').style.background = 'none';
        }
        catch (err) {
        }
    }
    else {
        try {
            document.getElementById('ba').style.background = 'none';
            document.getElementById('bb').style.background = 'none';
            document.getElementById('bc').style.background = 'var(--a2)';
        }
        catch (err) { }
    }
    function showSubmission() {
        if (!FDLVN || !DLVN) return null
        if (sel == 0) {
            if(!data || !data1) return null
            if (sel1 == 0) return (
                <div className="allPlayer">
                    <section>
                        <a>Player Name</a><a>Level Name</a><a>Verification Video</a><a id="submitComment">Comment</a>
                    </section>
                    {
                        Object.keys(data).map(i => {
                            return (
                                <section>
                                    <a id="glow" href={`/players/${data[i].vids.user}`}>{data[i].vids.user}</a><a id="glow" href={`/mainlist/${data[i].id}`}>{FDLVN[data[i].id].name}</a><a id="glow" href={data[i].vids.link} target='_blank'>Click here</a><a>{data[i].comment}</a>
                                </section>
                            )
                        })
                    }
                </div>
            )
            if (sel1 == 1) return (
                <div className="allPlayer">
                    <section>
                        <a>Player Name</a><a>Level Name</a><a>Verification Video</a><a id="submitComment">Comment</a>
                    </section>
                    {
                        Object.keys(acp).map(i => {
                            return (
                                <section>
                                    <a id="glow" href={`/players/${acp[i].vids.user}`}>{acp[i].vids.user}</a><a id="glow" href={`/mainlist/${acp[i].id}`}>{FDLVN[acp[i].id].name}</a><a id="glow" href={acp[i].vids.link} target='_blank'>Click here</a><a>{acp[i].comment}</a>
                                </section>
                            )
                        })
                    }
                </div>
            )
            if (sel1 == 2) return (
                <div className="allPlayer">
                    <section>
                        <a>Player Name</a><a>Level Name</a><a>Verification Video</a><a id="submitComment">Comment</a>
                    </section>
                    {
                        Object.keys(rej).map(i => {
                            return (
                                <section>
                                    <a id="glow" href={`/players/${rej[i].vids.user}`}>{rej[i].vids.user}</a><a id="glow" href={`/mainlist/${rej[i].id}`}>{FDLVN[rej[i].id].name}</a><a id="glow" href={rej[i].vids.link} target='_blank'>Click here</a><a>{rej[i].comment}</a>
                                </section>
                            )
                        })
                    }
                </div>
            )
        }
        if (sel == 1) {
            if(!data || !data1) return null
            if (sel1 == 0) return (
                <div className="allPlayer">
                    <section>
                        <a>Player Name</a><a>Level Name</a><a>Verification Video</a><a id="submitComment">Comment</a>
                    </section>
                    {
                        Object.keys(data1).map(i => {
                            function getName(){
                                if(data1[i].id in DLVN) return DLVN[data1[i].id].name
                                return data1[i].id
                            }
                            return (
                                <section>
                                    <a id="glow" href={`/players/${data1[i].vids.user}`}>{data1[i].vids.user}</a><a id="glow" href={`/GDVNAL/${data1[i].id}`}>{getName()}</a><a id="glow" href={data1[i].vids.link} target='_blank'>{data1[i].vids.percent}% ({data1[i].vids.hz})</a><a>{data1[i].comment}</a>
                                </section>
                            )
                        })
                    }
                </div>
            )
            if (sel1 == 1) return (
                <div className="allPlayer">
                    <section>
                        <a>Player Name</a><a>Level Name</a><a>Verification Video</a><a id="submitComment">Comment</a>
                    </section>
                    {
                        Object.keys(acp1).map(i => {
                            function getName(){
                                if(acp1[i].id in DLVN) return DLVN[acp1[i].id].name
                                return acp1[i].id
                            }
                            return (
                                <section>
                                    <a id="glow" href={`/players/${acp1[i].vids.user}`}>{acp1[i].vids.user}</a><a id="glow" href={`/GDVNAL/${acp1[i].id}`}>{getName()}</a><a id="glow" href={acp1[i].vids.link} target='_blank'>{acp1[i].vids.percent}% ({acp1[i].vids.hz})</a><a>{acp1[i].comment}</a>
                                </section>
                            )
                        })
                    }
                </div>
            )
            if (sel1 == 2) return (
                <div className="allPlayer">
                    <section>
                        <a>Player Name</a><a>Level Name</a><a>Verification Video</a><a id="submitComment">Comment</a>
                    </section>
                    {
                        Object.keys(rej1).map(i => {
                            function getName(){
                                if(rej1[i].id in DLVN) return DLVN[rej1[i].id].name
                                return rej1[i].id
                            }
                            return (
                                <section>
                                    <a id="glow" href={`/players/${rej1[i].vids.user}`}>{rej1[i].vids.user}</a><a id="glow" href={`/GDVNAL/${rej1[i].id}`}>{getName()} ({rej1[i].vids.percent}%)</a><a id="glow" href={rej1[i].vids.link} target='_blank'>{rej1[i].vids.percent}% ({rej1[i].vids.hz})</a><a>{rej1[i].comment}</a>
                                </section>
                            )
                        })
                    }
                </div>
            )
        }
    }
    return (
        <div className="mainpanel">
            <h2>Submit</h2>
            <div className="submissionRules">
                <h3>Submission Rules</h3>
                <ul>
                    <li>Only 100% records of any demons in the list are accepted (Only apply for FDLVN).</li>
                    <li>Any records related to any cheat tools or secret ways will be rejected (However, FPS bypass is allowed, up to 360 FPS).</li>
                    <li>Stealing videos from others will not be accepted.</li>
                </ul>
            </div>
            <div className="submitSelect">
                <a href="#!" id="ab" onClick={() => setSel(0)} style={{ background: "var(--a2)" }}>Submit to Featured List</a>
                <a href="#!" id="ac" onClick={() => setSel(1)}>Submit to Demon List</a>
            </div>
            <hr id='lineUnderBtn1'></hr>
            {showGGF()}
            <div id="subStat">
                <h3>Submission Status</h3>
            </div>
            <div className="submitSelect">
                <a href="#!" id="ba" onClick={() => setSel1(0)} style={{ background: "var(--a2)" }}>Pending</a>
                <a href="#!" id="bb" onClick={() => setSel1(1)}>Accepted</a>
                <a href="#!" id="bc" onClick={() => setSel1(2)}>Rejected</a>
            </div>
            <hr id='lineUnderBtn2'></hr>
            {showSubmission()}
        </div>
    )
}

export default Main;
