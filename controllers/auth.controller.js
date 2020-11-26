var nodemailer = require('nodemailer');

var bcrypt = require('bcrypt');

var User = require('../models/user.model');

module.exports.getLogin = (req, res) => {
	res.render('auth/loginUser');
};

module.exports.postLogin = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var user = await User.findOne({ email: email });

    if(!user) {
        res.render('auth/loginUser', {
            errors: [
                'User does not exist'
            ],
            values: req.body
        });
        return;
    }
  
    if (!user.wrongLoginCount) {
        user.updateOne({ $set: { wrongLoginCount: 0 } });
    }
  
    if (user.wrongLoginCount >= 4) {
        var transport = nodemailer.createTransport({
            service: "Gmail",
            port: 2525,
            auth: {
              user: process.env.adminEmail,
              pass: process.env.adminPassword
            }
          });
      
        res.render("auth/loginUser", {
            errors: ["Your account has been locked."],
            values: req.body
        });

        var mailOptions = {
            from: process.env.adminEmail,
            to: email,
            subject: 'Cảnh báo đăng nhập',
            text: `Your account ${email} has been locked`,
            html: '<b>Your account has been locked.Admin: Djdaan Truong<b/>'
           
          };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
          });

    return;
    }

    var saltRounds = 10;
    var myPlaintextPassword = password ;
    var salt = bcrypt.genSaltSync(saltRounds);

    bcrypt.compare(myPlaintextPassword, user.password, (err, result) => {
      if(result === true) {
        var newValue = (user.wrongLoginCount += 1);
        user.updateOne({ $set: { wrongLoginCount: newValue } });
        
        res.render('auth/loginUser',{
            errors: ['Wrong password.'],
            values: req.body
        });
        return;
      }

    res.cookie('userId', user.id, {
      signed: true
    });
    res.redirect('/users/seeUser');
  });
    return;
};

module.exports.postLogout = function(req, res){
  
};
