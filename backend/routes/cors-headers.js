​
module.exports = function (res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://time-is-money-dude.s3-website.eu-west-2.amazonaws.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
​
  return res;
};