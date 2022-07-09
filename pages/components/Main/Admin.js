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
    const [addLv, setAddLv] = useState(false);
    const [d, setD] = useState([]);
    const [list, setList] = useState('');
    const [status, setStatus] = useState('Up to date');
    const [prevName, setPrevName] = useState('');
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

    async function addData() {
        setStatus('Updating player data...');
        for(const i in DLVNPlayer.index){
            try{
                DLVNPlayer.index[i].points = 0
                DLVNPlayer.index[i].bestplayPt = 0
                DLVNPlayer.index[i].vids = {}
                DLVNPlayer.index[i].lv = []
            }
            catch(err){
                console.error(err)
            }
        }
        for(const i in DLVN.list){
            for(const j in DLVN.list[i].vids){
                if(DLVN.list[i].vids[j].user in player.index == false){
                    player.index[DLVN.list[i].vids[j].user] = {
                        "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfCfynXv42fOnrTQAs-99j09O8uz7mDilOQ&usqp=CAU",
                        "name": DLVN.list[i].vids[j].user,
                        "social": {
                            "youtube": "",
                            "facebook": "",
                            "discord": ""
                        }
                    }
                    DLVNPlayer.index[DLVN.list[i].vids[j].user] = {
                        "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfCfynXv42fOnrTQAs-99j09O8uz7mDilOQ&usqp=CAU",
                        'bestplay': "",
                        'bestplayCreator': '',
                        'bestplayPt': 0,
                        'bestplayThumbnail': '',
                        'lv':[],
                        'name': DLVN.list[i].vids[j].user,
                        'points': 0,
                        'top': 0,
                        'vids':{}
                    }
                }
                if(DLVNPlayer.index[DLVN.list[i].vids[j].user] == undefined){
                    DLVNPlayer.index[DLVN.list[i].vids[j].user] = {
                        avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfCfynXv42fOnrTQAs-99j09O8uz7mDilOQ&usqp=CAU",
                        bestplay:'none',
                        bestplayCreator:'none',
                        bestplayPt:0,
                        bestplayThumbnail:'none',
                        lv:[],
                        name:DLVN.list[i].vids[j].user,
                        points:0,
                        top:0,
                        vids:{}
                    }
                }

                DLVNPlayer.index[DLVN.list[i].vids[j].user].points += DLVN.list[i].points * (parseInt(DLVN.list[i].vids[j].percent) / 100)
                DLVNPlayer.index[DLVN.list[i].vids[j].user].points = Math.round(DLVNPlayer.index[DLVN.list[i].vids[j].user].points * 100) / 100
                DLVNPlayer.index[DLVN.list[i].vids[j].user].vids[parseInt(DLVN.list[i].id)] = DLVN.list[i].vids[j]
                DLVNPlayer.index[DLVN.list[i].vids[j].user].lv.push(parseInt(DLVN.list[i].id))

                if(DLVN.list[i].points > DLVNPlayer.index[DLVN.list[i].vids[j].user].bestplayPt){
                    DLVNPlayer.index[DLVN.list[i].vids[j].user].bestplayPt = DLVN.list[i].points
                    DLVNPlayer.index[DLVN.list[i].vids[j].user].bestplay = DLVN.list[i].name
                    DLVNPlayer.index[DLVN.list[i].vids[j].user].bestplayCreator = DLVN.list[i].creator
                    DLVNPlayer.index[DLVN.list[i].vids[j].user].bestplayThumbnail = DLVN.list[i].thumbnail
                }
            }
        }
        DLVNPlayer.list = Object.values(DLVNPlayer.index)
        DLVNPlayer.list.sort((a, b) => {
            return b.points - a.points
        })
        for(let i = 0; i < DLVNPlayer.list.length; i++){
            DLVNPlayer.list[i].top = i + 1
        }
        DLVNPlayer.list = Object.assign({}, DLVNPlayer.list)
        
        for(const i in FDLVNPlayer.index){
            try{
                FDLVNPlayer.index[i].points = 0
                FDLVNPlayer.index[i].bestplayPt = 0
                FDLVNPlayer.index[i].vids = {}
                FDLVNPlayer.index[i].lv = []
            }
            catch(err){
                console.error(err)
            }
        }
        for(const i in FDLVN.list){
            for(const j in FDLVN.list[i].vids){
                if(FDLVN.list[i].vids[j].user in player.index == false){
                    player.index[FDLVN.list[i].vids[j].user] = {
                        "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfCfynXv42fOnrTQAs-99j09O8uz7mDilOQ&usqp=CAU",
                        "name": FDLVN.list[i].vids[j].user,
                        "social": {
                            "youtube": "",
                            "facebook": "",
                            "discord": ""
                        }
                    }
                    FDLVNPlayer.index[FDLVN.list[i].vids[j].user] = {
                        "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfCfynXv42fOnrTQAs-99j09O8uz7mDilOQ&usqp=CAU",
                        'bestplay': "",
                        'bestplayCreator': '',
                        'bestplayPt': 0,
                        'bestplayThumbnail': '',
                        'lv':[],
                        'name': FDLVN.list[i].vids[j].user,
                        'points': 0,
                        'top': 0,
                        'vids':{}
                    }
                }
                if(FDLVNPlayer.index[FDLVN.list[i].vids[j].user] == undefined){
                    FDLVNPlayer.index[FDLVN.list[i].vids[j].user] = {
                        avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfCfynXv42fOnrTQAs-99j09O8uz7mDilOQ&usqp=CAU",
                        bestplay:'none',
                        bestplayCreator:'none',
                        bestplayPt:0,
                        bestplayThumbnail:'none',
                        lv:[],
                        name:FDLVN.list[i].vids[j].user,
                        points:0,
                        top:0,
                        vids:{}
                    }
                }
                FDLVNPlayer.index[FDLVN.list[i].vids[j].user].points += FDLVN.list[i].points
                FDLVNPlayer.index[FDLVN.list[i].vids[j].user].points = Math.round(FDLVNPlayer.index[FDLVN.list[i].vids[j].user].points * 100) / 100
                FDLVNPlayer.index[FDLVN.list[i].vids[j].user].vids[parseInt(FDLVN.list[i].id)] = FDLVN.list[i].vids[j]
                FDLVNPlayer.index[FDLVN.list[i].vids[j].user].lv.push(parseInt(FDLVN.list[i].id))

                if(FDLVN.list[i].points > FDLVNPlayer.index[FDLVN.list[i].vids[j].user].bestplayPt){
                    FDLVNPlayer.index[FDLVN.list[i].vids[j].user].bestplayPt = FDLVN.list[i].points
                    FDLVNPlayer.index[FDLVN.list[i].vids[j].user].bestplay = FDLVN.list[i].name
                    FDLVNPlayer.index[FDLVN.list[i].vids[j].user].bestplayCreator = FDLVN.list[i].creator
                    FDLVNPlayer.index[FDLVN.list[i].vids[j].user].bestplayThumbnail = FDLVN.list[i].thumbnail
                }
            }
        }
        FDLVNPlayer.list = Object.values(FDLVNPlayer.index)
        FDLVNPlayer.list.sort((a, b) => {
            return b.points - a.points
        })
        for(let i = 0; i < FDLVNPlayer.list.length; i++){
            FDLVNPlayer.list[i].top = i + 1
        }
        FDLVNPlayer.list = Object.assign({}, FDLVNPlayer.list)
        setStatus(`Uploading changes...`)
        await setDoc(doc(db, "DLVN", 'index'), DLVN.index);
        await setDoc(doc(db, "DLVNPlayer", 'index'), DLVNPlayer.index);
        await setDoc(doc(db, "FDLVN", 'index'), FDLVN.index);
        await setDoc(doc(db, "FDLVNPlayer", 'index'), FDLVNPlayer.index);
        await setDoc(doc(db, "FDLVNLegacy", 'index'), FDLVNLegacy.index);
        //await setDoc(doc(db, "auth", 'index'), au.index);
        await setDoc(doc(db, "player", 'index'), player.index);
        await setDoc(doc(db, "DLVN", 'list'), DLVN.list);
        await setDoc(doc(db, "DLVNPlayer", 'list'), DLVNPlayer.list);
        await setDoc(doc(db, "FDLVN", 'list'), FDLVN.list);
        await setDoc(doc(db, "FDLVNPlayer", 'list'), FDLVNPlayer.list);
        await setDoc(doc(db, "FDLVNLegacy", 'list'), FDLVNLegacy.list);
        //await setDoc(doc(db, "auth", 'list'), Object.assign({}, au.index));
        setStatus('Up to date')
    }
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function getJSON() {
        var a = {};
        a.DLVN = DLVN;
        a.DLVNPlayer = DLVNPlayer;
        a.FDLVN = FDLVN;
        a.FDLVNPlayer = FDLVNPlayer;
        a.FDLVNLegacy = FDLVNLegacy;
        a.au = au;
        a.player = player;
        const j = JSON.stringify(a);
        download('data.json', j)
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
            }).catch((error) => {

            });
    }

    function showModal1() {
        if (modal) {
            if (list == 'FDLVN') {
                async function update() {
                    const prevTop = d.top
                    d.name = document.getElementById('lvname').value;
                    d.creator = document.getElementById('creator').value;
                    d.top = parseInt(document.getElementById('top').value);
                    d.verifier = document.getElementById('verifier').value;
                    d.id = document.getElementById('lvid').value;
                    d.thumbnail = document.getElementById('thumbnail').value;
                    d.ldm = JSON.parse('[' + document.getElementById('LDM').value + ']');
                    if(!addLv){
                        delete FDLVN.list[parseInt(prevTop) - 1];
                        delete FDLVN.index[parseInt(d.id)];
                    }
                    setModal(0);
                    FDLVN.list = Object.assign({}, Object.values(FDLVN.list));
                    for (const i in FDLVN.list) {
                        FDLVN.list[i].top = parseInt(i) + 1;
                    }
                    const d1 = Object.values(FDLVN.list);
                    d.top = parseInt(d.top) - 0.5
                    d1.push(d)
                    d1.sort((a, b) => (a.top > b.top) ? 1 : -1)
                    for (const i in d1) {
                        d1[i].top = parseInt(i) + 1;
                        d1[i].points = Math.round((2100 / (0.3 * parseInt(d1[i].top) + 9) - 80) * 100) / 100;
                    }
                    FDLVN.list = Object.assign({}, d1);
                    FDLVN.index[parseInt(d.id)] = d;
                    setModal(0);
                    setStatus('Not up to date')
                }
                async function delete0() {
                    const prevTop = d.top
                    delete FDLVN.list[parseInt(prevTop) - 1];
                    delete FDLVN.index[parseInt(d.id)];
                    setModal(0);
                    FDLVN.list = Object.assign({}, Object.values(FDLVN.list));
                    for (const i in FDLVN.list) {
                        FDLVN.list[i].top = parseInt(i) + 1;
                        FDLVN.list[i].points = Math.round((2100 / (0.3 * parseInt(FDLVN.list[i].top) + 9) - 80) * 100) / 100;
                    }
                    setStatus('Not up to date')
                }
                return (
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
                                                d.vids[i].user = document.getElementById(`userName${i}`).value;
                                                d.vids[i].link = document.getElementById(`YTLink${i}`).value;
                                                setStatus('Not up to date')
                                            }
                                            function delete2() {
                                                d.vids.splice(i, 1);
                                                setModal(0);
                                                setStatus('Not up to date')
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
                                <br /><button onClick={() => update()}>Update</button><br /><br /><br /><br />
                                <button onClick={() => delete0()}>Delete level</button>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (list == 'FDLVNLegacy') {
                async function update() {
                    d.name = document.getElementById('lvname').value;
                    d.creator = document.getElementById('creator').value;
                    d.verifier = document.getElementById('verifier').value;
                    d.id = document.getElementById('lvid').value;
                    d.thumbnail = document.getElementById('thumbnail').value;
                    d.ldm = JSON.parse('[' + document.getElementById('LDM').value + ']');
                    FDLVNLegacy.index[parseInt(d.id)] = d;
                    var l = false
                    for (const i in FDLVNLegacy.list) {
                        if (FDLVNLegacy.list[i].id == d.id) {
                            FDLVNLegacy.list[i] = d;
                            l = true
                        }
                    }
                    if (!l) {
                        FDLVNLegacy.list = Object.values(FDLVNLegacy.list)
                        FDLVNLegacy.list.unshift(d)
                        FDLVNLegacy.list = Object.assign({}, FDLVNLegacy.list)
                    }
                    setModal(0);
                    setStatus('Not up to date')
                }
                async function delete0() {
                    delete FDLVNLegacy.index[parseInt(d.id)];
                    for (const i in FDLVNLegacy.list) {
                        if (FDLVNLegacy.list[i].id == d.id) {
                            delete FDLVNLegacy.list[i];
                        }
                    }
                    setModal(0);
                    setStatus('Not up to date')
                }
                return (
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
                                                d.vids[i].user = document.getElementById(`userName${i}`).value;
                                                d.vids[i].link = document.getElementById(`YTLink${i}`).value;
                                                setStatus('Not up to date')
                                            }
                                            function delete2() {
                                                d.vids.splice(i, 1);
                                                setModal(0);
                                                setStatus('Not up to date')
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

                                <br /><button onClick={() => update()}>Update</button><br /><br /><br /><br />
                                <button onClick={() => delete0()}>Delete level</button>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (list == 'DLVN') {
                function roundNumber(num, scale) {
                    if (!("" + num).includes("e")) {
                        return +(Math.round(num + "e+" + scale) + "e-" + scale);
                    } else {
                        var arr = ("" + num).split("e");
                        var sig = ""
                        if (+arr[1] + scale > 0) {
                            sig = "+";
                        }
                        return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
                    }
                }
                function getPoint(rank) {
                    return roundNumber((100 / Math.sqrt(((rank - 1) / 50) + 0.444444)) - 50, 3);
                }
                async function update() {
                    const prevTop = d.top
                    d.name = document.getElementById('lvname').value;
                    d.creator = document.getElementById('creator').value;
                    d.top = parseInt(document.getElementById('top').value);
                    d.firstVictor = document.getElementById('firstVictor').value;
                    d.id = document.getElementById('lvid').value;
                    d.thumbnail = document.getElementById('thumbnail').value;
                    d.percentToQualify = parseInt(document.getElementById('percentToQualify').value);
                    if(!addLv){
                        delete FDLVN.list[parseInt(prevTop) - 1];
                        delete FDLVN.index[parseInt(d.id)];
                    }
                    setModal(0);
                    DLVN.list = Object.assign({}, Object.values(DLVN.list));
                    for (const i in DLVN.list) {
                        DLVN.list[i].top = parseInt(i) + 1;
                    }
                    const d1 = Object.values(DLVN.list);
                    d.top = parseInt(d.top) - 0.5
                    d1.push(d)
                    d1.sort((a, b) => (a.top > b.top) ? 1 : -1)
                    for (const i in d1) {
                        d1[i].top = parseInt(i) + 1;
                        d1[i].points = getPoint(parseInt(i) + 1);
                    }
                    DLVN.list = Object.assign({}, d1);
                    DLVN.index[parseInt(d.id)] = d;
                    setModal(0);
                    setStatus('Not up to date')
                }
                async function delete0() {
                    const prevTop = d.top
                    delete DLVN.list[parseInt(prevTop) - 1];
                    delete DLVN.index[parseInt(d.id)];
                    setModal(0);
                    DLVN.list = Object.assign({}, Object.values(DLVN.list));
                    for (const i in DLVN.list) {
                        DLVN.list[i].top = parseInt(i) + 1;
                        DLVN.list[i].points = getPoint(parseInt(i) + 1);
                    }
                    setStatus('Not up to date')
                }
                return (
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
                                                d.vids[i].user = document.getElementById(`userName${i}`).value;
                                                d.vids[i].link = document.getElementById(`YTLink${i}`).value;
                                                d.vids[i].percent = parseInt(document.getElementById(`percent${i}`).value);
                                                d.vids[i].hz = document.getElementById(`hz${i}`).value;
                                                setStatus('Not up to date')
                                            }
                                            function delete2() {
                                                d.vids.splice(i, 1);
                                                setModal(0);
                                                setStatus('Not up to date')
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
                                <br /><button onClick={update}>Update</button><br /><br /><br /><br />
                                <button onClick={delete0}>Delete level</button>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (list == 'player') {
                var name = ''
                if (d[0] != undefined) name = d[0].name
                else name = d[1].name
                function update() {
                    const d1 = {}
                    d1.avatar = document.getElementById('playerAvatar').value;
                    d1.name = document.getElementById('playerName').value;
                    d1.social = {}
                    d1.social.youtube = document.getElementById('youtube').value;
                    d1.social.facebook = document.getElementById('facebook').value;
                    d1.social.discord = document.getElementById('discordTag').value;
                    player.index[d1.name] = d1
                    for (const i in player.index) {
                        if (player.index[i].name == d1.name) {
                            player.index[i] = d1
                        }
                    }
                    if(d1.name in FDLVNPlayer.index){
                        FDLVNPlayer.index[d1.name].avatar = d1.avatar
                    }
                    if(d1.name in DLVNPlayer.index){
                        DLVNPlayer.index[d1.name].avatar = d1.avatar
                    }
                    setModal(0);
                    setStatus('Not up to date')
                }
                function delete0() {
                    delete player.index[name]
                    for (const i in player.index) {
                        if (player.index[i].name == name) {
                            player.index = Object.values(player.index)
                            player.index.splice(i, 1)
                            player.index = Object.assign({}, player.index)
                            break;
                        }
                    }
                    try {
                        delete FDLVNPlayer.index[name]
                        for (const i in FDLVNplayer.index) {
                            if (FDLVNplayer.index[i].name == name) {
                                FDLVNplayer.index = Object.values(FDLVNplayer.index)
                                FDLVNplayer.index.splice(i, 1)
                                FDLVNplayer.index = Object.assign({}, FDLVNplayer.index)
                                break;
                            }
                        }
                        for (const i in FDLVNplayer.index) {
                            FDLVNplayer.index[i].top = parseInt(i) + 1
                        }
                    }
                    catch (err) {
                        console.error(err)
                    }
                    try {
                        delete DLVNPlayer.index[name]
                        for (const i in DLVNplayer.index) {
                            if (DLVNplayer.index[i].name == name) {
                                DLVNplayer.index = Object.values(DLVNplayer.index)
                                DLVNplayer.index.splice(i, 1)
                                DLVNplayer.index = Object.assign({}, DLVNplayer.index)
                                break;
                            }
                        }
                        for (const i in DLVNplayer.index) {
                            DLVNplayer.index[i].top = parseInt(i) + 1
                        }
                    }
                    catch (err) {
                        console.error(err)
                    }
                    setModal(0);
                    setStatus('Not up to date')
                }

                return (
                    <div className="popup">
                        <div className="overlay">
                            <div className="popupContent">
                                <h2>Edit player info</h2>
                                <a id='close' onClick={() => { setModal(!modal) }}>x</a>
                                <label for="playerName">Player name: </label>
                                <input type="text" id="playerName" name="playerName" defaultValue={name} readOnly></input><br />
                                <label for="playerAvatar">Avatar: </label>
                                <input type="text" id="playerAvatar" name="playerAvatar" defaultValue={player.index[name].avatar} ></input><br />
                                <label for="facebook">Facebook: </label>
                                <input type="text" id="facebook" name="facebook" defaultValue={player.index[name].social.facebook} ></input><br />
                                <label for="youtube">Youtube: </label>
                                <input type="text" id="youtube" name="youtube" defaultValue={player.index[name].social.youtube} ></input><br />
                                <label for="discordTag">Discord: </label>
                                <input type="text" id="discordTag" name="discordTag" defaultValue={player.index[name].social.discord} ></input><br />
                                <br /><button onClick={update}>Update</button><br /><br /><br /><br />
                                <button onClick={delete0}>Delete player</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    function showModal(x, y, z) {
        setD(x)
        setList(y)
        setModal(!modal)
        console.log(DLVN.list)
        if(z != undefined){
            setAddLv(true)
        }
        else setAddLv(false)
    }
    function showData() {
        if (player.index == undefined) return (<div>Loading {percentloaded}%</div>)
        else {
            return (
                <div className="adminMainpanel">
                    <div className="lvDat">
                        {showModal1()}
                        <h2>FDLVN</h2>
                        <button onClick={() => showModal({
                            'creator': '',
                            'id': '',
                            'ldm': [],
                            'name': '',
                            'points': 0,
                            'top': 1,
                            'profile': '',
                            'thumbnail': '',
                            'verifier': '',
                            'vids': []
                        }, 'FDLVN', 1)}>Add new level</button>
                        {Object.keys(FDLVN.list).map(i => {
                            return (
                                <p><a href="#!" onClick={() => showModal(FDLVN.list[i], 'FDLVN')}>#{FDLVN.list[i].top} {FDLVN.list[i].name}</a></p>
                            )
                        })}
                    </div>
                    <div className="lvDat">
                        <h2>FDLVN Legacy</h2>
                        <button onClick={() => showModal({
                            'creator': '',
                            'id': '',
                            'ldm': [],
                            'name': '',
                            'profile': '',
                            'thumbnail': '',
                            'verifier': '',
                            'vids': []
                        }, 'FDLVNLegacy', 1)}>Add new level</button>
                        {Object.keys(FDLVNLegacy.list).map(i => {
                            return (
                                <p><a href="#!" onClick={() => showModal(FDLVNLegacy.list[i], 'FDLVNLegacy')}>{FDLVNLegacy.list[i].name}</a></p>
                            )
                        })}
                    </div>
                    <div className="lvDat">
                        <h2>DLVN</h2>
                        <button onClick={() => showModal({
                            'creator': '',
                            'id': '',
                            'ldm': [],
                            'name': '',
                            'points': 0,
                            'top': 1,
                            'profile': '',
                            'thumbnail': '',
                            'firstVictor': '',
                            'percentToQualify': 0,
                            'vids': []
                        }, 'DLVN', 1)}>Add new level</button>
                        {Object.keys(DLVN.list).map(i => {
                            return (
                                <p><a href="#!" onClick={() => showModal(DLVN.list[i], 'DLVN')}>#{DLVN.list[i].top} {DLVN.list[i].name}</a></p>
                            )
                        })}
                    </div>
                    <div className="lvDat">
                        <h2>Player</h2>
                        {Object.keys(player.index).map(i => {
                            function getInfo() {
                                const a = FDLVNPlayer.index[player.index[i].name]
                                const b = DLVNPlayer.index[player.index[i].name]
                                return [a, b]
                            }
                            return (
                                <p><a href="#!" onClick={() => showModal(getInfo(), 'player')}>{player.index[i].name}</a></p>
                            )
                        })}
                    </div>
                    <div className="lvDat">
                        <br></br>
                        <button onClick={getJSON}>Download JSON</button><br></br><br></br>
                        <button onClick={addData}>Upload change</button><br></br><br></br>
                        <label>Status: {status}</label>
                    </div>
                </div>
            )
        }

    }
    if (user == null) {
        if (player.index == undefined) return (<div>Loading {percentloaded}%</div>)
        else return (
            <div className="adminMainpanel">
                <button onClick={logIn}>Log In</button>
            </div>
        )
    }
    if (user.email in au.admin)
        return (
            <>
                {showData()}
            </>
        )
    return (
        <>
            <p>You do not have permission to access this page.</p>
        </>
    )

}
export default Main