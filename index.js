const express= require('express')
const app = express()
const cors = require('cors')
const { connect } = require('./src/services/connexionDB')
const routerUser = require('./src/routes/RouteUser')
const routerAnnonce = require('./src/routes/RouteAnnonce')

require('dotenv').config()

app.use(express.json())
app.use(cors())

connect(process.env.MONGO_URL, (error) => {
    if (error) {
        console.log('connexion échoué')
        process.exit(-1)
    } else {
        console.log('connexion reussi')
    }
})

app.use('/', routerUser)
app.use('/', routerAnnonce)
console.log('wesh')
app.listen(3333)