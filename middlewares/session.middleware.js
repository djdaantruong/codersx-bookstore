var Session = require('../models/session.model');

module.exports = async (req, res, next) => {
    if (!req.signedCookies.sessionId) {
        var sessionId = await Session.create({ cart: [] });
      
        res.cookie('sessionId', sessionId, {
            signed: true
        });
    }
    next();
}
