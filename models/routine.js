const mongoose = require('mongoose')
const Workout = require('./workout')
const Schema = mongoose.Schema

const routineSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    routineName: {
        type: String,
        required: true
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }]
})

module.exports = mongoose.model('Routine', routineSchema)