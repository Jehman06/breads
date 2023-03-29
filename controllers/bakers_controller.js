const express = require('express')
const baker_seed = require('../models/baker_seed')
const bakers_router = express.Router()
const baker_schema = require('../models/baker.js')


bakers_router.get('/data/seed', (req, res) => {
    baker_schema.insertMany(baker_seed)
        .then(() => { res.redirect('/breads') })
        .catch((err) => { console.log(err) })
})

bakers_router.get('/:id', (req, res) => {
    baker_schema.findById(req.params.id)
        .populate('breads')
        .then((foundBaker) => { 
            res.render('bakerShow', { baker: foundBaker }) 
        })
        .catch((err) => { console.log(err) })
})

bakers_router.delete('/:id', (req, res) => {
    baker_schema.findByIdAndDelete(req.params.id)
        .then(deletedBaker => {
            res.status(303).redirect('/breads')
        })
        .catch(err => {
            console.log(err)
        })
})

bakers_router.get('/', (req, res) => {
    baker_schema.find()
        .populate('breads')
        .then((foundBakers) => {
            res.send(foundBakers)
        })
        .catch((err) => { console.log(err) })
})

module.exports = bakers_router