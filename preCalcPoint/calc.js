const data = require('../importJsonToFirestore/data.json')

let player = []

for(const a in data.player){
    let p = {}
    let pt = 0
    for(let i = 0; i < data.player[a].length; i++){
        const lv = data.player[a][i]
        for(const b in data.mainlist){
            if(lv == data.mainlist[b].name){
                pt = pt + data.mainlist[b].points
            }
        }
    }
    p['name'] = a
    p['points'] = Math.round(pt * 100) / 100
    player.push(p)
    console.log(p)
}
let res = {}
res['player'] = player
var dictstring = JSON.stringify(res);
var fs = require('fs');
fs.writeFile("data.json", dictstring, function(err, result) {
    if(err) console.log('error', err);
});