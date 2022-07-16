import { useRouter } from "next/router";
import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import { useState, useEffect } from 'react';

function Main() {
    const router = useRouter();
    const { id } = router.query;
    const [sel, setSel] = useState(0);
    const [mode, setMode] = useState()
    var uName = ''
    if (typeof window !== 'undefined') {
        uName = localStorage.getItem('userName')
        if (uName == null) {
            uName = ''
        }
    }
    useEffect(() => {
        if (router.query.mode) {
            setMode(router.query.mode)
        }
    }, [router.query.mode])
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
    function showSubmit() {
        if (mode == 0) return (
            <>
                <div id='abcz'>
                    <h3>Submit</h3>
                </div>
                <div className="submit">
                    <label for='userName'>Your in-game name:</label><br></br>
                    <input type='text' id='userName' name='userName' defaultValue={uName} /><br></br>
                    <label for='lvID'>Level</label><br></br>
                    <input type='number' id='lvID' name='lvID' /><br></br>
                    <label for='device'>Device (refresh rate):</label><br></br>
                    <select type='text' id='device' name='device'>
                        <option value="60Hz">60Hz</option>
                        <option value="144Hz">144Hz</option>
                        <option value="240Hz">240Hz</option>
                        <option value="300Hz">300Hz</option>
                        <option value="300Hz">360Hz</option>
                        <option value="Mobile 60Hz">Mobile 60Hz</option>
                        <option value="Mobile 144Hz">Mobile 144Hz</option>
                        <option value="Mobile 240Hz">Mobile 240Hz</option>
                        <option value="Mobile 300Hz">Mobile 300Hz</option>
                        <option value="Mobile 300Hz">Mobile 360Hz</option>
                    </select><br></br>
                    <label for='percent'>Progress:</label><br></br>
                    <input type='number' min='0' max='100' id='percent' name='percent' /><br></br>
                    <label for='link'>YouTube video's link:</label><br></br>
                    <input type='text' id='link' name='link' /><br></br>
                    <div className="submitBtn1">
                        <button>Submit</button>
                    </div>
                </div>

            </>
        )
    }
    function showContent() {
        return (
            <div className="mainpanel" id='center-div'>
                <h2>Contest Name's info</h2>
                <div className="mainpanelContent">
                    <div className="heading123">
                        <label id='contestLevel1'>Level</label>
                        <label id='contestLevelID1'>ID</label>
                        <label id='contestLevelDiff1'>Difficulty</label>
                    </div>
                    <div className='contestInfo'>
                        <div className='contestLevel'>
                            <section><p id='contestLevel'><b>Level Name</b> by <b>Creator</b></p><p id='contestLevelID'>12345678</p><p id='contestLevelDiff'>Easy Demon</p></section>
                            <section><p id='contestLevel'><b>Level Name</b> by <b>Creator</b></p><p id='contestLevelID'>12345678</p><p id='contestLevelDiff'>Medium Demon</p></section>
                            <section><p id='contestLevel'><b>Level Name</b> by <b>Creator</b></p><p id='contestLevelID'>12345678</p><p id='contestLevelDiff'>Hard Demon</p></section>
                            <section><p id='contestLevel'><b>Level Name</b> by <b>Creator</b></p><p id='contestLevelID'>12345678</p><p id='contestLevelDiff'>Insane Demon</p></section>
                            <section><p id='contestLevel'><b>Level Name</b> by <b>Creator</b></p><p id='contestLevelID'>12345678</p><p id='contestLevelDiff'>Extreme Demon</p></section>
                        </div>
                    </div>
                    {showSubmit()}
                    <div id='abcz1'>
                        <h3>Standing</h3>
                    </div>
                    <div className="submitSelect">
                        <a href="#!" id="ab" className="xzy" onClick={() => setSel(0)} style={{ background: "var(--a2)" }}>Accepted</a>
                        <a href="#!" id="ac" className="xzy" onClick={() => setSel(1)}>All Submission</a>
                    </div>
                    <div className="allPlayer">
                        <section>
                            <a id="playerName"></a><a id="playerTotalPoint">Rating</a><a id="playerBestplay">Status</a>
                        </section>
                        <section className="allPlayerInfo">
                            <a id="playerName" href='#!'>#1 Player Name</a><a id="playerTotalPoint">1000</a><a id="playerBestplay">Accepted</a>
                        </section>
                        <section className="allPlayerInfo">
                            <a id="playerName" href='#!'>#2 Player Name</a><a id="playerTotalPoint">1000</a><a id="playerBestplay">Accepted</a>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <Head>
                <title>{id} - Demon List VN</title>
            </Head>
            <Navbar />
            <div className='pageContent'>
                {showContent()}
            </div>
        </>
    )
}
export default Main