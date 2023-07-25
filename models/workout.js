const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    description: String,
    muscle_group: String,
    equipment: String,
    level: String,
    photos: [String]
})

module.exports = mongoose.model('Workout', workoutSchema)