var models  = require('../models');
var express = require('express');
var router  = express.Router();

cors = require("cors");


router.use(cors())

//TODO: delete this. this is just for testing


//TODO: Register
router.post('/register', function(req, res){
  const userData = { 
    email: req.body.email,
    password: req.body.password
  }

  models.Users.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) {
      console.log("User created")
      models.Users.create(userData)
      .then(
        res.send({"status": 200, message: "User created"})
      )
    } else {
      console.log("This email has been blacklisted or not activated. Try another email.")
    }
  })
})

router.post('/checkPostcode', function(req, res){
  //TODO: Add a list of post codes to check from
  
  //TODO: Do a number check
  console.log(req.body);
  if (req.body.postCode === '2500'){
    res.send({"status": 200, "isValid": true})
  } else {
    res.send({"status": 200, "isValid": false})
  }
})

//TODO: Login

module.exports = router