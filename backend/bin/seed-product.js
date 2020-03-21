const mongoose = require('mongoose');
const Product = require('../models/product-model');
const dbName = 'backend';
mongoose.connect(`mongodb://localhost/${dbName}`);

const log = [
  {
    name: "iPhone XI",
    price: 829,
    category: "Phones"
  },
]
Product.create(log, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${log.length} `)
  mongoose.connection.close();
});