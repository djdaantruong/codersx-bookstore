var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: String,
  avatarUrl: {
    type: String,
    default: "https://res.cloudinary.com/dgp8yjtbi/image/upload/v1604846973/tl4dmqn8fbbcreimjtn3.jpg"
  },
  wrongLoginCount: String
});

userSchema.index({name: 'text'});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;

