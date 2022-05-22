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
    const [list, setList] = useState('');
    const [percentloaded, setPercentloaded] = useState(0);
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
            setPercentloaded(17);
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
            setPercentloaded(34);
            a = {}
            const FDLVNPlayerData = await getDocs(FDLVNPlayerRef);
            FDLVNPlayerData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setFDLVNPlayer(a);
            setPercentloaded(51);
            a = {}
            const FDLVNLegacyData = await getDocs(FDLVNLegacyRef);
            FDLVNLegacyData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setFDLVNLegacy(a);
            setPercentloaded(68);
            a = {}
            const auData = await getDocs(auRef);
            auData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setAu(a);
            setPercentloaded(85);
            a = {}
            const playerData = await getDocs(playerRef);
            playerData.forEach(doc => {
                a[doc.id] = doc.data();
            }
            );
            setPlayer(a);
            setPercentloaded(100);
            a = {}
        }
        getData()
    }, [])

    async function addData(){
        await setDoc(doc(db, "DLVN", 'index'), DLVN.index);
        await setDoc(doc(db, "DLVNPlayer", 'index'), DLVNPlayer.index);
        await setDoc(doc(db, "FDLVN", 'index'), FDLVN.index);
        await setDoc(doc(db, "FDLVNPlayer", 'index'), FDLVNPlayer.index);
        await setDoc(doc(db, "FDLVNLegacy", 'index'), FDLVNLegacy.index);
        await setDoc(doc(db, "auth", 'index'), au.index);
        await setDoc(doc(db, "player", 'index'), player.index);

        await setDoc(doc(db, "DLVN", 'list'), Object.assign({},DLVN.index));
        await setDoc(doc(db, "DLVNPlayer", 'list'), Object.assign({},DLVNPlayer.index));
        await setDoc(doc(db, "FDLVN", 'list'), Object.assign({},FDLVN.index));
        await setDoc(doc(db, "FDLVNPlayer", 'list'), Object.assign({},FDLVNPlayer.index));
        await setDoc(doc(db, "FDLVNLegacy", 'list'), Object.assign({},FDLVNLegacy.index));
        await setDoc(doc(db, "auth", 'list'), Object.assign({},au.index));
        await setDoc(doc(db, "player", 'list'), Object.assign({},player.index));
    }

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

    function showModal1() {
        if (modal) {
            if (list == 'FDLVN') return (
                <div className="popup">
                    <div className="overlay">
                        <div className="popupContent">
                            <h2>Edit level info</h2>
                            <a id='close' onClick={() => { setModal(!modal) }}>x</a>
                            <label for="lvname">Level name: </label>
                            <input type="text" id="lvname" name="lvname" defaultValue={d.name} ></input><br />
                            <label for="creator">Level creator: </label>
                            <input type="text" id="creator" name="creator" defaultValue={d.creator} ></input><br />
                            <label for="top">Top: </label>
                            <input type="text" id="top" name="top" defaultValue={d.top} ></input><br />
                            <label for="verifier">Verifier: </label>
                            <input type="text" id="verifier" name="verifier" defaultValue={d.verifier} ></input><br />
                            <label for="lvid">ID: </label>
                            <input type="text" id="lvid" name="lvid" defaultValue={d.id} ></input><br />
                            <label for="thumbnail">Youtube video ID: </label>
                            <input type="text" id="thumbnail" name="thumbnail" defaultValue={d.thumbnail} ></input><br />
                            <label for="LDM">LDM: </label>
                            <input type="text" id="LDM" name="LDM" defaultValue={JSON.stringify(d.ldm).substring(1, JSON.stringify(d.ldm).length - 1)}></input><br />
                            <label>Victor: </label><button>Add victor</button><hr></hr>
                            <div className={`victor`} style={{ display: "none" }}>
                                <label for={`userName`}>Player name:  </label>
                                <input type="text" id={`userName`} name={`userName`}></input><br />
                                <label for={`percent`}>Percent:  </label>
                                <input type="text" id={`percent`} name={`percent`}></input><br />
                                <label for={`YTLink`}>Video Link:  </label>
                                <input type="text" id={`YTLink`} name={`YTLink`}></input><br />
                                <label for={`hz`}>HZ:  </label>
                                <input type="text" id={`hz`} name={`hz`}></input><br />
                                <button>Add</button>
                                <button>Cancel</button>
                                <hr />
                            </div>
                            <div className="victorCard">
                                {
                                    Object.keys(d.vids).map((i) => {
                                        function update1() {

                                        }
                                        function delete2() {

                                        }
                                        return (
                                            <>
                                                <div className={`victor${i}`}>
                                                    <label for={`userName${i}`}>Player name:  </label>
                                                    <input type="text" id={`userName${i}`} name={`userName${i}`} defaultValue={d.vids[i].user}></input><br />
                                                    <label for={`YTLink${i}`}>Video Link:  </label>
                                                    <input type="text" id={`YTLink${i}`} name={`YTLink${i}`} defaultValue={d.vids[i].link}></input><br />
                                                    <button onClick={update1}>Update</button>
                                                    <button onClick={delete2}>Delete</button>
                                                    <hr />
                                                </div>

                                            </>

                                        )
                                    })}

                            </div>
                            <br /><button>Update</button><br /><br /><br /><br />
                            <button>Delete level</button>
                        </div>
                    </div>
                </div>
            )
            else if (list == 'FDLVNLegacy') return (
                <div className="popup">
                    <div className="overlay">
                        <div className="popupContent">
                            <h2>Edit level info</h2>
                            <a id='close' onClick={() => { setModal(!modal) }}>x</a>
                            <label for="lvname">Level name: </label>
                            <input type="text" id="lvname" name="lvname" defaultValue={d.name} ></input><br />
                            <label for="creator">Level creator: </label>
                            <input type="text" id="creator" name="creator" defaultValue={d.creator} ></input><br />
                            <label for="verifier">Verifier: </label>
                            <input type="text" id="verifier" name="verifier" defaultValue={d.verifier} ></input><br />
                            <label for="lvid">ID: </label>
                            <input type="text" id="lvid" name="lvid" defaultValue={d.id} ></input><br />
                            <label for="thumbnail">Youtube video ID: </label>
                            <input type="text" id="thumbnail" name="thumbnail" defaultValue={d.thumbnail} ></input><br />
                            <label for="LDM">LDM: </label>
                            <input type="text" id="LDM" name="LDM" defaultValue={JSON.stringify(d.ldm).substring(1, JSON.stringify(d.ldm).length - 1)}></input><br />
                            <br /><button>Update</button><br /><br /><br /><br />
                            <button>Delete level</button>
                        </div>
                    </div>
                </div>
            )
            else if (list == 'DLVN') return (
                <div className="popup">
                    <div className="overlay">
                        <div className="popupContent">
                            <h2>Edit level info</h2>
                            <a id='close' onClick={() => { setModal(!modal) }}>x</a>
                            <label for="lvname">Level name: </label>
                            <input type="text" id="lvname" name="lvname" defaultValue={d.name}></input><br />
                            <label for="creator">Level creator: </label>
                            <input type="text" id="creator" name="creator" defaultValue={d.creator}></input><br />
                            <label for="top">Top: </label>
                            <input type="text" id="top" name="top" defaultValue={d.top}></input><br />
                            <label for="lvid">ID: </label>
                            <input type="text" id="lvid" name="lvid" defaultValue={d.id}></input><br />
                            <label for="thumbnail">Youtube video ID: </label>
                            <input type="text" id="thumbnail" name="thumbnail" defaultValue={d.thumbnail}></input><br />
                            <label for="firstVictor">First Victor: </label>
                            <input type="text" id="firstVictor" name="firstVictor" defaultValue={d.firstVictor}></input><br />
                            <label for="percentToQualify">Percent to qualify: </label>
                            <input type="text" id="percentToQualify" name="percentToQualify" defaultValue={d.percentToQualify}></input><br />
                            <label>Victor: </label><button>Add victor</button><hr></hr>
                            <div className={`victor`} style={{ display: "none" }}>
                                <label for={`userName`}>Player name:  </label>
                                <input type="text" id={`userName`} name={`userName`}></input><br />
                                <label for={`percent`}>Percent:  </label>
                                <input type="text" id={`percent`} name={`percent`}></input><br />
                                <label for={`YTLink`}>Video Link:  </label>
                                <input type="text" id={`YTLink`} name={`YTLink`}></input><br />
                                <label for={`hz`}>HZ:  </label>
                                <input type="text" id={`hz`} name={`hz`}></input><br />
                                <button>Add</button>
                                <button>Cancel</button>
                                <hr />
                            </div>
                            <div className="victorCard">
                                {
                                    Object.keys(d.vids).map((i) => {
                                        function update1() {

                                        }
                                        function delete2() {

                                        }
                                        return (
                                            <>
                                                <div className={`victor${i}`}>
                                                    <label for={`userName${i}`}>Player name:  </label>
                                                    <input type="text" id={`userName${i}`} name={`userName${i}`} defaultValue={d.vids[i].user}></input><br />
                                                    <label for={`percent${i}`}>Percent:  </label>
                                                    <input type="text" id={`percent${i}`} name={`percent${i}`} defaultValue={d.vids[i].percent}></input><br />
                                                    <label for={`YTLink${i}`}>Video Link:  </label>
                                                    <input type="text" id={`YTLink${i}`} name={`YTLink${i}`} defaultValue={d.vids[i].link}></input><br />
                                                    <label for={`hz${i}`}>HZ:  </label>
                                                    <input type="text" id={`hz${i}`} name={`hz${i}`} defaultValue={d.vids[i].hz}></input><br />
                                                    <button onClick={update1}>Update</button>
                                                    <button onClick={delete2}>Delete</button>
                                                    <hr />
                                                </div>

                                            </>

                                        )
                                    })}

                            </div>
                            <br /><button>Update</button><br /><br /><br /><br />
                            <button>Delete level</button>
                        </div>
                    </div>
                </div>
            )
            else if (list == 'player') {
                var name = ''
                if (d[0] != undefined) name = d[0].name
                else name = d[1].name
                console.log(player.index)
                return (
                    <div className="popup">
                        <div className="overlay">
                            <div className="popupContent">
                                <h2>Edit level info</h2>
                                <a id='close' onClick={() => { setModal(!modal) }}>x</a>
                                <label for="playerName">Player name: </label>
                                <input type="text" id="playerName" name="playerName" defaultValue={name} ></input><br />
                                <label for="playerAvatar">Avatar: </label>
                                <input type="text" id="playerAvatar" name="playerAvatar" defaultValue={player.index[name].avatar} ></input><br />
                                <label for="facebook">Facebook: </label>
                                <input type="text" id="facebook" name="facebook" defaultValue={player.index[name].facebook} ></input><br />
                                <label for="youtube">Youtube: </label>
                                <input type="text" id="youtube" name="youtube" defaultValue={player.index[name].youtube} ></input><br />
                                <label for="discordTag">Discord: </label>
                                <input type="text" id="discordTag" name="discordTag" defaultValue={player.index[name].discord} ></input><br />
                                <br /><button>Update</button><br /><br /><br /><br />
                                <button>Delete level</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    function showModal(x, y) {
        setD(x)
        setList(y)
        setModal(!modal)
    }
    function showData() {
        if (player.list == undefined) return (<div>Loading {percentloaded}%</div>)
        else return (
            <div className="adminMainpanel">
                <div className="lvDat">
                    {showModal1()}
                    <h2>FDLVN</h2>
                    {Object.keys(FDLVN.list).map(i => {
                        return (
                            <p><a href="#!" onClick={() => showModal(FDLVN.list[i], 'FDLVN')}>#{FDLVN.list[i].top} {FDLVN.list[i].name}</a></p>
                        )
                    })}
                </div>
                <div className="lvDat">
                    <h2>FDLVN Legacy</h2>
                    {Object.keys(FDLVNLegacy.list).map(i => {
                        return (
                            <p><a href="#!" onClick={() => showModal(FDLVNLegacy.list[i], 'FDLVNLegacy')}>{FDLVNLegacy.list[i].name}</a></p>
                        )
                    })}
                </div>
                <div className="lvDat">
                    <h2>DLVN</h2>
                    {Object.keys(DLVN.list).map(i => {
                        return (
                            <p><a href="#!" onClick={() => showModal(DLVN.list[i], 'DLVN')}>#{DLVN.list[i].top} {DLVN.list[i].name}</a></p>
                        )
                    })}
                </div>
                <div className="lvDat">
                    <h2>Player</h2>
                    {Object.keys(player.list).map(i => {
                        function getInfo() {
                            const a = FDLVNPlayer.index[player.list[i].name]
                            const b = DLVNPlayer.index[player.list[i].name]
                            return [a, b]
                        }
                        return (
                            <p><a href="#!" onClick={() => showModal(getInfo(), 'player')}>{player.list[i].name}</a></p>
                        )
                    })}
                </div>
            </div>
        )

    }

    if (user != null) {
        if (player.list == undefined) return (<div>Loading {percentloaded}%</div>)
        else return (
            <div className="adminMainpanel">
                <button onClick={logIn}>Log In</button>
            </div>
        )
    }

    return (
        <>
            {showData()}
        </>
    )

}
export default Main