const User = require('../models/user');
const Routine = require('../models/routine')


module.exports = {
    index,
    new: newRoutine,
    create
};

async function index(req, res) {
    let currentUser
    let routines
    try {
        routines = await Routine.find( { userId: req.user._id } )
    } catch (err) {
        console.log(err)
    }
    res.render('routines/show', { title: "Routines", currentUser, routines })
}

async function newRoutine(req, res) {
    res.render('routines/new', { title: "Create Routine", workouts: req.user.workouts })
}

async function create(req, res) {
    let routines

    try {
        routines = await Routine.find( { userId: req.user._id } )
    } catch (err) {
        console.log(err)
    }

    req.body.userId = req.user._id
    
    try {
        await Routine.create(req.body)
    } catch (err) {
        console.log(err);
    }

    res.redirect('/routines')
}