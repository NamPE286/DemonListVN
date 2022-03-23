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
    try {
        return (
            <>
                <Navbar />
                <title>{id}'s Victor - Demon List VN</title>
                <div className='pageContent'>
                    <div className='sidePanel'>
                        <div className='topSpacer' />
                    </div>
                    <div className="mainpanel" id='center-div'>
                        <h2>{id}'s Victor</h2>
                        <div className="mainpanelContent">
                            {Object.keys(data).map(i => {
                                if (i == 1) {
                                    return (
                                        <div className="recordList">
                                            <div className="levelRecord">
                                                <section className="allPlayerInfo">
                                                    <a id="levelRec">Total Victor: {data[6][id].length}</a>
                                                </section>
                                                {Object.keys(data[6][id]).map(i => {
                                                    return (
                                                        <section className="allPlayerInfo" key={i}>
                                                            <a id="levelRec">{data[6][id][i]}</a>
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
    catch (err) {
        return (
            <div className='pageContent'>
                <div className='sidePanel'>
                <div className='topSpacer' />
                </div>
                <div className="mainpanel">
                    <h2>{id}'s Victor</h2>
                    <div className="mainpanelContent">
                        <p id="meh">No one has beaten this level yet</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Main;