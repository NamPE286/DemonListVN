import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore"
import { db } from '../api/firebase-config.js'
import Navbar from "../components/Navbar.js";
import Head from 'next/head';
import Image from "next/image";

function Main() {
    const [data, setData] = useState([]);
    const [lvDat, setlvDat] = useState([]);
    const [apilv, setapilv] = useState([]);
    const router = useRouter();
    const { id } = router.query;
    const axios = require('axios');
    useEffect(() => {
        async function getData() {

            const lvRef = doc(db, "data", "victor")
            const docSnap = await getDoc(lvRef);

            if (docSnap.exists()) {
                setData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            const lvRef0 = doc(db, "data", "mainlist0")
            const docSnap0 = await getDoc(lvRef0);

            if (docSnap0.exists()) {
                setlvDat(docSnap0.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }
        getData()
    }, [])

    const url = "https://gdbrowser.com/api/level/" + id;
    axios
        .get(url)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            setapilv(res.data);
        })
        .catch(error => {
            console.error(error)
        })

    console.log(apilv);
    try {
        return (
            <>
                <Head>
                    <title>{lvDat[id].name}'s Victor - Demon List VN</title>
                </Head>
                <Navbar />
                <div className='pageContent'>
                    <div className='sidePanel'>
                        <div className='topSpacer' />
                    </div>
                    <div className="mainpanel mainpanelNoPadding" id='center-div'>
                        <div className="levelThumb0">
                            <img src={`https://i.ytimg.com/vi/${lvDat[id].thumbnail}/hqdefault.jpg`} alt=""></img>
                            <div className="fadeEffectUp"></div>
                        </div>
                        <div className="levelInfoContentWrapper">
                            <div className="levelInfoContent">
                                <h1>{lvDat[id].name}</h1>
                                <p>by {lvDat[id].creator}</p>
                            </div>
                            <div className="levelInfoContent1">
                                <p>ID: {id}</p>
                                <p>Verified by: {lvDat[id].verifier}</p>
                                <p>Difficulty: {apilv.difficulty}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="levelInfoContent2">
                            <iframe src={`https://www.youtube.com/embed/${lvDat[id].thumbnail}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <p>
                                <b>Description:<br /></b>{apilv.description}<br/><br/>
                                <b>Downloads: </b>{apilv.downloads}<br/>
                                <b>Likes: </b>{apilv.likes}<br/>
                                <b>Coins: </b>{apilv.coins}<br/>
                                <b>Length: </b>{apilv.length}<br/>
                            </p>

                        </div>
                        <div className="mainpanelContent">
                            <div className="recordList">
                                <div className="levelRecord">
                                    <section className="allPlayerInfo">
                                        <a id="levelRec"><b>Total Victor: {data[id].length}</b></a>
                                    </section>
                                    {Object.keys(data[id]).map(i => {
                                        return (
                                            <section className="allPlayerInfo" key={i}>
                                                <a id="levelRec">{data[id][i]}</a>
                                            </section>
                                        )

                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        );
    }
    catch (err) {
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