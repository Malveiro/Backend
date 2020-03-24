const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/product-model');
const addCorsHeaders = require('./cors-headers.js');

// POST route => to create a new product
router.post('/product', (req, res, next) => {
  const { name, price, category } = req.body;
  Product.create({
    name,
    price,
    category
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


// GET route => to get all the product
router.get('/product', (req, res, next) => {
  Product.find()
    .then(allTheProducts => {
      res = addCorsHeaders(res);
      res.json(allTheProducts);
    })
    .catch(err => {
      res = addCorsHeaders(res);
      res.json(err);
    });
});


// GET route => to retrieve a specific product
router.get('/product/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      console.log("this is it -->", product);
      res = addCorsHeaders(res);
      res.json(product);
    })
    .catch(error => {
      res = addCorsHeaders(res);
      res.json(error);
    });
});


// DELETE route => to delete a specific product
router.delete('/product/:productId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndRemove(req.params.productId)
    .then(() => {
      res = addCorsHeaders(res);
      res.json({ message: `Product with ${req.params.productId} is removed successfully.` });
    })
    .catch(error => {
      res = addCorsHeaders(res);
      res.json(error);
    });
});


module.exports = router;