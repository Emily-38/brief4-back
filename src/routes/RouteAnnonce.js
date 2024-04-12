const express = require('express')
const { CreatArticle, AllAnnonce, deleteAnnonce } = require('../controller/controllerAnnonce')

const router = express.Router()

router.post('/createAnnonce', CreatArticle)
router.get('/annonces', AllAnnonce)
router.delete('/suppression/:id', deleteAnnonce)

module.exports= router