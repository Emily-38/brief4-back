const express = require('express')
const { CreatArticle, AllAnnonce, deleteAnnonce, insertUserId, updateAnnonce, AnnonceById, addparticipant } = require('../controller/controllerAnnonce')

const router = express.Router()

router.post('/createAnnonce', CreatArticle, insertUserId)
router.get('/annonces', AllAnnonce)
router.delete('/suppression/:id', deleteAnnonce)
router.get('/annonce/:id', AnnonceById)
router.patch('/update/:id', updateAnnonce)
router.put('/addParticpant/:id',addparticipant)

module.exports= router