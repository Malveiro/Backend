const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: String,
  name: String,
  net_income: Number,
  avg_expenses: Number,
  month_savings: Number
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;