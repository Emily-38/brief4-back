// const jwt = require('jsonwebtoken')
const { User } = require('../model/User.js')
const client = require('../services/connexionDB.js')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

require('dotenv').config()

const register = async (request, response) => {
    if (
        !request.body.firstname ||
        !request.body.lastname ||
        !request.body.email ||
        !request.body.password
    ) {
        response.status(400).json({ error: 'creation echouer' })
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 10)
    try {
        let user = new User(
            request.body.firstname,
            request.body.lastname,
            'user',
            request.body.email,
            hashedPassword,
            new Date(),
            new Date(),
            true
        )
        let result = await client
            .db('YourEvent')
            .collection('user')
            .insertOne(user)
        response.status(200).json(result)
    } catch (e) {
        console.log(e)
        response.status(500).json(e)
    }
}


    const login = async (request, response) => {
        if (!request.body.email || !request.body.password) {
            response.status(400).json({ error: 'il manque des champs' })
            return
        }
    
        let user = await client
            .db('YourEvent')
            .collection('user')
            .findOne({ email: request.body.email })
    
        if (!user) {
            response.status(401).json({ error: 'utilisateur existe pas' })
            return
        }
    
        const isValidPassword = bcrypt.compare(request.body.password, user.password)
    
        if (!isValidPassword) {
            response.status(401).json({ error: 'le mot de passe est pas valide' })
        } else {
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    role: user.role,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    gdpr: new Date(user.gdpr).toLocaleString('fr'),
                },
                process.env.SECRET_KEY,
                { expiresIn: '20d' }
            )
    
            response.status(200).json({ jwt: token, id: user._id})
        }
    }

    
    module.exports={register, login}