let User = require('../models/user');
let passport = require('passport');
let jwt = require('jsonwebtoken')
let config = require('../config/config');

//function to get error message 
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

//logic for sign up page
module.exports.signup = function (req, res, next) {
  // if (!req.user && req.body.password === req.body.password_confirm) {
    console.log(req.body);

    let user = new User(req.body);
    user.provider = 'local';
    console.log(user);

    //save user information
    user.save((err) => {
      if (err) {
        let message = getErrorMessage(err);

        return res.json({success: false, message: message});
      }
      return res.json({success: true, message: 'User created successfully!'});
    });
};


//logic authenticating user information
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
}

//logic for getting user list
module.exports.userList = function(req, res, next) {  

  User.find((err, userList) => {
      if(err)
      {
          console.error(err);
          return res.status(400).send({   
              success: false, 
              message: getErrorMessage(err)
          });
      }
      else
      {
          res.status(200).json(userList);            
      }
  });
}

//gets user by ID
exports.userByID = function (req, res, next) {

  let id = req.params.id;
  
  User.findById(id, (err, item) => {
      if (err) return next(err);
      if (!item) return next(new Error('Failed to load a item '+ username +' from the survey '));

      req.item = item;
      console.log(item);
      next();
  });
};

//logic to process edit user
module.exports.processEditUser = (req, res, next) => {

  let id = req.params.id


  let updatedItem = new User(req.body)

  User.updateOne({_id: id}, updatedItem, (err) => {
      if(err)
      {
          console.log(err);
          //res.end(err);
          return res.status(400).json({
              success: false,
              message: getErrorMessage(err)
          });
      }
      else
      {
          
          res.status(200).json(updatedItem); 
      }
  });

}

exports.getItem = function (req, res) {
  res.status(200).json(req.item);
};
