const express = require('express')
const breads_router = express.Router()
const bread_schema = require('../models/bread')
const baker_schema = require('../models/baker')
const baker = require('../models/baker')

// DestroyAll
breads_router.get('/data/destroy', (req, res) => {
    bread_schema.deleteMany()
        .then((deletedBread) => { res.redirect('/breads') })
})

// New
breads_router.get('/new', (req, res) => {
    baker_schema.find()
        .then((foundBakers) => {
            res.render('new', { bakers: foundBakers })
        })
})

// Edit
breads_router.get('/:id/edit', (req, res) => {
    baker_schema.find()
        .then((foundBakers) => {
            bread_schema.findById(req.params.id)
                .then((foundBread) => { 
                    res.render('edit', { 
                        bread: foundBread,
                        bakers: foundBakers,
                    }) 
                })
                .catch((err) => { console.log(err) })
        })
        .catch((err) => { console.log(err) })   
})

// Show
breads_router.get('/:id', (req, res) => {
    bread_schema.findById(req.params.id)
        .populate('baker')
        .then((foundBread) => { 
            let bakedBy = foundBread.getBakedBy()
            console.log(bakedBy)
            res.render('show', { bread: foundBread }) 
        })
        .catch((err) => { console.log(err) })
})

// Update
breads_router.put('/:id', (req, res) => {
    req.body.hasGluten = req.body.hasGluten === 'on'
    bread_schema.findByIdAndUpdate(String(req.params.id), req.body, { new: true })
        .then((updatedBread) => {
            console.log(updatedBread)
            res.redirect(`/breads/${req.params.id}`)
        })
        .catch((err) => { console.log(err) })
})

// Delete
breads_router.delete('/:id', (req, res) => {
    bread_schema.findByIdAndDelete(String(req.params.id))
        .then((deletedBread) => { res.status(303).redirect('/breads') })
        .catch((err) => { console.log(err) })
})

// Index
breads_router.get('/', (req, res) => {
    baker_schema.find()
        .then((foundBakers) => {
            bread_schema.find()
                .then((foundBreads) => {
                    res.render('index', {
                        breads: foundBreads,
                        bakers: foundBakers,
                        title: 'Index'
                    })
                })
                .catch((err) => {
                    console.log(err)
                })  
        })
})

// Create
breads_router.post('/', (req, res) => {
    req.body.hasGluten = req.body.hasGluten === 'on'
    bread_schema.create(req.body)
        .catch(err => {console.log(err)})
    res.redirect('/breads')
})

module.exports = breads_router