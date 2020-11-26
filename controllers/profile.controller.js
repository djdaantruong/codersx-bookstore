require('dotenv').config()
var cloudinary = require("cloudinary").v2;

var User = require("../models/user.model");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

module.exports.index = async (req, res) => {
  var user = await User.findById(req.signedCookies.userId);

  res.render("profile/index", {
    user: user
  });
};

module.exports.update = async (req, res) => {
  var user = await User.findById(req.signedCookies.userId);

  res.render("profile/update", {
    user: user
  });
};

module.exports.postUpdate = async (req, res) => {
  if (!req.file) {
    var result = await cloudinary.uploader.upload(
      "https://cdn.glitch.com/ba0aeb12-7bf1-496f-9b21-39133dc00d54%2Flogo-starbucks-hien-tai.gif?v=1597253595138"
    );
  } else {
    var result = await cloudinary.uploader.upload(req.file.path);
    }
  var user = await User.findById(req.body.id);
  
  user.updateOne({ $set: { avatarUrl: result.url } });

  res.redirect("/profile/index" + req.body.id);
};

