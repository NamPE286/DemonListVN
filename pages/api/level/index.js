
import nc from 'next-connect';
import levels from '../../../public/data.js'
// We will connect to a database in production


// This is a mock API to get levels
// Return all levels

const handler = nc()
  .get((req, res) => {

    if (!levels) {
      res.status(500)
      res.end()
      return
    }

    res.json(levels)
  })
  
export default handler;
