const errors = require('../utils/Errors');

module.exports = {
    validateSignUp: function (req, res, next) {

        const firstname = req.body.firstname || null;
        if (firstname === null) {
            next(errors.invalidParameters('First name is required', 'firstname'));
        } else if (firstname.length <= 0 || firstname > 25) {
            next(errors.invalidParameters('First name must be between 1 and 25 characters long', 'firstname'));
        }

        const lastname = req.body.lastname || null;
        if (lastname === null) {
            next(errors.invalidParameters('Last name is required', 'lastname'));
        } else if (lastname.length <= 0 || lastname > 25) {
            next(errors.invalidParameters('Last name must be between 1 and 25 characters long', 'lastname'));
        }

        const email = req.body.email || null;
        if (email === null) {
            next(errors.invalidParameters('Email is required', 'email'));
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            next(errors.invalidParameters('Email is no valid', 'email'));
        }

        const username = req.body.username || null;
        if (username === null) {
            next(errors.invalidParameters('Username is required', 'username'));
        } else if (username.trim().length <= 0 || username.trim().length > 25) {
            next(errors.invalidParameters('Username must be between 1 and 25 characters long', 'username'));
        }

        const password = req.body.password || null;
        if (password === null) {
            next(errors.invalidParameters('Password is required', 'password'));
        } else if (password.trim().length <= 0 || password.trim().length > 64) {
            next(errors.invalidParameters('Password must be between 1 and 64 characters long', 'password'));
        }

        const zip = req.body.zip || null;
        if (zip === null) {
            next(errors.invalidParameters('ZIP is required', 'zip'));
        } else if (!/[0-9]{5}/.test(zip)) {
            next(errors.invalidParameters('ZIP format invalid', 'zip'));
        }

        /*const gender = req.body.gender || null;
        if(gender === null) {
            next(errors.invalidParameters('Gender is required', 'gender'));
        } else if(gender !== 'M' && gender !== 'F') {
            next(errors.invalidParameters('Gender format invalid', 'gender'));
        }

        const bday = req.body.bday || null;
        if(bday === null) {
            next(errors.invalidParameters('BDay is required', 'bday'));
        } else if(isNaN(bday)) {
            next(errors.invalidParameters('BDay must be numeric', 'bday'));
        } else if(parseInt(bday) <= 0 || parseInt(bday) > 31) {
            next(errors.invalidParameters('BDay must be between 1 and 31', 'bday'));
        }

        const bmonth = req.body.bmonth || null;
        if(bmonth === null) {
            next(errors.invalidParameters('BMonth is required', 'bmonth'));
        } else if(isNaN(bmonth)) {
            next(errors.invalidParameters('BMonth must be numeric', 'bmonth'));
        } else if(parseInt(bmonth) <= 0 || parseInt(bmonth) > 12) {
            next(errors.invalidParameters('BMonth must be between 1 and 12', 'bmonth'));
        }*/
        req.body.gender = null;
        req.body.bday = null;
        req.body.bmonth = null;

        const newsletter = req.body.newsletter;
        if(typeof newsletter === 'undefined') {
            next(errors.invalidParameters('Newsletter is required', 'newsletter'));
        } else if (newsletter !== false && newsletter !== true) {
            next(errors.invalidParameters('BMonth must be boolean', 'newsletter'));
        }

        req.body.promocode = req.body.promocode || null;
        req.body.urlsignup = req.body.urlsignup || null;

        next();
    },
    validateSignIn: function (req, res, next) {
        if (req.session.userid) {
            next(errors.userAlreadyLoggedIn);
        }

        const username = req.body.username || null;
        if (username === null) {
            next(errors.invalidParameters('Username is required', 'username'));
        } else if (username.trim().length <= 0 || username.trim().length > 25) {
            next(errors.invalidParameters('Username must be between 1 and 25 characters long', 'username'));
        }

        const password = req.body.password || null;
        if (password === null) {
            next(errors.invalidParameters('Password is required', 'password'));
        } else if (password.trim().length <= 0 || password.trim().length > 64) {
            next(errors.invalidParameters('Password must be between 1 and 64 characters long', 'password'));
        }

        next();
    },
    validateLoggedIn: function (req, res, next) {
        if (!req.session.userid) {
            next(errors.userNotLoggedIn);
        }
        next();
    },
    validateEmail: function (req, res, next) {
        const email = req.query.email || null;
        if (email === null) {
            next(errors.invalidParameters('Email is required', 'email'));
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            next(errors.invalidParameters('Email is no valid', 'email'));
        }
        next();
    },
    validateUsername: function (req, res, next) {
        const username = req.query.username || null;
        if (username === null) {
            next(errors.invalidParameters('Username is required', 'username'));
        } else if (username.trim().length <= 0 || username.trim().length > 25) {
            next(errors.invalidParameters('Username must be between 1 and 25 characters long', 'username'));
        }
        next();
    }

};