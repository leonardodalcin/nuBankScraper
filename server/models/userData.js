var mongoose = require('mongoose')

module.exports = mongoose.model('userData', {
  name: String,
  reg_time: {type: Date, default: Date.now}
});
