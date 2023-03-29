const mongoose = require('mongoose')

const bread_schema = new mongoose.Schema({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korb_mit_Br%C3%B6tchen.JPG/1200px-Korb_mit_Br%C3%B6tchen.JPG" },
    baker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'baker_schema',
    }
})

bread_schema.methods.getBakedBy = function() {
    let baker_name = "somebody"
    let baker_start = new Date().getFullYear()
    if (this.baker) {
        baker_name = this.baker.name
        baker_start = this.baker.startDate
    }
    
    return `${this.name} baked with love by ${baker_name}, who has been with us since ${baker_start}`
}


module.exports = mongoose.model('bread_schema', bread_schema)