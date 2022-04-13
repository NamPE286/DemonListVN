import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';

function Main() {
    const [data, setData] = useState([]);
    const axios = require('axios');
    useEffect(() => {
        function a(x) {
            var y = x.split('\n');
            var d0 = {}
            y.pop()
            y.pop()
            y.push('d0 = d')
            const n = y.join('\n')
            eval(n)
            console.log(d0)
            setData(d0.list)
        }

        axios.
            get("https://raw.githubusercontent.com/demonlistgdvn/top100/main/js/list.js")
            .then(res => a(res.data));
    }, [])
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
        if (rank > 100) {
            return roundNumber(15, 3);
        } else {
            return roundNumber((100 / Math.sqrt(((rank - 1) / 50) + 0.444444)) - 50, 3);
        }
    }
    function getVideoId(x){
        //get watch?v= index in x and return the video id
        var y = x.split('watch?v=');
        return y[1].split('&')[0]

    }
    function processName(x){
        for(let i = x.length - 1; i >= 0; i--){
            if(x[i] == '['){
                return x.substring(0, i)
            }
        }

    }
    // Subsequent queries will use persistence, if it was enabled successfully
    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" />

            <div className="mainpanel" data-aos="fade-up" data-aos-duration="800">
                <h2>GDVN Achivement List</h2>
                <a className='submitBtn' id="subm" href="https://docs.google.com/forms/d/e/1FAIpQLScnysX6n-jJZJV-Y5acianEVF7hML-tEdGa78qTh6hX0C8gTg/viewform" target="_blank">Submit<br/>(you will be redirected to external link)</a>
                <div className="mainpanelContent">
                    {Object.keys(data).map(i => {
                            return (
                                <>
                                    <div className="levelWrapper" key={i}>
                                        <a href={`/GDVNAL/${data[i].id}`}>
                                            <div className='levelCard'>
                                                <Image src={`https://i.ytimg.com/vi/${getVideoId(data[i].verificationVid)}/hqdefault.jpg`} alt="" layout="fill" objectFit='cover' priority='true' quality={35}></Image>
                                                <div className='fadeEffect'></div>
                                                <p className='top'>#{parseInt(i) + 1}</p>
                                                <div className='levelInfo'>
                                                    <h3>{data[i].name}</h3>
                                                    <p>by {processName(data[i].author)}</p>
                                                    <br />
                                                    <p>{getPoint(parseInt(i) + 1)}pt</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </>
                            )

                        }
                    )}
                </div>
            </div>
        </>
    )
}


// If data == null

export default Main;
