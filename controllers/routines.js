const User = require('../models/user');
const Routine = require('../models/routine')


module.exports = {
    show,
    new: newRoutine,
    create
};

async function show(req, res) {
    let currentUser
    let routines
    try {
        currentUser = await User.findOne( { googleId: res.locals.user.googleId } )
        routines = await Routine.find( { userId: currentUser.googleId } )
    } catch (err) {
        console.log(err)
    }
    res.render('routines/show', { title: "Routines", currentUser, routines })
}

async function newRoutine(req, res) {
    let currentUser
    try {
        currentUser = await User.findOne( { googleId: res.locals.user.googleId } )
    } catch (err) {
        console.log(err)
    }
    res.render('routines/new', { title: "Create Routine", workouts: currentUser.workouts })
}

async function create(req, res) {
    let currentUser
    let routines
    try {
        currentUser = await User.findOne( { googleId: res.locals.user.googleId } )

        try {
            routines = await Routine.find( { userId: currentUser._id } )
        } catch (err) {
            console.log(err)
        }

    } catch (err) {
        console.log(err)
    }

    req.body.userId = res.locals.user.googleId
    try {
        await Routine.create(req.body)
    } catch (err) {
        console.log(err);
    }

    res.redirect('/routines')
}