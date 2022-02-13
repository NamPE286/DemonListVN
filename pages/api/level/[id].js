import nc from 'next-connect';
import levels from '../../../public/levels.js'
// We will connect to a database in production


// This is a mock API to get levels
// Return a level with it's id
const getLevel = id => levels.find(n => n.id === parseInt(id))

const handler = nc()
  .get((req, res) => {
    const level = getLevel(req.query.id)

    if (!level) {
      res.status(404)
      res.end()
      return
    }

    res.json(level)
  })
  
export default handler;
