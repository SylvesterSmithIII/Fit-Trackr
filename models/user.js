const mongoose = require('mongoose')
const Workout = require('./workout')
const Schema = mongoose.Schema



const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    workouts: [{
      type: Schema.Types.ObjectId,
      ref: 'Workout'
  }]
  }, {
    timestamps: true
  });



module.exports = mongoose.model('User', userSchema)