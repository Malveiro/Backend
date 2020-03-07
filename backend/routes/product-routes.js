const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/product-model');


// POST route => to create a new product
router.post('/product', (req, res, next) => {
  const { name, price, category } = req.body;
  Product.create({
    name,
    price,
    category
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route => to retrieve a specific product
router.get('/product/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      console.log("this is it>>>>>>>>>>>>>", product)
      res.json(product);
    })
    .catch(error => {
      res.json(error);
    });
});


module.exports = router;