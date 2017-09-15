const userRepository = require('../repositories/UserRepository');
const Promise = require('promise');

const mailer = require('../mailer');

const errors = require('../utils/Errors');

module.exports = {
    postSignUp: function (req, res, next) {
        Promise.all([
            userRepository.isUsernameAvailable(req.body.username),
            userRepository.isEmailAvailable(req.body.email)
        ]).then(function (results) {
            if(results[0] && results[1]) {
                return userRepository.signUpUser(req.body);
            } else {
                return Promise.reject(errors.invalidParameters('Username or email is already used'));
            }
        }).then(function () {
            res.sendStatus(204);
            mailer.sendWelcomeEmail(req.body.email);
        }, function(error) {
            next(error || errors.serverError);
        });
    },
    postSignIn: function (req, res, next) {
        userRepository.signInUser(req.body.username, req.body.password).then(function (user) {
            req.session.userid = user.userid;
            res.status(200).json({
                status: 'success',
                data: user
            });
        }, function () {
            next(errors.userInvalidCredential);
        });
    },
    deleteSignIn: function (req, res, next) {
        delete req.session.userid;
        res.sendStatus(204);
    },
    getLoggedInUser: function (req, res, next) {
        userRepository.getUserByUserID(req.session.userid).then(function (user) {
            res.status(200).json({
                status: 'success',
                data: user
            });
        }, function () {
            next(errors.invalidParameters);
        })
    },
    getIsEmailAvailable: function (req, res, next) {
        userRepository.isEmailAvailable(req.query.email).then(function (isAvailable) {
            res.status(200).json({
                status: 'success',
                data: isAvailable
            });
        }, function () {
            next(errors.serverError);
        })
    },
    getIsUsernameAvailable: function (req, res, next) {
        userRepository.isUsernameAvailable(req.query.username).then(function (isAvailable) {
            res.status(200).json({
                status: 'success',
                data: isAvailable
            });
        }, function () {
            next(errors.serverError);
        })
    }
};