const mongoose = require('mongoose')
const Workout = require('./workout')
const User = require('./user')
const Schema = mongoose.Schema

const routineSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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