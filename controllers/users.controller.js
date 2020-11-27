require('dotenv').config(); 

var cloudinary = require("cloudinary").v2;

var User = require("../models/user.model");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

module.exports.seeUser = async (req, res) => {
  var users = await User.find();

  res.render("users/seeUser", {
    users: users
  });
};

module.exports.searchUser = async (req, res) => {
	var users = await User.find({ $text: { $search: req.query.q }});
  
  res.render("users/seeUser", {
    users: users
  });
};

module.exports.getAddUser = (req, res) => {
  res.render("users/addUser");
};

module.exports.postAddUser = async (req, res) => {
  if (req.file) {
    var result = await cloudinary.uploader.upload(req.file.path);
    req.body.avatarUrl = result.url;
  }
  
  await User.create(req.body);
  
  res.redirect("/users/seeUser");
};

module.exports.delete = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  
  res.redirect("/users/seeUser");
};

module.exports.getUpdate = async (req, res) => {
  var id = req.params.id;
  
  res.render("users/update", {
    id: id
  });
};

module.exports.postUpdate = async (req, res) => {
  await User.findByIdAndUpdate(req.body.id, { name: req.body.name});
  
  res.redirect("/users/seeUser");
};
