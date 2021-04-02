let router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth.middleware');

//public
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

//private
router.post('/logout', auth, AuthController.logout);
router.post('/logout-all', auth, AuthController.logoutAll);

module.exports = router;
