const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sample_WorkoutSchema = new Schema({
    name: String,
    description: String,
    muscle_group: String,
    equipment: String,
    level: String
  })

module.exports = mongoose.model('Sample_Workout', sample_WorkoutSchema)