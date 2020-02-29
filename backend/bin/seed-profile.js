const mongoose = require('mongoose');
const Profile = require('../models/profile-model');
const dbName = 'backend';
mongoose.connect(`mongodb://localhost/${dbName}`);

const log = [
    {
      user: "5e5a8ea58f5e763e66dc7974",
      name: "Gonçalo",
      net_income: 2000,
      avg_expenses: 1000,
      month_savings: 500
    },
]
Profile.create(log, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${log.length} `)
  mongoose.connection.close();
}); 