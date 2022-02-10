import nc from 'next-connect';
import players from '../../public/data.js'
// We will connect to a database in production


// This is a mock API to get players
const getPlayerFromTop = top => players.find(n => n.top === parseInt(top))

const handler = nc()
  .get((req, res) => {

    let player = players;

    if (req.query.top) {
      player = getPlayerFromTop(req.query.top)
    }

    if (!player) {
      res.status(404)
      res.end()
      return
    }

    res.json({data: player})
  })
  
export default handler;
