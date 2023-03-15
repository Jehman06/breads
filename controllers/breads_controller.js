
const express = require('express')
const breads_router = express.Router()
const Bread = require('../models/bread.js')

// NEW ROUTE
breads_router.get('/new', (req, res) => {
    res.render('new')
})

// SHOW ROUTE
breads_router.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
        res.render('Show', {
            bread:Bread[req.params.arrayIndex]
        })
    } else {
        res.send('Whoopsie, page not found.')
    }
})

// INDEX
breads_router.get('/', (req, res) => {
    res.render('Index', 
    {
        breads: Bread,
        title: 'Index Page'
    })
    // res.send(Bread)
})

// CREATE ROUTE
breads_router.post('/', (req, res) => {
    if(!req.body.image) {
        req.body.image = "https://www.seriouseats.com/thmb/gBMNe_J1QqbAz_QAXfW7-bRrhnw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/better-no-knead-bread-recipe-hero-01_1-48d654bfadeb4a5caf9b233b00fc74ca.JPG"
    }
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.push(req.body)
    res.redirect('/breads')
})

module.exports = breads_router