import nc from 'next-connect';
import players from '../../../public/data.js'
// We will connect to a database in production


// This is a mock API to get players
// Return a level with it's top
const getPlayer = top => players.find(n => n.top === parseInt(top))

const handler = nc()
  .get((req, res) => {
    const player = getPlayer(req.query.top)

    if (!player) {
      res.status(404)
      res.end()
      return
    }

    res.json(player)
  })
  
export default handler;


