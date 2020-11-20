const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    groupId: {type: Types.ObjectId, ref: 'CategoryGroup'},
    name: {type: String, required: true, unique: false},
    description: {type: String, required: true, unique: false},
})

module.exports = model('Category', schema)