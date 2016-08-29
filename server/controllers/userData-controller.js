var UserData = require('../models/userData.js')

module.exports.create = function(req, res) {
  console.log('creating')
  var userData = new UserData(req.body);
  userData.save(function (err, result) {
    res.json(result)
  });
}

module.exports.list = function(req, res) {
  UserData.find({}, function(err, result){
    res.json(result);
  })
}
