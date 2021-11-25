let User = require('../models/user');
let passport = require('passport');
let jwt = require('jsonwebtoken')
let config = require('../config/config');

function getErrorMessage(err) {
  console.log("===> Erro: " + err);
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

// module.exports.renderSignin = function(req, res, next) {
//   if (!req.user) {
//     res.render('auth/signin', {
//       title: 'Sign-in Form',
//       messages: req.flash('error') || req.flash('info')
//     });
//   } else {
//     console.log(req.user);
//     return res.redirect('/');
//   }
// };

// module.exports.renderSignup = function(req, res, next) {
//   if (!req.user) {

//     // creates a empty new user object.
//     let newUser = User();

//     res.render('auth/signup', {
//       title: 'Sign-up Form',
//       messages: req.flash('error'),
//       user: newUser
//     });

//   } else {
//     return res.redirect('/');
//   }
// };

module.exports.signup = function (req, res, next) {
  // if (!req.user && req.body.password === req.body.password_confirm) {
    console.log(req.body);

    let user = new User(req.body);
    user.provider = 'local';
    console.log(user);

    user.save((err) => {
      if (err) {
        let message = getErrorMessage(err);

        return res.json({success: false, message: message});
        // req.flash('error', message);
        // return res.redirect('/users/signup');
        // return res.render('auth/signup', {
        //   title: 'Sign-up Form',
        //   messages: req.flash('error'),
        //   user: user
        // });
      }
      // req.login(user, (err) => {
      //   if (err) return next(err);
      //   return res.redirect('/');
      // });
      return res.json({success: true, message: 'User created successfully!'});
    });
    
  // } else {
  //   return res.redirect('/');
  // }
};

// module.exports.signout = function(req, res, next) {
//   req.logout();
//   res.redirect('/');
// };

module.exports.signin = function (req, res, next) {

  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.json({ success: false, message: err || info.message});
        }
        

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, config.secretKey);

            return res.json({ success: true, token: token });
          }
        );
      } catch (error) {
        // return next(error);
        console.log(error);
        return res.json({ success: false, message: error });
      }
    })(req, res, next);

  // delete req.session.url;
}