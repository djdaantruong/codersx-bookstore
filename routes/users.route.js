var controllerUser = require("../controllers/users.controller")
var validate = require('../validate/user.validate');
var express = require("express");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get("/seeUser", controllerUser.seeUser);

router.get('/search', controllerUser.searchUser);

router.get("/addUser", controllerUser.getAddUser);

router.post("/addUser", upload.single('avatar'), validate.postAddUser, controllerUser.postAddUser);

router.get("/:id/update", controllerUser.getUpdate);

router.post("/update", controllerUser.postUpdate);

router.get("/:id/delete", controllerUser.delete);

// router.get('/', userController.index);

// router.get('/add', userController.add);

// router.get('/:id/delete', userController.delete);

// router.get('/:id/update', userController.update);

// router.get('/profile', userController.profile);

// router.get('/profile/avatar', userController.uploadAvatar);

// router.post('/profile/avatar', upload.single('avatarUrl'), userController.postUpLoadAvatar);

// router.post('/add', userValidate.postAdd, userController.postAdd);

// router.post('/:id/update', userController.postUpdate);

module.exports = router;