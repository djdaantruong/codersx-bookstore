var shortid = require('shortid');
var Session = require('../models/session.model');

// module.exports = async (req, res, next) => {
//     if (!req.signedCookies.sessionId) {
//         let sessionId = shortid.generate();
//         res.cookie('sessionId', sessionId, {
//           signed: true
//         });
        
//         await Session.insertMany({
//           id: sessionId
//         })
//     }
//     next();
//   };

module.exports = async (req, res, next) => {
    try {
        if (!req.signedCookies.sessionId) {
            let session = await Session.create({ cart: [] });
        
            res.cookie("sessionId", session.id, {
              signed: true
            });
          }
        next();
    } catch (error) {
        next(error);
    }
}

// module.exports = function(req, res, next) {
//     if (!req.signedCookies.sessionId) {
//         var sessionId = shortid.generate();
//         res.cookie('sessionId', sessionId, {
//             signed: true
//         });
// //lowdb
//         db.get('sessions').push({
//             id: sessionId
//         }).write();
//     }

//     next();
// }
