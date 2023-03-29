const mongoose = require('mongoose')
const bread = require('./bread')

const baker_schema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        enum: ['Rachel', 'Joey', 'Monica', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: { type: Date, required: true },
    bio: String
}, { toJSON: { virtuals: true } })

baker_schema.virtual('breads', {
    ref: 'bread_schema',
    localField: '_id',
    foreignField: 'baker',
})

baker_schema.post('findOneAndDelete', function() {
    bread.deleteMany({baker: this._conditions._id})
        .then((deleteStatus) => {
            console.log(deleteStatus)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = mongoose.model('baker_schema', baker_schema)