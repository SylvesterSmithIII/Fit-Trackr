const mongoose = require('mongoose')
const workout = require('./workout')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    workouts: [workout.schema]
  }, {
    timestamps: true
  });



module.exports = mongoose.model('User', userSchema)