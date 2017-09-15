const router = require('express').Router();
const mailer = require('../mailer');

const validator = require('../middlewares/AuthMiddleware');
const controller = require('../controllers/AuthController');

router.post('/signup', validator.validateSignUp, controller.postSignUp);

router.post('/signin', validator.validateSignIn, controller.postSignIn);
router.delete('/signin', validator.validateLoggedIn, controller.deleteSignIn);

router.get('/user', validator.validateLoggedIn, controller.getLoggedInUser);

router.get('/isEmailAvailable', validator.validateEmail, controller.getIsEmailAvailable);
router.get('/isUsernameAvailable', validator.validateUsername, controller.getIsUsernameAvailable);




module.exports = router;
