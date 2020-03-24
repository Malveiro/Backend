const express = require('express');
const mongoose = require('mongoose');

const admin = require('firebase-admin');
const serviceAccount = require("../configs/fbServiceAccountKey.json");

const Profile = require('../models/profile-model');
const User = require('../models/user-model');
const router = express.Router();

const addCorsHeaders = require('./cors-headers.js');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projects-auth-240f2.firebaseio.com"
});



// POST route => to create a new profile
router.post('/signup', (req, res, next) => {
  const { user, name, net_income, avg_expenses, month_savings } = req.body;
  Profile.create({
    user,
    name,
    net_income,
    avg_expenses,
    month_savings
  })
    .then(response => {
      res = addCorsHeaders(res);
      res.json(response);
    })
    .catch(err => {
      res = addCorsHeaders(res);
      res.json(err);
    });
});


// // POST route => to create a new profile
// router.post('/signup', (req, res, next) => {
//     Profile.create({
//       user: req.body.user,
//       name: req.body.name,
//       net_income: req.body.net_income,
//       avg_expense: req.body.avg_expense,
//       month_savings: req.body.month_savings
//     })
//       .then(response => {
//         return User.findByIdAndUpdate(req.body.userID, {
//           $push: { profile: response._id }
//         });
//       })
//       .then(theResponse => {
//         res.json(theResponse);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });



// // POST route => to create a new Profile (with JWT authentication)
// router.post('/signup', (req, res, next) => {
//   if (req.headers.authorization) {
//     console.log("token? ---->", req.headers.authorization);
//     admin.auth().verifyIdToken(req.headers.authorization)
//       .then((decodedToken) => {
//         console.log('decoded token', decodedToken);
//         const { name, net_income, avg_expenses, month_savings} = req.body;
//         Profile.create({
//           user: decodedToken.uid,
//           name,
//           net_income,
//           avg_expenses,
//           month_savings
//         })
//           .then(response => {
//             res.json(response);
//           })
//           .catch(err => {
//             res.json(err);
//           });
//       }).catch(() => {
//         res.status(403).json({message: 'Unauthorized_if'});
//       });
//   } else {
//     res.status(403).json({message: 'Unauthorized_else'});
//   }
// });

  


// // GET route => to retrieve a specific Profile by ID
// router.get('/profile/:profileId', (req, res, next) => {
//   Profile.findById(req.params.profileId)
//     .then(profile => {
//       console.log("this is it -->", profile)
//       res.json(profile);
//     })
//     .catch(error => {
//       res.json(error);
//     });
// });


// GET route => to retrieve a specific Profile by user (aka email)
router.get('/profile/:user', (req, res, next) => {
  Profile.findOne({user: req.params.user})
    .then(profile => {
      console.log("backend: this is it? -->", profile);
      res = addCorsHeaders(res);
      res.json(profile);
    })
    .catch(error => {
      res = addCorsHeaders(res);
      res.json(error);
    });
});

// PUT route => to update a specific profile
router.put('/profile/:profileId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.profileId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Profile.findByIdAndUpdate(req.params.profileId, req.body)
    .then(() => {
      res = addCorsHeaders(res);
      res.json({ message: `Profile with ${req.params.profileId} is updated successfully.` });
    })
    .catch(error => {
      res = addCorsHeaders(res);
      res.json(error);
    });
});



// GET route => to get all the profiles
router.get('/profile', (req, res, next) => {
  Profile.find()
    .then(allTheProfile => {
      res = addCorsHeaders(res);
      res.json(allTheProfile);
    })
    .catch(err => {
      res = addCorsHeaders(res);
      res.json(err);
    });
});


module.exports = router;