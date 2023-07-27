const Routine = require('../models/routine')
const User = require('../models/user');


module.exports = {
    index,
    new: newRoutine,
    create
};

async function index(req, res) {
    let routines
    try {
        routines = await Routine.find( { userId: req.user._id } ).populate('workouts')
    } catch (err) {
        console.log(err)
    }
    console.log("there are the routines", routines)
    // routines.forEach(r => {
    //     console.log(r.workouts)
        
    // })
    res.render('routines/index', { title: "Routines", routines })
}

async function newRoutine(req, res) {
    res.render('routines/new', { title: "Create A New Routine", workouts: req.user.workouts })
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