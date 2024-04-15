

const { Annonce } = require("../model/Annonce")
const client = require('../services/connexionDB.js')
const {insertUserId}= require('../utils/tokenGuard.js')
const { ObjectId } = require("bson");
const { extractToken }= require('../utils/token.js');
const jwt= require("jsonwebtoken");


require('dotenv').config()


 //crée une annonce 
const CreatArticle = async (req, response) => {
  const token = await extractToken(req) ;
  
    jwt.verify(
      token,
    process.env.SECRET_KEY,
    async (err, authData) => {
        if (err) {

          console.log(err)
          res.status(401).json({ err: 'Unauthorized' })
          return
      } else {




  if (
        !req.body.title ||
        !req.body.description ||
        !req.body.image ||
        !req.body.lieu ||
        !req.body.date ||
        !req.body.participantsMax
    ) {
        response.status(400).json({ error: 'creation echouer' })
      }
    try {
        let annonce = new Annonce(
            req.body.title,
            req.body.description,
            req.body.image,
            req.body.lieu,
            req.body.date,
            authData.id,
            req.body.participantsMax,
            authData,
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
             }
          ) 
    }


    
    //afficher tout les annonces

    const AllAnnonce = async (request, response) => {
      // const token = await extractToken(request) ;
      //  jwt.verify(
      //    token,
      //  process.env.SECRET_KEY,
      //  async (err, authData) => {
      //      if (err) {
  
      //       console.log(err)
      //       response.status(401).json({ err: 'Unauthorized' })
      //       return
      //   } else {

        let annonces = 
        await client
        .db('YourEvent')
        .collection('annonce')
        .find()
    
        let apiResponse = await annonces.toArray()
        response.status(200).json(apiResponse)
    }
//   }
//  )
//  }
// afficher par id

    const AnnonceById = async (request, response) => {
      let id = new ObjectId(request.params.id);
      let annonce = 
      await client
        .db('YourEvent')
        .collection('annonce')
        .findOne({_id: id})
  
      
      response.status(200).json(annonce)
  }


    //delete
    async function deleteAnnonce(req, res) {
      const token = await extractToken(req) ;
  
    jwt.verify(
      token,
    process.env.SECRET_KEY,
    async (err, authData) => {
        if (err) {

          console.log(err)
          res.status(401).json({ err: 'Unauthorized' })
          return
      } else {


        if (!req.params.id) {
          res.status(400).send("Id Obligatoire");
        }
      
        let id = new ObjectId(req.params.id);
      
        let annoncesupr = await client
          .db("YourEvent")
          .collection("annonce")
          .deleteOne({ _id: id });
      
        let response = await annoncesupr;
      
        if (response.deletedCount === 1) {
          res.status(200).json({ msg: "Suppression réussie" });
        } else {
          res.status(204).json({ msg: "Pas d'annonce pour cette article" });
        }
      }
    }
    )
  }
    

      //update une annonces 

      async function updateAnnonce(request, response){
        const id = new ObjectId(request.params.id);
        const token = await extractToken(request) ;
  
            jwt.verify(
              token,
               process.env.SECRET_KEY,
                async (err, authData) => {
                if (err) {

                console.log(err)
                response.status(401).json({ err: 'Unauthorized' })
                return
      } else {

        if(
          !request.body.title||
          !request.body.description||
          !request.body.image||
          !request.body.lieu||
          !request.body.date||
          !request.body.participantsMax
          

        ){
          response.status(400).json({error: 'remplir les champs'})
        }

         try{
           await client 
          .db('YourEvent')
          .collection('annonce')
          .updateOne(
            {_id: id},
            {
              $set:{
                title: request.body.title,
                description:request.body.description,
                image: request.body.image,
                lieu: request.body.lieu,
                date: request.body.date,
                participantsMax: request.body.participantsMax,
              },
            }
          )
          
            response.status(200).json({ msg: "Update successful" });
          
         }catch(e){
          console.log (e)
          response.status(500).json(e)
         }
        }
        }
        )
      }
          // add participant
      async function addparticipant(req, res){
        const token = await extractToken(req) ;
  
            jwt.verify(
             token,
             process.env.SECRET_KEY,
              async (err, authData) => {
              if (err) {

               console.log(err)
              res.status(401).json({ err: 'Unauthorized' })
              return
      } else {


        const id = new ObjectId(req.params.id) ;
      //   const userId = req.body._id
      //   console.log(userId)
      //   if(!userId){
      //   res.status(400).json({error: 'connect toi'})
      // }

        // let user = await client
        
        // .db('YourEvent')
        // .collection('user')
        // .findOne({ _id: new ObjectId (userId) })

        try{ 
          let result=await client
          .db("YourEvent")
          .collection("annonce")
          .updateOne({_id: id},
            {
              $addToSet:{
                participants:[authData]
              }
    }
    );
    
    res.status(200).json({ msg: "ajout reussie" });
      }catch(e){
        console.log (e)
        res.status(500).json(e)
       }
      }
    }
    )
    }
    

    module.exports={CreatArticle, insertUserId, AllAnnonce, deleteAnnonce, updateAnnonce, AnnonceById, addparticipant}