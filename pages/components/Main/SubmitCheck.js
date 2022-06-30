import { doc, setDoc, onSnapshot } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function Main() {
    const [data, setData] = useState();
    const [lvDat, setLvDat] = useState();
    const [lvDat1, setLvDat1] = useState();
    const [au, setAu] = useState({});
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    useEffect(() => {
        const dat0 = onSnapshot(doc(db, "submit", 'FDLVN'), (doc) => {
            setData(doc.data());
        })
        const dat1 = onSnapshot(doc(db, 'FDLVN', 'index'), (doc) => {
            setLvDat(doc.data());
        })
        const dat2 = onSnapshot(doc(db, 'FDLVN', 'list'), (doc) => {
            setLvDat1(doc.data());
        })
        const dat3 = onSnapshot(doc(db, "auth", 'admin'), (doc) => {
            setAu(doc.data());
        })

        return () => {
            dat0();
            dat1();
            dat2();
            dat3();
        }
    }, [])
    function logIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setUser(user)
                console.log(user)
            }).catch((error) => {

            });
    }
    async function approve(i) {
        if (data[i].id in lvDat) {
            var isNeedUpdate = false
            for(const j in lvDat[data[i].id].vids){
                if(lvDat[data[i].id].vids[j].user == data[i].vids.user){
                    lvDat[data[i].id].vids[j] = data[i].vids
                    isNeedUpdate = true
                }
            }
            if(!isNeedUpdate){
                lvDat[data[i].id].vids.push(data[i].vids);
                for (const j in lvDat1) {
                    if (lvDat1[j].id == data[i].id) {
                        lvDat1[j].vids.push(data[i].vids);
                    }
                }
            }
            console.log(lvDat[data[i].id])
            delete data[i];
            await setDoc(doc(db, "submit", 'FDLVN'), data);
            await setDoc(doc(db, "FDLVN", 'index'), lvDat);
            await setDoc(doc(db, "FDLVN", 'list'), lvDat1);
            return
        }
        alert('The level does not exist. Please add the level first.');
    }
    async function reject(i) {
        delete data[i];
        await setDoc(doc(db, "submit", 'FDLVN'), data);
    }
    if (user == null) {
        return (
            <div className="adminMainpanel">
                <button onClick={logIn}>Log In</button>
            </div>
        )
    }
    if (data && lvDat) {
        if (user.email in au) {
            function getLvInfo(i) {
                if (lvDat[i]) {
                    return lvDat[i].name;
                } else {
                    return "(Level does not exist)";
                }
            }
            if (Object.keys(data).length == 0) {
                return (
                    <>
                        <div className='mainpanelNoMargin'>
                            <div className="submission">
                                <h2>FDLVN Submission</h2>
                                <i><p id='center-text'>After checked all submissions, please go to <b><a href='/Admin'>Admin page and</a></b> click on <b>Upload Change</b> button to update players points (this page only add levels to players record list)</p></i>
                                <p id='center-text'>All done!</p>
                            </div>
                        </div>
                    </>
                )
            }
            function getHz(i) {
                if (data[i].vids.hz) {
                    return `(${data[i].vids.hz})`;
                } else {
                    return '';
                }
            }
            function getPercent(i) {
                if (data[i].vids.percent) {
                    return `(${data[i].vids.percent}%)`;
                } else {
                    return '';
                }
            }
            function getComment(i){
                if(data[i].comment == undefined || data[i].comment.length == 0){
                    return "(No comment provided)"
                }
                return data[i].comment
            }
            return (
                <>
                    <div className='mainpanelNoMargin'>
                        <div className="submission">
                            <h2>FDLVN Submission</h2>
                            <i><p id='center-text'>After checked all submissions, please go to <b><a href='/Admin'>Admin page and</a></b> click on <b>Upload Change</b> button to update players points (this page only add levels to players record list)</p></i>
                            <p id='center-text'>Total submission: {Object.keys(data).length}</p>
                            {Object.keys(data).map(i => {
                                return (
                                    <div className='submissionCard'>
                                        <h3>{data[i].vids.user}</h3>
                                        <a href={`/mainlist/${data[i].id}`} target='_blank' title='View level page'>Level: {getLvInfo(data[i].id)} - </a>{data[i].id}<br></br><br></br>
                                        <a href={data[i].vids.link} target='_blank' title='View completion video'>{data[i].vids.link} {getHz(i)} {getPercent(i)}</a><br></br><br></br>
                                        <a>Comment: {getComment(i)}</a><br></br><br></br>
                                        <button onClick={() => reject(i)}>Reject</button><a> </a>
                                        <button onClick={() => approve(i)}>Approve</button>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <p>You do not have permission to access this page.</p>
        </>
    )
}

export default Main;