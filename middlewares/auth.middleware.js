var User = require('../models/user.model')

module.exports.requireAuth = async (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/loginUser');
        return;
    }
  
    var user = await User.findById(req.signedCookies.userId);

    if (!user) {
        res.redirect('/auth/loginUser');
        return;      
    }
  
    res.locals.user = user;
  
    next();
};

