const mongoose = require('mongoose')
const workout = require('./workout')
const Schema = mongoose.Schema

const routineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }]
})

module.exports = mongoose.model('Routine', routineSchema)