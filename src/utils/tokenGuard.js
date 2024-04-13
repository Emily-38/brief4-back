const { extractToken }= require('../utils/token.js')
require('dotenv').config()

const insertUserId = async (req, res) => {
       
    const token = await extractToken(req)

  
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        async (err, authData) => {
            if (err) {
               
                console.log(err)
                res.status(401).json({ err: 'Unauthorized' })
                return
            } else {
                
                let annonce = await client
                    .db('YourEvent')
                    .collection('annonce')
                    .find({ userId: authData.id })
                let apiResponses = await annonce.toArray()
                
                res.status(200).json(apiResponses)
            }
        }
    )
}
module.exports={insertUserId}