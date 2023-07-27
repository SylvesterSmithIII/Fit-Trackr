const Routine = require('../models/routine')
const Workout = require('../models/workout')


module.exports = async function(req, res, next) {

    try {
        const routines = await Routine.find({ userId: req.user._id }).populate('workouts')


        const routinesToRemove = [];

        // Check each routine for empty workouts array and mark for removal
        for (const routine of routines) {
          if (routine.workouts.length === 0) {
            routinesToRemove.push(routine._id)
          }
        }
    
        // Remove routines with empty workouts from the database
        await Routine.deleteMany({ _id: { $in: routinesToRemove } })

        next()

    } catch (err) {
        console.log(err);
    }

  }