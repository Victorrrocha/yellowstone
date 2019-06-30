var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '1234'));
var session = driver.session();

const User = require('../schema/user');
const Products = require('../schema/product')

router.get('/', function(req, res, next) {
  //const prod = req.Products;  
  
  Products.find().exec()
  .then(p =>{
    console.log(p);
    res.render('landingPage', {
      produto: p
    });
  })
  .catch(err =>{
    console.log(err);
  });
  
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  
  res.render('register');
});
  
// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }


  session
  .run('CREATE(n:User {email:{email} } ) RETURN n.email', {email: email})
  .then(function(){
    console.log("ADDED TO NEO4J");
    session.close();
  })
  .catch(function(err){
    console.log(err);
  })
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/loggedPage',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/loggedPage' ,function(req, res) {
  
  Products.find().exec()
  .then(p =>{
    console.log(p);
    res.render('loggedPage', {
      produto: p,
      name: req.user.name
    });
  })
  .catch(err =>{
    console.log(err);
  });
  
  
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;