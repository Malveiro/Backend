const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: String,
  net_income: Number,
  avg_expenses: Number,
  month_savings: Number
});

const Profile = mongoose.model('Project', profileSchema);

module.exports = Profile;



