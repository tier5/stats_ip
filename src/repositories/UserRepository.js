const db = require('../database');
const Promise = require('promise');

const NEW_USER_INSERT = (
    'INSERT INTO srusers (userid, firstname, lastname, email, username, pswhash, zip, gender, bday, bmonth, promocode, newsletter, urlsignup, accounttype, datefirstsignup) ' +
    'VALUES ((SELECT COALESCE(MAX(userid), 0) + 1 FROM srusers), ${firstname},  ${lastname},  ${email},  ${username},  crypt(${password}, gen_salt(\'bf\')),  ${zip},  ${gender},  ${bday},  ${bmonth},  ${promocode},  ${newsletter},  ${urlsignup}, \'1\', ${datefirstsignup});'
);

const EMAIL_ALREADY_USED_SELECT = (
    'SELECT COUNT(*) AS count from srusers where email = ${email};'
);

const USERNAME_ALREADY_USED_SELECT = (
    'SELECT COUNT(*) AS count from srusers where username = ${username};'
);

const SIGNIN_USER_SELECT = (
    'SELECT * from srusers where username = ${username} and pswhash = crypt(${password}, pswhash);'
);

const GET_USER_SELECT = (
    'SELECT * from srusers where userid = ${userid};'
);

module.exports = {

    signUpUser: function (values) {
        return new Promise(function (resolve, reject) {
            values.datefirstsignup = new Date();
            db.any(NEW_USER_INSERT, values).then(function () {
                resolve();
            }, function () {
                reject();
            });
        });
    },

    getUserByUserID: function (userid) {
        return new Promise(function (resolve, reject) {
            db.one(GET_USER_SELECT, {
                userid: userid
            }).then(function (user) {
                delete user.pswhash;
                resolve(user);
            }, function () {
                reject();
            });
        });
    },

    signInUser: function (username, password) {
        return new Promise(function (resolve, reject) {
            db.one(SIGNIN_USER_SELECT, {
                username: username,
                password: password
            }).then(function (user) {
                delete user.pswhash;
                resolve(user);
            }, function () {
                reject();
            });

        });
    },

    isEmailAvailable: function (email) {
        return new Promise(function (resolve, reject) {
            db.one(EMAIL_ALREADY_USED_SELECT, {
                email: email
            }).then(function (row) {
                resolve(parseInt(row.count, 10) === 0);
            }, function () {
                reject();
            })
        });
    },

    isUsernameAvailable: function (username) {
        return new Promise(function (resolve, reject) {
            db.one(USERNAME_ALREADY_USED_SELECT, {
                username: username
            }).then(function (row) {
                resolve(parseInt(row.count, 10) === 0);
            }, function () {
                reject();
            })
        });
    }
};
