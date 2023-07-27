const Routine = require('../models/routine')
const User = require('../models/user');


module.exports = {
    index,
    new: newRoutine,
    create,
    show,
    delete: deleteOne
};

async function index(req, res) {
    let routines
    try {
        routines = await Routine.find( { userId: req.user._id } ).populate('workouts')
    } catch (err) {
        console.log(err)
    }

    res.render('routines/index', { title: "Routines", routines })
}

async function newRoutine(req, res) {
    let user
    try {
        user = await User.findOne({ googleId: req.user.googleId}).populate('workouts')
    } catch (err) {
        console.log(err)
    }
    res.render('routines/new', { title: "Create A New Routine", workouts: user.workouts })
}

async function create(req, res) {

    req.body.userId = req.user._id

    try {
        await Routine.create(req.body)
    } catch (err) {
        console.log(err);
    }

    res.redirect('/routines')
}

async function show(req, res) {
    let routine
    try {
        routine = await Routine.findById(req.params.id).populate('workouts')
    } catch (err) {
        console.log(err)
    }
    res.render('routines/show', {title: routine.routineName, routine})
}

async function deleteOne(req, res) {
    try {
        await Routine.findByIdAndDelete(req.params.id)
    } catch (err) {
        console.log(err)
    }
    res.redirect('/routines')
}