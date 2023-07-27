const User = require('../models/user');

const Sample_Workout = require('../models/sample_workouts')


module.exports = {
    index,
    create,
    show,
    edit,
    delete: deleteOne
};

async function index(req, res) {

    let sample_workouts

    if (req.query.name === "") delete req.query.name
    try {
        sample_workouts = await Sample_Workout.find(req.query)
    } catch (err) {
        console.log(err);
    }
    res.render('workouts/index', { title: "Workouts", workouts: req.user.workouts, sample_workouts })
}

async function create(req, res) {

    try {
        const user = await User.findOne( { _id: req.user._id } )
        try {
            user.workouts.push(req.body)
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

    const workout = req.user.workouts.find(w => w._id == req.params.id)

    res.render('workouts/edit', { title: `Edit ${workout.name}`, workout})
}

async function edit(req, res) {
    let currentUser
    let workout
    try {
        currentUser = await User.findOne( { _id: req.user._id })
        workout = currentUser.workouts.find(w => w._id == req.params.id)
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
        await currentUser.save()
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

    const workoutIdx = currentUser.workouts.findIndex(w => w._id == req.params.id)
    currentUser.workouts.splice(workoutIdx, 1)

    try {
        await currentUser.save()
    } catch (err) {
        console.log(err);
    }

    res.redirect('/workouts')
}