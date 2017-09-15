var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var sassMiddleware = require('node-sass-middleware');

var api = require('./src/routes/api');

var app = express();

var NFLUtils = require('./src/utils/NFLUtilsDB');

// set sessions
const sessionSettings = {
    secret: 'sl2kfH3nFgj3gjkghJg43BJvbjhvb',
    resave: false,
    saveUninitialized: true,
    cookie: { }
};
app.enable('trust proxy');

if (app.get('env') === 'production') {
    sessionSettings.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionSettings));

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* app.use(sassMiddleware({
    src: path.join(__dirname, 'src/public'),
    dest: path.join(__dirname, 'src/public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
})); */

app.use('/api', api);

app.use('/static', express.static(path.join(__dirname, 'client/build-prod/static')));
app.use('/resources', express.static(path.join(__dirname, 'client/build-prod/resources')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(/^\/(?!api).*$/, function (req, res, next) {
    fs.readFile(path.join(__dirname, 'client/build-prod/index.html'), 'utf8', function (err, data) {
        if(err) {
            next(err);
            return;
        }
        const replaceTo = 'window.NFL_UTILS={week:'+NFLUtils.getCurrentNFLWeek() +',season:'+NFLUtils.getCurrentNFLYear() + '}';
        data = data.replace(/window\.NFL_UTILS={.*?}/, replaceTo);
        res.status(200).send(data);
    });

    //res.sendFile(path.join(__dirname, 'client/build-prod/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    if(err.json) {
        const response = {
            message: err.message,
            error: true
        };

        if(req.app.get('env') === 'development') {
            Object.assign(response, {
                stack: err
            });
        }
        res.status(err.status || 500).json(response);
    } else {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
});

module.exports = app;
