const express = require('express');
const router  = express.Router();
const addCorsHeaders = require('./cors-headers.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res = addCorsHeaders(res);
  res.render('index');
});


module.exports = router;