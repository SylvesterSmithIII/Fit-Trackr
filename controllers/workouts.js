const User = require('../models/user');
const Workout = require('../models/workout')
const Sample_Workout = require('../models/sample_workouts')


module.exports = {
    index,
    create,
    show,
    edit,
    delete: deleteOne
};

async function index(req, res) {
    let user
    let sample_workouts

    try {
        user = await User.findOne({ googleId: req.user.googleId }).populate('workouts')
    } catch (err) {
        console.log(err)
    }
    console.log(user)
    if (req.query.name === "") delete req.query.name
    try {
        sample_workouts = await Sample_Workout.find(req.query).limit(60)
    } catch (err) {
        console.log(err);
    }
    res.render('workouts/index', { title: "Workouts", workouts: user.workouts, sample_workouts })
}

async function create(req, res) {

    const newWorkout = new Workout(req.body)
    let savedWorkout
    try {
        savedWorkout = await newWorkout.save()
    } catch (err) {
        console.log(err);
    }
    try {
        const user = await User.findOne( { _id: req.user._id } )
        try {
            user.workouts.push(savedWorkout._id)
            await user.save()
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
    res.redirect('/workouts')
}

async function show(req, res) {

    let workout

    try {
        workout = await Workout.findById(req.params.id)
        
    } catch (err) {
        console.log(err);
    }

    res.render('workouts/edit', { title: `Edit ${workout.name}`, workout})
}

async function edit(req, res) {
    let workout

    try {
        workout = await Workout.findById(req.params.id)
        
    } catch (err) {
        console.log(err);
    }
    
    for (key in req.body) {
        if (req.body[key] === "") {
            delete req.body[key]
            continue
        }
        workout[key] = req.body[key]
    }

    try {
        await workout.save()
    } catch (err) {
        console.log(err);
    }

    res.render('workouts/edit', { title: `Edit ${workout.name}`, workout})
}

async function deleteOne(req, res) {
    let currentUser
    try {
        currentUser = await User.findOne( { _id: req.user._id })
    } catch (err) {
        console.log(err);
    }

    const workoutIdx = currentUser.workouts.findIndex(w => w == req.params.id)
    currentUser.workouts.splice(workoutIdx, 1)
    await Workout.findByIdAndDelete(req.params.id)

    try {
        await currentUser.save()
    } catch (err) {
        console.log(err);
    }

    res.redirect('/workouts')
}