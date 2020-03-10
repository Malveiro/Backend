const express = require('express');
const mongoose = require('mongoose');
const Profile = require('../models/profile-model');
const User = require('../models/user-model');
const router = express.Router();

// POST route => to create a new profile
router.post('/profile', (req, res, next) => {
    Profile.create({
      user: req.body.userID,
      name: req.body.name,
      net_income: req.body.net_income,
      avg_expense: req.body.avg_expense,
      month_savings: req.body.month_savings
    })
      .then(response => {
        return User.findByIdAndUpdate(req.body.userID, {
          $push: { profile: response._id }
        });
      })
      .then(theResponse => {
        res.json(theResponse);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
// GET route => to retrieve a specific profile
router.get('/user/:userId/profile/:profileId', (req, res, next) => {
  Profile.findById(req.params.profileId)
    .then(profile => {
      res.json(profile);
    })
    .catch(error => {
      res.json(error);
    });
});


module.exports = router;