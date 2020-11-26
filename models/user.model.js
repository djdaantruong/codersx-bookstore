var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: String,
  avatarUrl: String,
  wrongLoginCount: String
});

userSchema.index({name: 'text'});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;

