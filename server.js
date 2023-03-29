require('dotenv').config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const express = require('express')
const app = express()

// Dependencies
const methodOverride = require('method-override')
const mongoose = require('mongoose')
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Middleware
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.get('/', (req, res) => {
    res.send('Hello World')
})

const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

const bakersController = require('./controllers/bakers_controller')
app.use('/bakers', bakersController)


// 404 GO LAST
app.get('*', (req, res) => {
    res.send('this is a 404')
})
  
app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT)
})