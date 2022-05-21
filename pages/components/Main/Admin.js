import { doc, collection, getDocs, setDoc, query } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function Main() {
    const [DLVN, setDLVN] = useState({});
    const [DLVNPlayer, setDLVNPlayer] = useState({});
    const [FDLVN, setFDLVN] = useState({});
    const [FDLVNPlayer, setFDLVNPlayer] = useState({});
    const [FDLVNLegacy, setFDLVNLegacy] = useState({});
    const [au, setAu] = useState({});
    const [user, setUser] = useState(null);
    const [player, setPlayer] = useState({});
    const [modal, setModal] = useState(false);
    const [d, setD] = useState([]);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    useEffect(() => {
        async function getData() {
            const DLVNRef = query(collection(db, 'DLVN'));
            const DLVNPlayerRef = query(collection(db, 'DLVNPlayer'));
            const FDLVNRef = query(collection(db, 'FDLVN'));
            const FDLVNPlayerRef = query(collection(db, 'FDLVNPlayer'));
            const FDLVNLegacyRef = query(collection(db, 'FDLVNLegacy'));
            const auRef = query(collection(db, 'auth'));
            const playerRef = query(collection(db, 'player'));
            const DLVNData = await getDocs(DLVNRef);
            var a = {};
            DLVNData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setDLVN(a);
            a = {}
            const DLVNPlayerData = await getDocs(DLVNPlayerRef);
            DLVNPlayerData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setDLVNPlayer(a);
            a = {}
            const FDLVNData = await getDocs(FDLVNRef);
            FDLVNData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setFDLVN(a);
            a = {}
            const FDLVNPlayerData = await getDocs(FDLVNPlayerRef);
            FDLVNPlayerData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setFDLVNPlayer(FDLVNPlayer);
            a = {}
            const FDLVNLegacyData = await getDocs(FDLVNLegacyRef);
            FDLVNLegacyData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setFDLVNLegacy(a);
            a = {}
            const auData = await getDocs(auRef);
            auData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setAu(a);
            a = {}
            const playerData = await getDocs(playerRef);
            playerData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setPlayer(a);
            a = {}
        }
        getData()
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

    function showModal1(){
        if(modal) return (
            <div className="popup">
                <div className="overlay">
                    <div className="popupContent">
                        <h2>Edit level info</h2>
                        <a id='close' onClick={() => { setModal(!modal) }}>x</a>
                        <label for="lvname">Level name: </label>
                        <input type="text" id="lvname" name="lvname" defaultValue={d.name} readOnly></input><br />
                        <label for="creator">Level creator: </label>
                        <input type="text" id="creator" name="creator" defaultValue={d.creator} readOnly></input><br />
                        <label for="top">Top: </label>
                        <input type="text" id="top" name="top" defaultValue={d.top} readOnly></input><br />
                        <label for="verifier">Verifier: </label>
                        <input type="text" id="verifier" name="verifier" defaultValue={d.verifier} readOnly></input><br />
                        <label for="lvid">ID: </label>
                        <input type="text" id="lvid" name="lvid" defaultValue={d.id} readOnly></input><br />
                        <label for="thumbnail">Youtube video ID: </label>
                        <input type="text" id="thumbnail" name="thumbnail" defaultValue={d.thumbnail} readOnly></input><br />
                        <label for="LDM">LDM: </label>
                        <input type="text" id="LDM" name="LDM" defaultValue={JSON.stringify(d.ldm).substring(1, JSON.stringify(d.ldm).length - 1)}></input><br />
                        <br /><button>Update</button>
                    </div>
                </div>
            </div>
        )
    }
    function showModal(x){
        setD(x)
        setModal(!modal)
    }
    function showData(){
        if (player.list == undefined) return (<div>Loading...</div>)
        else return (
            <div className="adminMainpanel">
                <div className="lvDat">
                    {showModal1()}
                    <h2>FDLVN</h2>
                    {Object.keys(FDLVN.list).map(i => {
                        return(
                            <p><a href="#!" onClick={() => showModal(FDLVN.list[i])}>#{FDLVN.list[i].top} {FDLVN.list[i].name}</a></p>
                        )
                    })}
                </div>
                <div className="lvDat">
                    <h2>FDLVN Legacy</h2>
                    {Object.keys(FDLVNLegacy.list).map(i => {
                        return(
                            <p><a href="#!" onClick={() => showModal(FDLVNLegacy.list[i])}>{FDLVNLegacy.list[i].name}</a></p>
                        )
                    })}
                </div>
                <div className="lvDat">
                    <h2>DLVN</h2>
                    {Object.keys(DLVN.list).map(i => {
                        return(
                            <p><a href="#!" onClick={() => showModal(DLVN.list[i])}>#{DLVN.list[i].top} {DLVN.list[i].name}</a></p>
                        )
                    })}
                </div>
                <div className="lvDat">
                    <h2>Player</h2>
                    {Object.keys(player.list).map(i => {
                        return(
                            <p><a href="#!" onClick={() => showModal(player.list[i])}>{player.list[i]}</a></p>
                        )
                    })}
                </div>
            </div>
        )
        
    }
    
    if (user != null) {
        return (
            <div className="adminMainpanel">
                <button onClick={logIn}>Log In</button>
            </div>
        )
    }
    
    return(
        <>
            {showData()}
        </>
    )

}
export default Main