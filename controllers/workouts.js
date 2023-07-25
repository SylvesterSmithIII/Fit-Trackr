const User = require('../models/user');


module.exports = {
    show,
    create
};

async function show(req, res) {
    let currentUser
    try {
        currentUser = await User.findOne( { googleId: res.locals.user.googleId } )
    } catch (err) {
        console.log(err)
    }
    res.render('workouts/show', { title: "Workouts", workouts: currentUser.workouts })
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