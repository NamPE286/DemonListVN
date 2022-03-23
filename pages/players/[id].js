import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, enableIndexedDbPersistence } from "firebase/firestore"
import { db } from '../api/firebase-config.js'
import Navbar from "../components/Navbar.js";

function Main() {
    const router = useRouter();
    const { id } = router.query;

    const test = []
    const [data, setData] = useState(test);
    const lvCol = query(collection(db, "data"))

    useEffect(() => {
        async function getData() {
            const data = await getDocs(lvCol);
            setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getData();
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
    return (
        <>
            <Navbar />
            <title>{id}'s Info - Demon List VN</title>
            <div className='pageContent'>
                <div className='sidePanel'>
                    <div className='topSpacer' />
                </div>
                <div className="mainpanel" id="center-div">
                    <h2>{id}'s Info</h2>
                    <div className="mainpanelContent">
                        {Object.keys(data).map(i => {
                            if (i == 0) {
                                return (
                                    <div className="topMostPlayer">
                                        <section className="sect">
                                            <img src={data[5][id].avatar} alt="" />
                                        </section>
                                        <div className="topMostPlayerInfo">
                                            <h3>#{data[5][id].top} {data[5][id].name}</h3>
                                            <hr></hr>
                                            <p>{data[5][id].points}pt <p>Best Play: {processTitle(data[5][id].bestplay)} by {processAuthor(data[5][id].bestplayCreator)}</p></p>
                                        </div>
                                        <div className="levelThumbWrapper">
                                            <section className="levelThumb">
                                                <img src={`https://i.ytimg.com/vi/${data[5][id].bestplayThumbnail}/hqdefault.jpg`} alt=''></img>
                                                <div className="fadeEffect1"></div>
                                                <a><div id="bold">{processTitle(data[5][id].bestplay)}</div>by {processAuthor(data[5][id].bestplayCreator)} - {data[5][id].bestplayPt}pt</a>
                                            </section>
                                        </div>
                                    </div>
                                )
                            }
                            else if (i == 1) {
                                return (
                                    <div className="recordList">
                                        <h2 id='nvm'>Record List</h2>
                                        <div className="levelRecord">
                                            <section className="allPlayerInfo">
                                                <a id="levelRec">Completed demon(s): {data[2][id].length}</a>
                                            </section>
                                            {Object.keys(data[2][id]).map(i => {
                                                return (
                                                    <section className="allPlayerInfo" key={i}>
                                                        <a id="levelRec">{data[2][id][i]}</a>
                                                    </section>
                                                )

                                            })}
                                        </div>
                                    </div>
                                )
                            }
                        })}

                    </div>
                </div>
            </div>

        </>
    );
}

export default Main;