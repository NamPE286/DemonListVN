import nc from 'next-connect';
import levels from '../../../public/levels.js'
// We will connect to a database in production


// This is a mock API to get levels
// Return a level with it's top
const getLevel = top => levels.find(n => n.top === parseInt(top))

const handler = nc()
  .get((req, res) => {
    const level = getLevel(req.query.top)

    if (!level) {
      res.status(404)
      res.end()
      return
    }

    res.json(level)
  })
  
export default handler;
