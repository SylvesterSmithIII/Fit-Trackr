const User = require('../models/user');
const Routine = require('../models/routine')


module.exports = {
    show,
    new: newRoutine
};

async function show(req, res) {
    let currentUser
    let routines
    try {
        currentUser = await User.findOne( { googleId: res.locals.user.googleId } )
        routines = await Routine.find( { userId: currentUser._id } )
    } catch (err) {
        console.log(err)
    }
    console.log(currentUser)
    res.render('routines/show', { title: "Routines", currentUser, routines })
}

async function newRoutine(req, res) {
    res.render('routines/new', { title: "Create Routine" })
}