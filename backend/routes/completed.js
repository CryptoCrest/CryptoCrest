var express = require('express');
var router = express.Router();
let passport = require('passport');

let completedController = require('../controller/completed');

// Connect to our model
let Completed = require('../models/survey');


// // helper function for guard purposes
// function requireAuth(req, res, next)
// {
//     // check if the user is logged in
//     if(!req.isAuthenticated())
//     {
//         req.session.url = req.originalUrl;
//         return res.redirect('/users/signin');
//     }
//     next();
// }

/* GET list of items */
//router.get('/list', surveyController.surveyList);
//router.get('/get-item/:id', surveyController.surveyByID, surveyController.getItem);

// Routers for edit
// router.get('/edit/:id', requireAuth, surveyController.displayEditPage);
router.post('/viewQues/:id', completedController.processAdd);

// Router to Delete
//router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), surveyController.performDelete);


/* GET Route for displaying the Add page - CREATE Operation */
// router.get('/add', requireAuth, surveyController.displayAddPge);

/* POST Route for processing the Add page - CREATE Operation */
//router.post('/add', passport.authenticate('jwt', { session: false }), surveyController.processAdd);

module.exports = router;