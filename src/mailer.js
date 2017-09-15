const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const transporter = nodemailer.createTransport(
    {
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
        port: process.env.SMTP_PORT || 2525,
        secure: (process.env.SMTP_PORT === 587),
        auth: {
            user: process.env.SMTP_USER || '884c45ccfcc481',
            pass: process.env.SMTP_PASS || 'be3147554d2c10'
        }
    },
    {
        from: '"Statroute" <info@statroute.com>'
    }
);

transporter.use('compile', hbs({
    viewPath: path.join(__dirname, 'views/emails'),
    extName: '.hbs'
}));

const _sendMail = function (options) {
    transporter.sendMail(options, (error) => {
        if (error) {
            return console.error(error);
        }
    });
};

module.exports = {
    sendWelcomeEmail: function(email) {
        const mailOptions = {
            to: email,
            subject: 'Welcome to Statroute',
            template: 'welcome',
            context: {
                email: email
            }
        };

        _sendMail(mailOptions);
    },
    sendVerifyEmail: function(email, name, hash) {
        const mailOptions = {
            to: email,
            subject: 'Password reset request for StatRoute',
            template: 'emailVerification',
            context: {
                email: email,
                link: hash, // TODO: change to valid link
                name: name
            }
        };

        _sendMail(mailOptions);
    },
    sendPasswordChangeEmail: function(email, name, hash) {
        const mailOptions = {
            to: email,
            subject: 'StatRoute Password Change Request',
            template: 'passwordChange',
            context: {
                email: email,
                link: hash, // TODO: change to valid link
                name: name
            }
        };

        _sendMail(mailOptions);
    },
};
