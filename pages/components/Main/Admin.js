import { getDoc, doc, collection, getDocs, setDoc } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import Image from "next/image";
import { async } from "@firebase/util";

function Main() {
    const [data, setData] = useState({});
    const [modal, setModal] = useState(false);
    const [d, setD] = useState("");
    const [d1, setD1] = useState({});
    const [index, setIndex] = useState(0);

    useEffect(() => {
        async function getData() {
            let a = {}
            const querySnapshot = await getDocs(collection(db, "data"));
            querySnapshot.forEach((doc) => {
                a[doc.id] = doc.data();
            });
            setData(a);
        }
        getData();
    }, [])

    function calc() {
        console.log('Calculating')

        var dat = JSON.parse(JSON.stringify(data['mainlist0']));
        for (const i in data['mainlist']) {
            var a2 = data['mainlist'][i].id
            if (a2 in data['mainlist0']) {
            }
            else {
                console.log(a2)
                dat[data['mainlist'][i].id] = JSON.parse(JSON.stringify(data['mainlist'][i]))
                dat[data['mainlist'][i].id].ldm = [];
            }

        }
        data['mainlist0'] = dat
        for (const i in data['legacylist']) {
            var a2 = data['legacylist'][i].id
            //check if a2 key exists in mainlist0
            if (a2 in data['mainlist0']) {
            }
            else {
                console.log(a2)
                dat[data['legacylist'][i].id] = JSON.parse(JSON.stringify(data['legacylist'][i]))
                dat[data['legacylist'][i].id].ldm = [];
            }
        }
        var player = []
        for (const i in data['player']) {
            var a = {}
            var pt = 0
            var maxPt = 0
            a['bestplay'] = ""
            a['bestplayCreator'] = ""
            a['bestplayPt'] = 0
            a['bestplayThumbnail'] = ""
            for (const j in data['player'][i]) {
                var lv = data['player'][i][j]
                for (const k in data['mainlist']) {
                    if (data['mainlist'][k].name == lv) {
                        pt += data['mainlist'][k].points
                        if (data['mainlist'][k].points > maxPt) {
                            maxPt = data['mainlist'][k].points
                            a['bestplay'] = data['mainlist'][k].name
                            a['bestplayCreator'] = data['mainlist'][k].creator
                            a['bestplayPt'] = data['mainlist'][k].points
                            a['bestplayThumbnail'] = data['mainlist'][k].thumbnail
                        }
                    }
                }
            }
            a['name'] = i
            a['points'] = Math.round(pt * 100) / 100
            player.push(a)
        }
        //sort player by points
        player.sort(function (a, b) {
            return b.points - a.points
        })

        for (const i in player) {
            if (data['playerAvatar'][player[i].name] != undefined) {
                player[i].avatar = data['playerAvatar'][player[i].name]
            }
            else {
                player[i].avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfCfynXv42fOnrTQAs-99j09O8uz7mDilOQ&usqp=CAU"
            }
            player[i].top = parseInt(i) + 1
        }
        data['playerPt'] = player
        for (const i in player) {
            data['playerPt0'][player[i].name] = player[i]
        }
        console.log('Calculation finished')
        addData()

    }

    async function addData() {
        for (const i in data) {
            await setDoc(doc(db, "data", i), Object.assign({}, data[i]));
        }
    }
    function refactor(x) {
        x.sort((a, b) => (a.top < b.top) ? -1 : 1)
        for (const i in x) {
            x[i].top = parseInt(i) + 1
            x[i].points = 2100 / (0.3 * parseInt(x[i].top) + 9) - 80
            x[i].points = Math.round(x[i].points * 100) / 100
        }
        return x
    }
    function showMainlistInfo(x) {
        let a = data['mainlist0'][data['mainlist'][x]['id']]
        if (a == undefined) {
            data['mainlist0'][data['mainlist'][x]['id']] = data['mainlist'][x]
            data['mainlist0'][data['mainlist'][x]['id']].ldm = []
            a = data['mainlist0'][data['mainlist'][x]['id']]
        }
        if (a == undefined) {
            console.log('not ok')
            return
        }
        console.log(a)
        setD("mainlist")
        setD1(a)
        setIndex(x)
        setModal(!modal)
    }
    function showLegacylisttInfo(x) {
        const a = data['mainlist0'][data['legacylist'][x]['id']]
        console.log(a)
        setD("legacylist")
        setD1(a)
        setIndex(x)
        setModal(!modal)
    }
    function deletelv(){
        try{
            delete data[d][index]
        }
        catch(e){
            console.log(e)
            data[d].splice(index,1)
        }
        setModal(!modal)
        addData()
    }
    function showModal() {
        if (modal) {
            if (d == "mainlist") {
                function update() {
                    data['mainlist'] = Object.values(data['mainlist'])
                    d1.name = document.getElementById("lvname").value
                    d1.creator = document.getElementById("creator").value
                    d1.thumbnail = document.getElementById("thumbnail").value
                    d1.verifier = document.getElementById("verifier").value
                    d1.id = document.getElementById("lvid").value
                    document.getElementById("LDM").value = "[" + document.getElementById("LDM").value + "]"

                    if (document.getElementById("top").value < d1.top) d1.top = document.getElementById("top").value - 0.5
                    else d1.top = document.getElementById("top").value
                    data['mainlist'].splice(index, 1)
                    data['mainlist'].push(d1)
                    data['mainlist'] = refactor(data['mainlist'])
                    data['mainlist0'][d1.id] = d1
                    try {
                        data['mainlist0'][d1.id].ldm = JSON.parse(document.getElementById("LDM").value)
                    }
                    catch (e) {
                        console.error(e)
                    }

                    console.log(data['mainlist'])
                    addData()
                    setModal(!modal)


                }
                return (
                    <div className="popup">
                        <div className="overlay">
                            <div className="popupContent">
                                <h2>Edit level info</h2>
                                <a id='close' onClick={() => { setModal(!modal) }}>x</a>
                                <label for="lvname">Level name: </label>
                                <input type="text" id="lvname" name="lvname" defaultValue={d1.name}></input><br />
                                <label for="creator">Level creator: </label>
                                <input type="text" id="creator" name="creator" defaultValue={d1.creator}></input><br />
                                <label for="top">Top: </label>
                                <input type="text" id="top" name="top" defaultValue={d1.top}></input><br />
                                <label for="verifier">Verifier: </label>
                                <input type="text" id="verifier" name="verifier" defaultValue={d1.verifier}></input><br />
                                <label for="lvid">ID: </label>
                                <input type="text" id="lvid" name="lvid" defaultValue={d1.id}></input><br />
                                <label for="thumbnail">Youtube video ID: </label>
                                <input type="text" id="thumbnail" name="thumbnail" defaultValue={d1.thumbnail}></input><br />
                                <label for="LDM">LDM: </label>
                                <input type="text" id="LDM" name="LDM" defaultValue={JSON.stringify(d1.ldm).substring(1, JSON.stringify(d1.ldm).length - 1)}></input><br />
                                <br/><button onClick={update}>Update</button><br/><br/><br/><br/>
                                <button onClick={deletelv}>Delete level</button>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (d == "legacylist") {
                function update() {
                    data['legacylist'] = Object.values(data['legacylist'])
                    d1.name = document.getElementById("lvname").value
                    d1.creator = document.getElementById("creator").value
                    d1.thumbnail = document.getElementById("thumbnail").value
                    d1.verifier = document.getElementById("verifier").value
                    d1.id = document.getElementById("lvid").value
                    document.getElementById("LDM").value = "[" + document.getElementById("LDM").value + "]"
                    data['mainlist0'][d1.id] = d1
                    try {
                        data['mainlist0'][d1.id].ldm = JSON.parse(document.getElementById("LDM").value)
                    }
                    catch (e) {
                        console.error(e)
                    }
                    console.log(data['legacylist'])
                    addData()
                    setModal(!modal)
                }
                return (
                    <div className="popup">
                        <div className="overlay">
                            <div className="popupContent">
                                <h2>Edit level info</h2>
                                <a id='close' onClick={() => { setModal(!modal) }}>x</a>
                                <label for="lvname">Level name: </label>
                                <input type="text" id="lvname" name="lvname" defaultValue={d1.name}></input><br />
                                <label for="creator">Level creator: </label>
                                <input type="text" id="creator" name="creator" defaultValue={d1.creator}></input><br />
                                <label for="verifier">Verifier: </label>
                                <input type="text" id="verifier" name="verifier" defaultValue={d1.verifier}></input><br />
                                <label for="lvid">ID: </label>
                                <input type="text" id="lvid" name="lvid" defaultValue={d1.id}></input><br />
                                <label for="thumbnail">Youtube video ID: </label>
                                <input type="text" id="thumbnail" name="thumbnail" defaultValue={d1.thumbnail}></input><br />
                                <label for="LDM">LDM: </label>
                                <input type="text" id="LDM" name="LDM" defaultValue={JSON.stringify(d1.ldm).substring(1, JSON.stringify(d1.ldm).length - 1)}></input><br />
                                <br/><button onClick={update}>Update</button><br/><br/><br/><br/>
                                <button onClick={deletelv}>Delete level</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    function copy() {
        /* Get the text field */
        var copyText = document.getElementById("json");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        /* Alert the copied text */
        alert("Copied JSON to clipboard")
    }
    function addNewLevel(x){
        setD1({
            name: "",
            creator: "",
            top: 0,
            verifier: "",
            id: "",
            thumbnail: "",
            ldm: []
        })
        setD(x)
        setModal(!modal)
    }

    try {
        return (

            <div className="adminMainpanel">
                {showModal()}
                <div className="lvdat">
                    <h2>Mainlist</h2>
                    <button onClick={() => {addNewLevel('mainlist')}}>Add new level</button>
                    {Object.keys(data['mainlist']).map(i => {
                        return (
                            <a href="#!" onClick={() => showMainlistInfo(i)}><p>{data['mainlist'][i].name}</p></a>
                        )
                    })}
                </div>
                <div className="lvdat">
                    <h2>Legacy List</h2>
                    <button onClick={() => {addNewLevel('legacylist')}}>Add new level</button>
                    {Object.keys(data['legacylist']).map(i => {
                        return (
                            <a href="#!" onClick={() => showLegacylisttInfo(i)}><p>{data['legacylist'][i].name}</p></a>
                        )
                    })}
                </div>
                <div className="lvdat">
                    <h2>Player</h2>
                    <button onClick={calc}>Calc</button>
                    {Object.keys(data['playerPt']).map(i => {
                        return (
                            <p>{data['playerPt'][i].name}</p>
                        )
                    })}
                </div>
                <div className="lvDat">
                    <br />
                    <button onClick={copy}>Copy JSON</button>
                    <input type="text" id="json" name="json" value={JSON.stringify({ "data": data })} readOnly></input>
                </div>


            </div>
        )
    }
    catch (e) {
        console.error(e)
        console.log(data)
        { calc }
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}

export default Main;