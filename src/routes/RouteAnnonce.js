const express = require('express')
const { CreatArticle, AllAnnonce, deleteAnnonce, insertUserId, updateAnnonce, AnnonceById, addparticipant, deleteParticipant } = require('../controller/controllerAnnonce')
const { middleURL } = require('../utils/middle')

const router = express.Router()

router.post('/createAnnonce',middleURL, CreatArticle )
router.get('/annonces', AllAnnonce)
router.delete('/suppression/:id', deleteAnnonce)
router.get('/annonce/:id', AnnonceById)
router.patch('/update/:id', middleURL,updateAnnonce)
router.put('/addParticpant/:id',addparticipant)
router.patch('/deleteParticipant/:id', deleteParticipant)

module.exports= router