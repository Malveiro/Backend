const mongoose = require('mongoose');
const User = require('../models/user-model');
const dbName = 'backend';
mongoose.connect(`mongodb://localhost/${dbName}`);

const log = [
  {
    email: "email@timeismoney.com",
    password: "123qwerty"
  },
]
User.create(log, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${log.length} `)
  mongoose.connection.close();
});