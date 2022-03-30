import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore"
import { db } from '../api/firebase-config.js'
import Navbar from "../components/Navbar.js";
import Head from 'next/head';

function Main() {
    const [data, setData] = useState([]);
    const router = useRouter();
    const { id } = router.query;
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
        }
        getData()
    }, [])

    try {
        return (
            <>
                <Head>
                    <title>{id}' Victor - Demon List VN</title>
                </Head>
                <Navbar />
                <div className='pageContent'>
                    <div className='sidePanel'>
                        <div className='topSpacer' />
                    </div>
                    <div className="mainpanel" id='center-div'>
                        <h2>{id}'s Victor</h2>
                        <div className="mainpanelContent">
                            <div className="recordList">
                                <div className="levelRecord">
                                    <section className="allPlayerInfo">
                                        <a id="levelRec">Total Victor: {data[id].length}</a>
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
                    <title>{id}' Victor - Demon List VN</title>
                </Head>
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
            </>

        );
    }

}

export default Main;