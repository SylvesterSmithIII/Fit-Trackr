const User = require('../models/user');
const Workout = require('../models/workout');
const Sample_Workout = require('../models/sample_workouts')


module.exports = {
    show,
    create,
    edit
};

async function show(req, res) {
    let currentUser
    let sample_workouts
    try {
        currentUser = await User.findOne( { googleId: res.locals.user.googleId } )
    } catch (err) {
        console.log(err)
    }
    if (req.query === "") {
        try {
            sample_workouts = await Sample_Workout.find({})
        } catch (err) {
          console.log(err)  
        }
    } else {
        if (req.query.name === "") delete req.query.name
        try {
            sample_workouts = await Sample_Workout.find(req.query)
        } catch (err) {
            console.log(err);
        }
    }
    res.render('workouts/show', { title: "Workouts", workouts: currentUser.workouts, sample_workouts })
}

async function create(req, res) {
    let currentUser
    try {
        currentUser = await User.findOne( { googleId: res.locals.user.googleId } )
        try {
            currentUser.workouts.push(req.body)
            await currentUser.save()
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
    res.redirect('/workouts')
}

async function edit(req, res) {
    let currentUser
    let workout
    try {
        currentUser = await User.findOne( { googleId: res.locals.user.googleId })
        workout = currentUser.workouts.find(w => w._id == req.params.id)
    } catch (err) {
        console.log(err);
    }

    res.render('workouts/edit', { title: `Edit ${workout.name}`, workout})
}