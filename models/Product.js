const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    categoryId: {type: Types.ObjectId, ref: 'Category'},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: true},
    price: {type: Number,  required: false, unique: false},
    size: {type: Number,  required: false, unique: false}
    // images: {}
})

module.exports = model('Product', schema)