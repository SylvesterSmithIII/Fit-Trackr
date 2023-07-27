const mongoose = require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema

const routineSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    routineName: {
        type: String,
        required: true
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout',
        required: true
    }]
})

module.exports = mongoose.model('Routine', routineSchema)