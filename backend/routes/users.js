let express = require('express');
let router = express.Router();
let usersController = require('../controller/user');
let passport = require('passport');

// /* GET users listing. */
// router.get('/', function(req, res, next) {  
//   res.render('users', { 
//     title: 'Users',
//     userName: req.user ? req.user.username : ''
//   });
// });

// routes sign up page
router.post('/signup', usersController.signup);

// routers sign in page
router.post('/signin', usersController.signin);

// router.get('/signout', usersController.signout);
//* GET list of items */
router.get('/userprofile', usersController.userList);
router.get('/get-item/:id', usersController.userByID, usersController.getItem);

// router.get('/edit/:id', requireAuth, surveyController.displayEditPage);
router.put('/editUser/:id', passport.authenticate('jwt', { session: false }), usersController.processEditUser);


module.exports = router;

