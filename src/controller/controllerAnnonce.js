
const { Annonce } = require("../model/Annonce")
const client = require('../services/connexionDB.js')
const {insertUserId}= require('../utils/tokenGuard.js')
const { ObjectId } = require("bson");

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


    
    

    const AllAnnonce = async (request, response) => {
        let annonces = await client.db('YourEvent').collection('annonce').find()
    
        let apiResponse = await annonces.toArray()
        response.status(200).json(apiResponse)
    }

    async function deleteAnnonce(req, res) {
        if (!req.params.id) {
          res.status(400).send("Id Obligatoire");
        }
      
        let id = new ObjectId(req.params.id);
      
        let apiCall = await client
          .db("YourEvent")
          .collection("annonce")
          .deleteOne({ _id: id });
      
        let response = await apiCall;
      
        if (response.deletedCount === 1) {
          res.status(200).json({ msg: "Suppression réussie" });
        } else {
          res.status(204).json({ msg: "Pas d'annonce pour cette article" });
        }
      }
    

    module.exports={CreatArticle, insertUserId, AllAnnonce, deleteAnnonce}