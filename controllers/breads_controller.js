
const express = require('express')
const breads_router = express.Router()
const Bread = require('../models/bread.js')

// SHOW ROUTE
breads_router.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
        res.render('Show', {
            bread: Bread[req.params.arrayIndex]
        })
    } else {
        res.send('Whoopsie, page not found.')
    }
})

// INDEX
breads_router.get('/', (req, res) => {
    res.render('Show', 
    {
        breads: Bread,
        title: 'Index Page'
    })
    // res.send(Bread)
})

module.exports = breads_router