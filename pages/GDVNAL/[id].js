import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.js";
import Head from 'next/head';
import Image from "next/image";

function Main() {
    const [data, setData] = useState([]);
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

    const [busy, setBusy] = useState(false);

    useEffect(() => {
        function a(x) {
            var y = x.split('\n');
            var d0 = {}
            y.pop()
            y.pop()
            y.push('d0 = d')
            const n = y.join('\n')
            eval(n)
            d0 = d0.list
            for (let i = 0; i < d0.length; i++) {
                if (d0[i].id == id) {
                    setData(d0[i])
                }
            }
        }

        axios.
            get("https://raw.githubusercontent.com/demonlistgdvn/top100/main/js/list.js")
            .then(res => {
                setBusy(true)
                a(res.data);
            });
        axios
            .get(url)
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
    }, [busy, trig])

    function nextPanel() {
        if (mode == 0) return showVictor();
        else if (mode == 1) return showComment();
    }

    function showVictor() {
        try {
            if (data['vids'].length == 0) {
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
            return (
                <div className="mainpanelContent">
                    <div className="recordList">
                        <div className="levelRecord">
                            <section className="allPlayerInfo">
                                <a id="levelRec"><b>Total Victor: {data['vids'].length}</b></a>
                            </section>
                            {Object.keys(data['vids']).map(i => {
                                return (
                                    <section className="allPlayerInfo" key={i}>
                                        <a id="levelRec">{data['vids'][i].user + " - " + data['vids'][i].link}</a>
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
    function getFVic(x) {
        for (let i = x.length - 1; i >= 0; i--) {
            if (x[i] == '[') {
                return x.substring(i + 1, x.length - 1)
            }
        }
    }
    function showRating() {
        return (
            <div className="levelInfoContent1">
                <p>ID: {id}<br />
                    First Victor: {getFVic(data.author)}<br />
                    Rating: {apilv.difficulty}</p>
            </div>
        )
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
    }
    function getVideoId(x) {
        //get watch?v= index in x and return the video id
        var y = x.split('watch?v=');
        return y[1].split('&')[0]

    }
    function processName(x) {
        for (let i = x.length - 1; i >= 0; i--) {
            if (x[i] == '[') {
                return x.substring(0, i)
            }
        }

    }
    try {
        return (
            <>
                <Head>
                    <title>{data.name}'s Info - Demon List VN</title>
                </Head>
                <Navbar />
                <div className='pageContent mainpanelflexdown' id='res'>
                    <div className='sidePanel'>
                        <div className='topSpacer' />
                    </div>
                    <div className="mainpanelNoPadding" id='center-div'>
                        <div className="levelThumb0">
                            <img src={`https://i.ytimg.com/vi/${getVideoId(data.verificationVid)}/hqdefault.jpg`} alt="" id='bigLvThumb'></img>
                            <div className="fadeEffectUp"></div>
                        </div>
                        <div className="levelInfoContentWrapper">
                            <div className="levelInfoContent">
                                <h1>{data.name}</h1>
                                <p>by {processName(data.author)}</p>
                            </div>
                            {showRating()}
                        </div>
                        <hr></hr>
                        <div className="levelInfoContent2">
                            <iframe src={`https://www.youtube.com/embed/${getVideoId(data.verificationVid)}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <div>
                                <div className="selector" id="selector1">
                                    <div>
                                        <a href="#!" onClick={changetoInfo}>Info</a>
                                    </div>
                                    <hr id="sel"></hr>
                                </div>
                                {showDetail()}

                            </div>

                        </div>
                    </div>
                    <div className="mainpanelNoPadding panel1" id='center-div'>
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