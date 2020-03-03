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




// PUT route => to update a specific profile
router.put('/tasks/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE route => to delete a specific task
router.delete('/tasks/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;