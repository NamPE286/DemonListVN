import nc from 'next-connect';
import players from '../../../public/players.js'
// We will connect to a database in production


// This is a mock API to get players
// Return a level with it's id
const getPlayer = id => players.find(n => n.id === parseInt(id))

const handler = nc()
  .get((req, res) => {
    const player = getPlayer(req.query.id)

    if (!player) {
      res.status(404)
      res.end()
      return
    }

    res.json(player)
  })
  
export default handler;
