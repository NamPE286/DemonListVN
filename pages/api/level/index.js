
import nc from 'next-connect';
import levels from '../../../public/levels.js'
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

    // We will automatically make this string when posting data
    // The performance of the API will be slowed down a bit.

    res.json(levels)
  })
  
export default handler;
