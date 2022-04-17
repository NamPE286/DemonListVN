import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore"
import { db } from '../api/firebase-config.js'
import Navbar from "../components/Navbar.js";
import Head from 'next/head';

function Main() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setdata] = useState([]);
    const [data0, setdata0] = useState([]);

    useEffect(() => {
        async function getdata() {

            const lvRef = doc(db, "data", "GDVNALPlayer0")
            const docSnap = await getDoc(lvRef);

            if (docSnap.exists()) {
                setdata(docSnap.data());
            } else {
                // doc.data[id]() will be undefined in this case
                console.log("No such document!");
            }
            const lvRef0 = doc(db, "data", "mainlist1")
            const docSnap0 = await getDoc(lvRef0);

            if (docSnap0.exists()) {
                setdata0(docSnap0.data());
            } else {
                // doc.data[id]() will be undefined in this case
                console.log("No such document!");
            }

        }
        getdata()
    }, [])

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
        if (data[id].vids.length == 0) {
            return (
                <div className="recordList">
                    <h2 id='nvm'>Record List</h2>
                    <div className="levelRecord">
                        <section className="allPlayerInfo">
                            <a id="levelRec">This player did not beat any level yet</a>
                        </section>
                    </div>
                </div>

            )

        }
        else {
            const ab = Object.entries(data[id].vids);
            return (
                <div className="recordList">
                    <h2 id='nvm'>Record List</h2>
                    <div className="levelRecord">
                        <section className="allPlayerInfo">
                            <a id="levelRec">Completed demon(s): {ab.length}</a>
                        </section>
                        {Object.values(ab).map(i => {
                            return (
                                <section className="allPlayerInfo">
                                    <a id="levelRec" href={i[1].link} target="_blank">{data0[i[0]].name} ({i[1].percent}%) ({i[1].hz})</a>
                                </section>
                            )

                        })}
                    </div>
                </div>

            )
        }
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
                        <h2>{id}'s Info</h2>
                        <div className="mainpanelContent">
                            <div className="topMostPlayer">
                                <section className="sect">
                                    <img src={data[id].avatar} alt="" />
                                </section>
                                <div className="topMostPlayerInfo">
                                    <h3>#{data[id].top} {data[id].name}</h3>
                                    <hr></hr>
                                    <p>{data[id].points}pt <p>Best Play: {processTitle(data[id].bestplay)} by {processAuthor(data[id].bestplayCreator)}</p></p>
                                </div>
                                <div className="levelThumbWrapper">
                                    <section className="levelThumb">
                                        <img src={`https://i.ytimg.com/vi/${data[id].bestplayThumbnail}/hqdefault.jpg`} alt=''></img>
                                        <div className="fadeEffect1"></div>
                                        <a><div id="bold">{processTitle(data[id].bestplay)}</div>by {processAuthor(data[id].bestplayCreator)} - {data[id].bestplayPt}pt</a>
                                    </section>
                                </div>
                            </div>
                            {recList()}
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