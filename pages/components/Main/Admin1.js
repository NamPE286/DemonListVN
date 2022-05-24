import { doc, collection, getDocs, setDoc } from "firebase/firestore"
import { db } from '../../api/firebase-config.js'
import { useState, useEffect } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function Main() {
    const [data, setData] = useState({});
    const [modal, setModal] = useState(false);
    const [d, setD] = useState("");
    const [d1, setD1] = useState({});
    const [index, setIndex] = useState(0);
    const [add, setAdd] = useState(false);
    const [u, setU] = useState({})
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
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
                dat[data['legacylist'][i].id] = JSON.parse(JSON.stringify(data['legacylist'][i]))
                dat[data['legacylist'][i].id].ldm = [];
            }
        }

        data['mainlist'] = Object.assign({}, refactor(Object.values(data['mainlist'])))
        data['GDVNAL'] = Object.assign({}, refactor1(Object.values(data['GDVNAL'])))

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

        var p = {}
        for (const i in data['GDVNAL']) {
            const a = data['GDVNAL'][i].vids;
            try {
                if (a.length > 0)
                    for (const j in a) {
                        const u = a[j].user
                        if (u in p == false) {
                            p[u] = {
                                'name': u,
                                'points': 0,
                                'lv': [],
                                'vids': {},
                                'bestplay': '',
                                'bestplayPt': 0,
                                'bestplayThumbnail': '',
                                'bestplayCreator': '',
                                'top': 0,
                                'avatar': ''
                            }
                        }
                        p[u].points = Math.round((p[u].points + data['GDVNAL'][i].points * a[j].percent / 100) * 100) / 100;
                        p[u].points = Math.round(p[u].points * 100) / 100
                        if (p[u].bestplayPt < data['GDVNAL'][i].points) {
                            p[u].bestplayPt = JSON.parse(JSON.stringify(data['GDVNAL'][i].points))
                            p[u].bestplay = data['GDVNAL'][i].name + ' (' + a[j].percent + '%' + ')';
                            p[u].bestplayThumbnail = data['GDVNAL'][i].thumbnail;
                            p[u].bestplayCreator = data['GDVNAL'][i].creator;
                        }
                        p[u].lv.push(parseInt(data['GDVNAL'][i].id))
                        p[u].vids[data['GDVNAL'][i].id] = a[j]
                        if (data['playerAvatar'][u] != undefined) {
                            p[u].avatar = data['playerAvatar'][u]
                        }
                        else {
                            p[u].avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfCfynXv42fOnrTQAs-99j09O8uz7mDilOQ&usqp=CAU"
                        }
                    }
            }
            catch (e) {
                console.log(a)
            }
        }

        var p2 = Object.values(p)
        p2.sort((a, b) => b.points - a.points)
        for (const i in p2) {
            p2[i].top = parseInt(i) + 1
            p[p2[i].name] = p2[i]
        }

        data['GDVNALPlayer'] = p2
        data['GDVNALPlayer0'] = p

        for (const i in data['GDVNALPlayer']) {
            data['GDVNAL'][i]['vids'].sort((a, b) => b.percent - a.percent)
        }

        for (const i in data['GDVNAL']) {
            data['mainlist1'][data['GDVNAL'][i].id] = JSON.parse(JSON.stringify(data['GDVNAL'][i]))
        }

        console.log('Calculation finished')
        console.log(data)
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
        for (const i in x) {
            if (x[i].ldm == undefined || x[i].ldm.length == 0) {
                x[i].ldm = []
            }
            data['mainlist0'][x[i].id] = x[i]
        }
        return x
    }
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
    function refactor1(x) {
        x.sort((a, b) => (a.top < b.top) ? -1 : 1)
        for (const i in x) {
            x[i].top = parseInt(i) + 1
            x[i].points = getPoint(x[i].top)
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
            return
        }
        setD("mainlist")
        setD1(a)
        setIndex(x)
        setAdd(false)
        setModal(!modal)
    }
    function showGDVNALInfo(x) {
        if (data['GDVNAL'][x]['id'] == null) {
            data['mainlist1'][data['GDVNAL'][x]['id']] = data['GDVNAL'][x]
            data['mainlist1'][data['GDVNAL'][x]['id']].ldm = []
        }
        let a = data['mainlist1'][data['GDVNAL'][x]['id']]

        console.log(a)
        setD("GDVNAL")
        setD1(a)
        setIndex(x)
        setAdd(false)
        setModal(true)
    }
    function showLegacylisttInfo(x) {
        const a = data['mainlist0'][data['legacylist'][x]['id']]
        setD("legacylist")
        setD1(a)
        setIndex(x)
        setAdd(false)
        setModal(!modal)
    }
    function deletelv() {
        try {
            delete data[d][index]
        }
        catch (e) {
            console.log(e)
            data[d].splice(index, 1)
        }
        if (d == 'mainlist') data['mainlist'] = Object.assign({}, refactor(Object.values(data['mainlist'])))
        else if (d == 'GDVNAL') data['GDVNAL'] = Object.assign({}, refactor1(Object.values(data['GDVNAL'])))
        setModal(!modal)
        addData()
    }
    function addNewLevel(x) {
        if (x == 'mainlist') {
            setD1({
                name: "",
                creator: "",
                top: 0,
                verifier: "",
                id: "",
                thumbnail: "",
                ldm: []
            })
        }
        else if (x == 'legacylist') {
            setD1({
                name: "",
                creator: "",
                verifier: "",
                id: "",
                thumbnail: "",
                ldm: []
            })
        }
        else if (x == 'GDVNAL') {
            setD1({
                name: "",
                creator: "",
                top: 0,
                id: "",
                thumbnail: "",
                vids: [],
                percentToQualify: 0,
                firstVictor: '',
            })
        }
        setD(x)
        setAdd(true)
        setIndex(0)
        setModal(!modal)
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
                    if (parseInt(document.getElementById("top").value) < d1.top) d1.top = parseInt(document.getElementById("top").value) - 0.5
                    else d1.top = parseInt(document.getElementById("top").value) + 0.5
                    if (!add) data['mainlist'][index] = d1
                    else data['mainlist'].push(d1)
                    data['mainlist'] = refactor(data['mainlist'])
                    try {
                        data['mainlist0'][d1.id].ldm = JSON.parse(document.getElementById("LDM").value)
                    }
                    catch (e) {
                        console.error(e)
                    }
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
                                <br /><button onClick={update}>Update</button><br /><br /><br /><br />
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
                    if (!add) data['legacylist'][index] = d1
                    else {
                        let a = Object.values(data['legacylist'])
                        a.unshift(d1)
                        a = Object.assign({}, a)
                        data['legacylist'] = a
                    }
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
                                <br /><button onClick={update}>Update</button><br /><br /><br /><br />
                                <button onClick={deletelv}>Delete level</button>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (d == "GDVNAL") {
                function update() {
                    data['GDVNAL'] = Object.values(data['GDVNAL'])
                    d1.name = document.getElementById("lvname").value
                    d1.creator = document.getElementById("creator").value
                    d1.thumbnail = document.getElementById("thumbnail").value
                    d1.id = document.getElementById("lvid").value
                    d1.firstVictor = document.getElementById("firstVictor").value
                    d1.percentToQualify = document.getElementById("percentToQualify").value
                    if (parseInt(document.getElementById("top").value) < d1.top) d1.top = parseInt(document.getElementById("top").value) - 0.5
                    else d1.top = parseInt(document.getElementById("top").value) + 0.5
                    if (!add) data['GDVNAL'][index] = d1
                    else data['GDVNAL'].push(d1)
                    data['GDVNAL'] = refactor1(data['GDVNAL'])
                    data['mainlist1'][d1.id] = d1
                    addData()
                    setModal(!modal)
                }
                function addVictor() {
                    document.getElementsByClassName('victor')[0].style.display = 'block'
                    document.getElementById("userName").value = ""
                    document.getElementById("percent").value = ""
                    document.getElementById("YTLink").value = ""
                    document.getElementById("hz").value = ""
                }
                function cancel() {
                    document.getElementsByClassName('victor')[0].style.display = 'none'
                }
                function addVictor1() {
                    document.getElementsByClassName('victor')[0].style.display = 'none'
                    var c = {}
                    c.user = document.getElementById("userName").value
                    c.percent = document.getElementById("percent").value
                    c.link = document.getElementById("YTLink").value
                    c.hz = document.getElementById("hz").value
                    d1.vids.push(c)
                    data['GDVNAL'][index] = d1
                    data['mainlist1'][d1.id] = d1
                    setD1(d1)
                    setModal(!modal)
                    console.log(data['mainlist1'][d1.id])
                    alert("Added victor!")
                    addData()

                }
                try{
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
                                    <label for="lvid">ID: </label>
                                    <input type="text" id="lvid" name="lvid" defaultValue={d1.id}></input><br />
                                    <label for="thumbnail">Youtube video ID: </label>
                                    <input type="text" id="thumbnail" name="thumbnail" defaultValue={d1.thumbnail}></input><br />
                                    <label for="firstVictor">First Victor: </label>
                                    <input type="text" id="firstVictor" name="firstVictor" defaultValue={d1.firstVictor}></input><br />
                                    <label for="percentToQualify">Percent to qualify: </label>
                                    <input type="text" id="percentToQualify" name="percentToQualify" defaultValue={d1.percentToQualify}></input><br />
                                    <label>Victor: </label><button onClick={addVictor}>Add victor</button><hr></hr>
                                    <div className={`victor`} style={{ display: "none" }}>
                                        <label for={`userName`}>Player name:  </label>
                                        <input type="text" id={`userName`} name={`userName`}></input><br />
                                        <label for={`percent`}>Percent:  </label>
                                        <input type="text" id={`percent`} name={`percent`}></input><br />
                                        <label for={`YTLink`}>Video Link:  </label>
                                        <input type="text" id={`YTLink`} name={`YTLink`}></input><br />
                                        <label for={`hz`}>HZ:  </label>
                                        <input type="text" id={`hz`} name={`hz`}></input><br />
                                        <button onClick={addVictor1}>Add</button>
                                        <button onClick={cancel}>Cancel</button>
                                        <hr />
                                    </div>
                                    <div className="victorCard">
                                        {
                                            Object.keys(d1.vids).map((i) => {
                                            function update1() {
                                                d1.vids[i].user = document.getElementById("userName" + i).value
                                                d1.vids[i].percent = document.getElementById("percent" + i).value
                                                d1.vids[i].link = document.getElementById("YTLink" + i).value
                                                d1.vids[i].hz = document.getElementById("hz" + i).value
                                                data['GDVNAL'][index] = d1
                                                data['mainlist1'][d1.id] = d1
                                                setD1(d1)
                                                addData()
                                            }
                                            function delete2() {
                                                d1.vids.splice(i, 1)
                                                data['GDVNAL'][index] = d1
                                                data['mainlist1'][d1.id] = d1
                                                document.getElementsByClassName('victor' + i)[0].remove()
                                                console.log(d1.vids)
                                                setD1(d1)
                                                addData()
                                            }
                                            return (
                                                <>
                                                    <div className={`victor${i}`}>
                                                        <label for={`userName${i}`}>Player name:  </label>
                                                        <input type="text" id={`userName${i}`} name={`userName${i}`} defaultValue={d1.vids[i].user}></input><br />
                                                        <label for={`percent${i}`}>Percent:  </label>
                                                        <input type="text" id={`percent${i}`} name={`percent${i}`} defaultValue={d1.vids[i].percent}></input><br />
                                                        <label for={`YTLink${i}`}>Video Link:  </label>
                                                        <input type="text" id={`YTLink${i}`} name={`YTLink${i}`} defaultValue={d1.vids[i].link}></input><br />
                                                        <label for={`hz${i}`}>HZ:  </label>
                                                        <input type="text" id={`hz${i}`} name={`hz${i}`} defaultValue={d1.vids[i].hz}></input><br />
                                                        <button onClick={update1}>Update</button>
                                                        <button onClick={delete2}>Delete</button>
                                                        <hr />
                                                    </div>

                                                </>

                                            )
                                        })}
                                    
                                    </div>
                                    <br /><button onClick={update}>Update</button><br /><br /><br /><br />
                                    <button onClick={deletelv}>Delete level</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                catch(err){
                    setD1(data['GDVNAL'][index])
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
                                    <label for="lvid">ID: </label>
                                    <input type="text" id="lvid" name="lvid"></input><br />
                                    <label for="thumbnail">Youtube video ID: </label>
                                    <input type="text" id="thumbnail" name="thumbnail" defaultValue={d1.thumbnail}></input><br />
                                    <label for="firstVictor">First Victor: </label>
                                    <input type="text" id="firstVictor" name="firstVictor" defaultValue={d1.firstVictor}></input><br />
                                    <label for="percentToQualify">Percent to qualify: </label>
                                    <input type="text" id="percentToQualify" name="percentToQualify" defaultValue={d1.percentToQualify}></input><br />
                                    <label>Victor: </label><button onClick={addVictor}>Add victor</button><hr></hr>
                                    <div className={`victor`} style={{ display: "none" }}>
                                        <label for={`userName`}>Player name:  </label>
                                        <input type="text" id={`userName`} name={`userName`}></input><br />
                                        <label for={`percent`}>Percent:  </label>
                                        <input type="text" id={`percent`} name={`percent`}></input><br />
                                        <label for={`YTLink`}>Video Link:  </label>
                                        <input type="text" id={`YTLink`} name={`YTLink`}></input><br />
                                        <label for={`hz`}>HZ:  </label>
                                        <input type="text" id={`hz`} name={`hz`}></input><br />
                                        <button onClick={addVictor1}>Add</button>
                                        <button onClick={cancel}>Cancel</button>
                                        <hr />
                                    </div>
                                    <div className="victorCard">
                                        {
                                            Object.keys(d1.vids).map((i) => {
                                            function update1() {
                                                d1.vids[i].user = document.getElementById("userName" + i).value
                                                d1.vids[i].percent = document.getElementById("percent" + i).value
                                                d1.vids[i].link = document.getElementById("YTLink" + i).value
                                                d1.vids[i].hz = document.getElementById("hz" + i).value
                                                data['GDVNAL'][index] = d1
                                                data['mainlist1'][d1.id] = d1
                                                setD1(d1)
                                                addData()
                                            }
                                            function delete2() {
                                                d1.vids.splice(i, 1)
                                                data['GDVNAL'][index] = d1
                                                data['mainlist1'][d1.id] = d1
                                                document.getElementsByClassName('victor' + i)[0].remove()
                                                console.log(d1.vids)
                                                setD1(d1)
                                                addData()
                                            }
                                            return (
                                                <>
                                                    <div className={`victor${i}`}>
                                                        <label for={`userName${i}`}>Player name:  </label>
                                                        <input type="text" id={`userName${i}`} name={`userName${i}`} defaultValue={d1.vids[i].user}></input><br />
                                                        <label for={`percent${i}`}>Percent:  </label>
                                                        <input type="text" id={`percent${i}`} name={`percent${i}`} defaultValue={d1.vids[i].percent}></input><br />
                                                        <label for={`YTLink${i}`}>Video Link:  </label>
                                                        <input type="text" id={`YTLink${i}`} name={`YTLink${i}`} defaultValue={d1.vids[i].link}></input><br />
                                                        <label for={`hz${i}`}>HZ:  </label>
                                                        <input type="text" id={`hz${i}`} name={`hz${i}`} defaultValue={d1.vids[i].hz}></input><br />
                                                        <button onClick={update1}>Update</button>
                                                        <button onClick={delete2}>Delete</button>
                                                        <hr />
                                                    </div>

                                                </>

                                            )
                                        })}
                                    
                                    </div>
                                    <br /><button onClick={update}>Update</button><br /><br /><br /><br />
                                    <button onClick={deletelv}>Delete level</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        }
    }
    function showModal1() {
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
                    if (parseInt(document.getElementById("top").value) < d1.top) d1.top = parseInt(document.getElementById("top").value) - 0.5
                    else d1.top = parseInt(document.getElementById("top").value) + 0.5
                    if (!add) data['mainlist'][index] = d1
                    else data['mainlist'].push(d1)
                    data['mainlist'] = refactor(data['mainlist'])
                    try {
                        data['mainlist0'][d1.id].ldm = JSON.parse(document.getElementById("LDM").value)
                    }
                    catch (e) {
                        console.error(e)
                    }
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
                                <input type="text" id="lvname" name="lvname" defaultValue={d1.name} readOnly></input><br />
                                <label for="creator">Level creator: </label>
                                <input type="text" id="creator" name="creator" defaultValue={d1.creator} readOnly></input><br />
                                <label for="top">Top: </label>
                                <input type="text" id="top" name="top" defaultValue={d1.top} readOnly></input><br />
                                <label for="verifier">Verifier: </label>
                                <input type="text" id="verifier" name="verifier" defaultValue={d1.verifier} readOnly></input><br />
                                <label for="lvid">ID: </label>
                                <input type="text" id="lvid" name="lvid" defaultValue={d1.id} readOnly></input><br />
                                <label for="thumbnail">Youtube video ID: </label>
                                <input type="text" id="thumbnail" name="thumbnail" defaultValue={d1.thumbnail} readOnly></input><br />
                                <label for="LDM">LDM: </label>
                                <input type="text" id="LDM" name="LDM" defaultValue={JSON.stringify(d1.ldm).substring(1, JSON.stringify(d1.ldm).length - 1)}></input><br />
                                <br /><button onClick={update}>Update</button>
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
                    if (!add) data['legacylist'][index] = d1
                    else {
                        let a = Object.values(data['legacylist'])
                        a.unshift(d1)
                        a = Object.assign({}, a)
                        data['legacylist'] = a
                    }
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
                                <input type="text" id="lvname" name="lvname" defaultValue={d1.name} readOnly></input><br />
                                <label for="creator">Level creator: </label>
                                <input type="text" id="creator" name="creator" defaultValue={d1.creator} readOnly></input><br />
                                <label for="verifier">Verifier: </label>
                                <input type="text" id="verifier" name="verifier" defaultValue={d1.verifier} readOnly></input><br />
                                <label for="lvid">ID: </label>
                                <input type="text" id="lvid" name="lvid" defaultValue={d1.id} readOnly></input><br />
                                <label for="thumbnail">Youtube video ID: </label>
                                <input type="text" id="thumbnail" name="thumbnail" defaultValue={d1.thumbnail} readOnly></input><br />
                                <label for="LDM">LDM: </label>
                                <input type="text" id="LDM" name="LDM" defaultValue={JSON.stringify(d1.ldm).substring(1, JSON.stringify(d1.ldm).length - 1)}></input><br />
                                <br /><button onClick={update}>Update</button>
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
    function logIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setU(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    function showLogIn() {
        if (u.email == undefined) {
            return (
                <button onClick={logIn}>Log in</button>
            )
        }
        else {
            return (
                <>
                    <p>Name: {u.displayName}</p>
                    <p>Email: {u.email}</p>
                </>

            )
        }
    }
    if (u.email == undefined) {
        return (
            <div className="adminMainPanel">
                <div className="lvDat">
                    <br />
                    {showLogIn()}
                </div>

            </div>

        )
    }
    if (u.email in data['admin']) {
        if (data['admin'][u.email] == "Admin") {
            try {
                return (

                    <div className="adminMainpanel">
                        {showModal()}
                        <div className="lvdat">
                            <h2>Mainlist</h2>
                            <button onClick={() => { addNewLevel('mainlist') }}>Add new level</button>
                            {Object.keys(data['mainlist']).map(i => {
                                return (
                                    <a href="#!" onClick={() => showMainlistInfo(i)}><p>#{data['mainlist'][i].top} {data['mainlist'][i].name}</p></a>
                                )
                            })}
                        </div>
                        <div className="lvdat">
                            <h2>Legacy List</h2>
                            <button onClick={() => { addNewLevel('legacylist') }}>Add new level</button>
                            {Object.keys(data['legacylist']).map(i => {
                                return (
                                    <a href="#!" onClick={() => showLegacylisttInfo(i)}><p>{data['legacylist'][i].name}</p></a>
                                )
                            })}
                        </div>
                        <div className="lvdat">
                            <h2>Player</h2>
                            {Object.keys(data['playerPt']).map(i => {
                                return (
                                    <p>{data['playerPt'][i].name}</p>
                                )
                            })}
                        </div>
                        <div className="lvdat">
                            <h2>GDVNAL</h2>
                            <button onClick={() => { addNewLevel('GDVNAL') }}>Add new level</button>
                            {Object.keys(data['GDVNAL']).map(i => {
                                return (
                                    <a href="#!" onClick={() => showGDVNALInfo(i)}><p>#{data['GDVNAL'][i].top} {data['GDVNAL'][i].name}</p></a>
                                )
                            })}
                        </div>
                        <div className="lvDat">
                            <br />
                            <button onClick={copy}>Copy JSON</button>
                            <input type="text" id="json" name="json" value={JSON.stringify({ "data": data })} readOnly></input><br /><br />
                            <button onClick={calc}>Refresh List / Update List</button>
                            {showLogIn()}
                        </div>


                    </div>
                )
            }
            catch (e) {
                console.error(e)
                { calc }
                return (
                    <div>
                        <p>Loading...</p>
                    </div>
                )
            }
        }
        else if (data['admin'][u.email] == "LDM Mod") {
            try {
                return (

                    <div className="adminMainpanel">
                        {showModal1()}
                        <div className="lvdat">
                            <h2>Mainlist</h2>
                            {Object.keys(data['mainlist']).map(i => {
                                return (
                                    <a href="#!" onClick={() => showMainlistInfo(i)}><p>#{data['mainlist'][i].top} {data['mainlist'][i].name}</p></a>
                                )
                            })}
                        </div>
                        <div className="lvdat">
                            <h2>Legacy List</h2>
                            {Object.keys(data['legacylist']).map(i => {
                                return (
                                    <a href="#!" onClick={() => showLegacylisttInfo(i)}><p>{data['legacylist'][i].name}</p></a>
                                )
                            })}
                        </div>
                        <div className="lvdat">
                            <h2>Player</h2>
                            {Object.keys(data['playerPt']).map(i => {
                                return (
                                    <p>{data['playerPt'][i].name}</p>
                                )
                            })}
                        </div>
                        <div className="lvDat">
                            <br />
                            <button onClick={calc}>Refresh List / Update List</button>
                            {showLogIn()}
                        </div>


                    </div>
                )
            }
            catch (e) {
                console.error(e)
                return (
                    <div>
                        <p>Loading...</p>
                    </div>
                )
            }

        }
        else if (data['admin'][u.email] == "FDLVN Mod") {
            try {
                return (

                    <div className="adminMainpanel">
                        {showModal()}
                        <div className="lvdat">
                            <h2>Mainlist</h2>
                            <button onClick={() => { addNewLevel('mainlist') }}>Add new level</button>
                            {Object.keys(data['mainlist']).map(i => {
                                return (
                                    <a href="#!" onClick={() => showMainlistInfo(i)}><p>#{data['mainlist'][i].top} {data['mainlist'][i].name}</p></a>
                                )
                            })}
                        </div>
                        <div className="lvdat">
                            <h2>Legacy List</h2>
                            <button onClick={() => { addNewLevel('legacylist') }}>Add new level</button>
                            {Object.keys(data['legacylist']).map(i => {
                                return (
                                    <a href="#!" onClick={() => showLegacylisttInfo(i)}><p>{data['legacylist'][i].name}</p></a>
                                )
                            })}
                        </div>
                        <div className="lvdat">
                            <h2>Player</h2>
                            {Object.keys(data['playerPt']).map(i => {
                                return (
                                    <p>{data['playerPt'][i].name}</p>
                                )
                            })}
                        </div>
                        <div className="lvDat">
                            <br />
                            <button onClick={copy}>Copy JSON</button>
                            <input type="text" id="json" name="json" value={JSON.stringify({ "data": data })} readOnly></input><br /><br></br>
                            <button onClick={calc}>Refresh List / Update List</button>

                            {showLogIn()}
                        </div>


                    </div>
                )
            }
            catch (e) {
                console.error(e)
                return (
                    <div>
                        <p>Loading...</p>
                    </div>
                )
            }
        }
        else if (data['admin'][u.email] == "GDVNAL Mod") {
            try {
                return (
                    <div className="adminMainpanel">
                        {showModal()}
                        <div className="lvdat">
                            <h2>GDVNAL</h2>
                            <button onClick={() => { addNewLevel('GDVNAL') }}>Add new level</button>
                            {Object.keys(data['GDVNAL']).map(i => {
                                return (
                                    <a href="#!" onClick={() => showGDVNALInfo(i)}><p>#{data['GDVNAL'][i].top} {data['GDVNAL'][i].name}</p></a>
                                )
                            })}
                        </div>
                        <div className="lvDat">
                            <br />
                            <button onClick={copy}>Copy JSON</button>
                            <input type="text" id="json" name="json" value={JSON.stringify({ "data": data })} readOnly></input><br /><br></br>
                            <button onClick={calc}>Refresh List / Update List</button>
                            {showLogIn()}
                        </div>
                    </div>
                )
            }
            catch (e) {
                console.error(e)
                { calc }
                return (
                    <div>
                        <p>Loading...</p>
                    </div>
                )
            }
        }

    }
    else {
        return (
            <div>
                <p>You do not have permission to access this page</p>
            </div>
        )
    }

}

export default Main;