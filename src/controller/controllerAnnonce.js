
const { Annonce } = require("../model/Annonce")
const client = require('../services/connexionDB.js')
require('dotenv').config()

const CreatArticle = async (request, response) => {
    if (
        !request.body.title ||
        !request.body.description ||
        !request.body.image ||
        !request.body.lieu ||
        !request.body.date 
    ) {
        response.status(400).json({ error: 'creation echouer' })
    }
    try {
        let annonce = new Annonce(
            request.body.title,
            request.body.description,
            request.body.image,
            request.body.lieu,
            request.body.date,
            request.body.userId,
            request.body.participants,
            new Date()
        )
        let result = await client
            .db('YourEvent')
            .collection('annonce')
            .insertOne(annonce)
        response.status(200).json(result)
    } catch (e) {
        console.log(e)
        response.status(500).json(e)
    }
    }


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
                    let apiResponse = await annonce.toArray()
    
                    res.status(200).json(apiResponse)
                }
            }
        )
    }

    const AllAnnonce = async (request, response) => {
        let annonces = await client.db('YourEvent').collection('annonce').find()
    
        let apiResponse = await annonces.toArray()
        response.status(200).json(apiResponse)
    }

    const deleteAnnonce = async (request, response) => {
        if (!request.body.userId || !request.body.annonceId) {
            response.status(400).json({ error: 'suppression impossible' })
            return
        }
        let annonceId = new ObjectId(request.body.annonceId)
        let userId = new ObjectId(request.body.userId)
    
        let user = await client
            .db('YourEvent')
            .collection('user')
            .find({ _id: userId })
    
        let annonce = await client
            .db('YourEvent')
            .collection('annonce')
            .find({ _id: annonceId })
    
        if (!user || !annonce) {
            response.status(401).json({ error: 'rien existe' })
            return
        }
    
        if (annonce.userId !== user._id || user.role !== 'admin') {
            response.status(401).json({ error: 'tu es pas autoriser' })
            return
        }
    
        try {
            await client
                .db('YourEvent')
                .collection('annonce')
                .deleteOne({ _id: annonceId })
        } catch (e) {
            console.log(e)
            response.status(500).json(e)
        }
    }
    

    module.exports={CreatArticle, insertUserId, AllAnnonce, deleteAnnonce}