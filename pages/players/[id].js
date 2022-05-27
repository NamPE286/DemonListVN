import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore"
import { db } from '../api/firebase-config.js'
import Navbar from "../components/Navbar.js";
import Head from 'next/head';

function Main() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [player, setPlayer] = useState([]);
    const [mode, setMode] = useState();
    useEffect(() => {
        async function getData() {
            const lvRef = doc(db, "FDLVNPlayer", "index")
            const docSnap = await getDoc(lvRef);

            if (docSnap.exists()) {
                setData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            const lvRef1 = doc(db, "DLVNPlayer", "index")
            const docSnap1 = await getDoc(lvRef1);

            if (docSnap1.exists()) {
                setData1(docSnap1.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            const lvRef2 = doc(db, "DLVN", "index")
            const docSnap2 = await getDoc(lvRef2);

            if (docSnap2.exists()) {
                setData2(docSnap2.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            const pRef = doc(db, "FDLVNPlayer", "index")
            const pSnap = await getDoc(pRef);

            if (pSnap.exists()) {
                setPlayer(pSnap.data());
            }
            else {
                console.log("No such document!");
            }
        }
        getData()
    }, [])
    useEffect(() => {
        if(router.query.mode){
            setMode(router.query.mode)
        }
    }, [router.query.mode])

    function processTitle(s) {
        if (s.length > 13) {
            return s.slice(0, 11) + "...";
        }
        return s;
    }
    function processAuthor(s) {
        if (s.length > 10) {
            return s.slice(0, 8) + "...";
        }
        return s;
    }
    function recList() {
        if(mode == 0) {
            if (player[id] == undefined || player[id].length == 0) {
                return (
                    <div className="recordList">
                        <br></br><br></br>
                        <div className="levelRecord">
                            <section className="allPlayerInfo">
                                <a id="levelRec">This player hasn't beaten any level yet</a>
                            </section>
                        </div>
                    </div>

                )

            }
            else {
                var c = -1
                return (
                    <div className="recordList">
                        <br></br><br></br>
                        <div className="levelRecord">
                            <section className="allPlayerInfo">
                                <a id="levelRec">Completed demon(s): {Object.values(player[id]['vids']).length}</a>
                            </section>
                            {Object.keys(player[id]['vids']).map(i => {
                                c = c*-1
                                return (
                                    <section className="allPlayerInfo" id={`lvGrid${c}`} key={i}>
                                        <a id="levelRec" href={player[id]['vids'][i].link} target='_blank'>{player[id]['vids'][i].name}</a>
                                    </section>
                                )

                            })}
                        </div>
                    </div>

                )
            }
        }
        else if (mode == 1){
            if (data1[id] == undefined || data1[id].lv.length == 0) {
                return (
                    <div className="recordList">
                        <br></br><br></br>
                        <div className="levelRecord">
                            <section className="allPlayerInfo">
                                <a id="levelRec">This player hasn't beaten any level yet</a>
                            </section>
                        </div>
                    </div>

                )

            }
            else {
                var c = -1;
                return (
                    <div className="recordList">
                        <br></br><br></br>
                        <div className="levelRecord">
                            <section className="allPlayerInfo">
                                <a id="levelRec">Completed demon(s): {data1[id].lv.length}</a>
                            </section>
                            {Object.keys(data1[id].vids).map(i => {
                                c = c*-1
                                return (
                                    <section className="allPlayerInfo" id={`lvGrid${c}`} key={i}>
                                        <a id="levelRec" href={data1[id].vids[i].link} target='_blank'>{data2[i].name} ({data1[id].vids[i].percent}%) ({data1[id].vids[i].hz})</a>
                                    </section>
                                )
                            })}
                        </div>
                    </div>

                )
            }
        }
    }
    function copyDiscordTag() {
        var text = "test#1234"
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert("Copied Discord tag to clipboard!");
    }
    function showData(){
        try{
            return(
                <div className="playerRank1">
                    <a id='rank1'>FDLVN Rank</a><br/>
                    <a id='top1'>#{data[id].top}</a><br/>
                    <a id='pt1'>{data[id].points}pt</a><br/>
                </div>
            )
        }
        catch(err){
            return(
                <div className="playerRank1">
                    <a id='rank1'>FDLVN Rank</a><br/>
                    <a id='top1'>#N/A</a><br/>
                    <a id='pt1'>N/A pt</a><br/>
                </div>
            )   
        }
    }
    function showData1(){
        try{
            return(
                <div className="playerRank1">
                    <a id='rank1'>Demon List VN Rank</a><br/>
                    <a id='top1'>#{data1[id].top}</a><br/>
                    <a id='pt1'>{data1[id].points}pt</a><br/>
                </div>
            )
        }
        catch(err){
            return(
                <div className="playerRank1">
                    <a id='rank1'>Demon List VN Rank</a><br/>
                    <a id='top1'>#N/A</a><br/>
                    <a id='pt1'>N/A pt</a><br/>
                </div>
            )   
        }
    }
    function showInfo(){
        try{
            return(
                <div className="basicInfo">
                    <img src={data[id].avatar} alt="" />
                    <h2 id="playerName">{data[id].name}</h2>
                    <hr></hr>
                    <div className="socialInfo1">
                    <a href="#!"><img src="/icon/facebook.ico" id='socialIcon' alt="" /></a>
                        <a href="#!"><img src="/icon/youtube.ico" id='socialIcon' alt="" /></a>
                        <a href="#!"><img src="/icon/discord.ico" id='socialIcon' onClick={copyDiscordTag} alt="" title="Click to copy Discord tag" /></a>
                    </div>
                </div>
            )
        }
        catch(err){
            return(
                <div className="basicInfo">
                    <img src={data1[id].avatar} alt="" />
                    <h2 id="playerName">{data1[id].name}</h2>
                    <hr></hr>
                    <div className="socialInfo1">
                    <a href="#!"><img src="/icon/facebook.ico" id='socialIcon' alt="" /></a>
                        <a href="#!"><img src="/icon/youtube.ico" id='socialIcon' alt="" /></a>
                        <a href="#!"><img src="/icon/discord.ico" id='socialIcon' onClick={copyDiscordTag} alt="" title="Click to copy Discord tag" /></a>
                    </div>
                </div>
            )
        }
    }
    function nah(x){
        if(x == 0) return "FDLVN"
        return "Demon List VN"
    }

    try {
        return (
            <>
                <Head>
                    <title>{id}' Info - Demon List VN</title>
                </Head>
                <Navbar />
                <div className='pageContent'>
                    <div className='sidePanel'>
                        <div className='topSpacer' />
                    </div>
                    <div className="mainpanel" id="center-div">
                        <div className="spacer1"/>
                        <div className="mainpanel4">
                            <div className="socialInfo">
                                {showInfo()}
                            </div>
                            <hr id='verticalLine'></hr>
                            <div className="playerRecord">
                                <div className="playerRank">
                                    {showData()}
                                    <hr id='verticalLine1'></hr>
                                    {showData1()}
                                </div><br/>
                                <section id="mode123">
                                    <label for="mode12">Show Record: </label>
                                    <select name="mode12" id="mode12" onChange={() => setMode(document.getElementById('mode12').value)}>
                                        <option value={mode} selected disabled hidden>{nah(mode)}</option>
                                        <option value="0">FDLVN</option>
                                        <option value="1">Demon List VN</option>
                                    </select>
                                </section>
                                {recList()}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
    catch (err) {
        console.error(err)
        return (
            <>
                <Head>
                    <title>An error occured</title>
                </Head>
                <div className='pageContent'>
                    <div className='sidePanel'>
                        <div className='topSpacer' />
                    </div>
                    <div className="mainpanel mainpanelNoPadding" id='center-div'>
                        <div className="mainpanelContent">
                            <p id="meh">Something went wrong</p>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default Main;