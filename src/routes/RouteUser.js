const express = require('express')
const { register, login, getAllUser } = require('../controller/controllerUser')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/getAllUser', getAllUser)

module.exports= router