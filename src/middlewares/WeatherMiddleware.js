const parameterError = require('../utils/Errors').invalidParameters;

const validateGames = function (req, res, next) {
    const week = req.query.week || 0;
    {
        const number = parseInt(week, 10);
        if (isNaN(number)) {
            next(parameterError());
        }
        req.query.week = (number === 0) ? 1 : number;
    }

    next();
};

const validateWeatherKey = function (req, res, next) {
    const weatherKey = req.query.weatherKey || null;
    if(weatherKey === null || weatherKey.trim().length === 0) {
        next(parameterError());
    }

    next();
};

module.exports = {
    validateGames: validateGames,
    validateWeatherKey: validateWeatherKey,
};