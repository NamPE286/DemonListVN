import nc from 'next-connect';
import players from '../../../public/players.js'

// Player object
// name: String
// uid: Integer                             | Pre-calculated
// position: Integer
// point: Float
// id: Integer
// position_history: Object{date: position} | Pre-calculated, No return
// points_history: Object{date: point}      | Pre-calculated, No return
// mainlist_demons: List[Demon]
// legacylist_demons: List[Demon]
// best_demons: List[Demon]                 | Pre-calculated, No return
//
// 'date' values will be stored as unix milis
// 'uid' is an unique ID, represents a player.
// 'id' is the player ID on the GD server.

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
