import nc from 'next-connect';
import players from '../../../public/players.js'
// We will connect to a database in production


// This is a mock API to get players
// Return all players

const handler = nc()
  .get((req, res) => {

    if (!players) {
      res.status(500)
      res.end()
      return
    }

    res.json(players)
  })
  
export default handler;
