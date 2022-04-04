import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore"
import { db } from '../api/firebase-config.js'
import Navbar from "../components/Navbar.js";
import Head from 'next/head';
import Image from "next/image";

function Main() {
    const [data, setData] = useState({});
    const [lvDat, setlvDat] = useState([]);
    const [apilv, setapilv] = useState([]);
    const [cmt, setCmt] = useState([]);
    const [mode, setMode] = useState(0);
    const [trig, setTrig] = useState(0);
    const [page, setPage] = useState(0);
    const [mode0, setMode0] = useState(0);
    const router = useRouter();
    const { id } = router.query;
    const axios = require('axios');
    const url = "https://gdbrowser.com/api/level/" + id;
    let cmtUrl = "https://gdbrowser.com/api/comments/" + id + "?page=" + page;



    useEffect(() => {
        async function getData() {

            const lvRef = doc(db, "data", "victor")
            const docSnap = await getDoc(lvRef);

            if (docSnap.exists()) {
                setData(docSnap.data());
                setTrig(1)
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
    useEffect(() => {
        axios
            .get(url, console.log('ok'))
            .then(res => {
                setapilv(res.data);
                setTimeout(10000)
            })
            .catch(error => {
                console.error(error)
            })

        axios
            .get(cmtUrl)
            .then(res => {
                setCmt(res.data);
                setTimeout(10000)
            })
            .catch(error => {
                console.error(error)
            })
    }, [trig])

    function nextPanel() {
        if (mode == 0) return showVictor();
        else if (mode == 1) return showComment();
    }

    function showVictor() {
        try {
            return (
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
            )
        }
        catch (err) {
            return (
                <div className="mainpanelContent">
                    <div className="recordList">
                        <div className="levelRecord">
                            <section className="allPlayerInfo">
                                <a id="levelRec"><b>No one has beaten this level yet</b></a>
                            </section>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function nextPage() {
        setPage(page + 1)
        cmtUrl = "https://gdbrowser.com/api/comments/" + id + "?page=" + page
        setTrig(trig * -1)
    }
    function prevPage() {
        if (page != 0) {
            setPage(page - 1)
            cmtUrl = "https://gdbrowser.com/api/comments/" + id + "?page=" + page
            setTrig(trig * -1)
        }
    }

    function showComment() {
        try {
            return (
                <div className="mainpanelContent">
                    <div className="recordList">
                        <div className="levelRecord1">
                            <section className="allPlayerInfo">
                            </section>
                            {Object.keys(cmt).map(i => {
                                return (
                                    <section key={i}>
                                        <a id="levelRec1"><b>{cmt[i].username}</b> • <a id='date'>{cmt[i].date}</a> • <a id='date'>{cmt[i].likes}</a></a>
                                        <p>{cmt[i].content}</p>
                                    </section>
                                )

                            })}
                        </div>
                    </div>
                    <div className="pageSwitcher">
                        <a href="#!" onClick={prevPage}>❮</a><a>{page + 1}</a><a href="#!" onClick={nextPage}>❯</a>
                    </div>
                </div>
            )
        }
        catch (err) {
            return (
                <div className="mainpanelContent">
                    <div className="recordList">
                        <div className="levelRecord">
                            <section className="allPlayerInfo">
                                <a id="levelRec"><b>No comment</b></a>
                            </section>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function showRating() {
        if (lvDat[id].points != undefined) {
            return (
                <div className="levelInfoContent1">
                    <p>ID: {id}<br />
                        Verified by: {lvDat[id].verifier}<br />
                        Rating: {apilv.difficulty} ({lvDat[id].points}pt)</p>
                </div>
            )
        }
        else {
            return (
                <div className="levelInfoContent1">
                    <p>ID: {id}<br />
                        Verified by: {lvDat[id].verifier}<br />
                        Rating: {apilv.difficulty} (legacy)</p>
                </div>
            )
        }
    }

    function changetoVictor() {
        setMode(0);
    }
    function changetoComment() {
        setMode(1);
    }
    function changetoInfo() {
        setMode0(0);
    }
    function changetoLDM() {
        setMode0(1);
    }
    function showDetail() {
        if (mode0 == 0) {
            return (
                <p>
                    <b>Description:<br /></b>{apilv.description}<br /><br />
                    <b>Downloads: </b>{apilv.downloads}<br />
                    <b>Likes: </b>{apilv.likes}<br />
                    <b>Coins: </b>{apilv.coins}<br />
                    <b>Length: </b>{apilv.length}<br />
                </p>
            )
        }
        else {
            if(lvDat[id].ldm == true){
                return (
                    <p>
                        <b>This level has native LDM</b>
                    </p>
                )
            }
            return (
                <p>
                    <b>LDM:<br /></b>
                </p>
            )
        }
    }
    try {
        return (
            <>
                <Head>
                    <title>{lvDat[id].name}'s Info - Demon List VN</title>
                </Head>
                <Navbar />
                <div className='pageContent mainpanelflexdown'>
                    <div className='sidePanel'>
                        <div className='topSpacer' />
                    </div>
                    <div className="mainpanelNoPadding" id='center-div'>
                        <div className="levelThumb0">
                            <img src={`https://i.ytimg.com/vi/${lvDat[id].thumbnail}/hqdefault.jpg`} alt="" id='bigLvThumb'></img>
                            <div className="fadeEffectUp"></div>
                        </div>
                        <div className="levelInfoContentWrapper">
                            <div className="levelInfoContent">
                                <h1>{lvDat[id].name}</h1>
                                <p>by {lvDat[id].creator}</p>
                            </div>
                            {showRating()}
                        </div>
                        <hr></hr>
                        <div className="levelInfoContent2">
                            <iframe src={`https://www.youtube.com/embed/${lvDat[id].thumbnail}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <div>
                                <div className="selector" id="selector1">
                                    <div>
                                        <a href="#!" onClick={changetoInfo}>Info</a>
                                        <a href="#!" id="spacing" onClick={changetoLDM}>LDM</a>
                                    </div>
                                    <hr id="sel"></hr>
                                </div>
                                {showDetail()}

                            </div>

                        </div>
                    </div>
                    <div className="mainpanel mainpanelNoPadding panel1" id='center-div'>
                        <div className="selector">
                            <div>
                                <a href="#!" onClick={changetoVictor}>Victor</a>
                                <a href="#!" id="spacing" onClick={changetoComment}>Comment</a>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="panel2">
                            {nextPanel()}
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