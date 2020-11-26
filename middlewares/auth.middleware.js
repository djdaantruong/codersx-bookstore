var User = require('../models/user.model')

module.exports.requireAuth = (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/loginUser');
        return;
    }
  
    var user = User.findById(req.signedCookies.userId)
    console.log(req.signedCookies.userId);
    if (!user) {
        res.redirect('/auth/loginUser');
        return;      
    }
  
    res.locals.user = user;
  
    next();
};

