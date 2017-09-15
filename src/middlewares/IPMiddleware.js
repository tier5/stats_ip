const teams = require('../utils/parameters/teams');
const positions = require('../utils/parameters/positions');
const seasons = require('../utils/parameters/seasons');
const splits = require('../utils/parameters/splits');
const weather = require('../utils/parameters/weather');
const fields = require('../utils/parameters/fields');
const versusTypes = require('../utils/parameters/versusTypes');

const columns = require('../utils/parameters/columns');

const parameterError = require('../utils/Errors').invalidParameters;


const validatePlayersAndTeamsCommonFields = function (req, res, next) {
    const season = req.query.season || null;
    if (season !== null && Object.keys(seasons).indexOf(season) === -1) {
        next(parameterError());
    } else {
        // TODO: replace values with more practical data
    }

    const split = req.query.splits || null;
    if (split !== null) {
        try {
            const splitObject = JSON.parse(split);

            const resultSplit = {};
            resultSplit.WEEKS = splitObject.WEEKS.filter(function (week) {
                if (week === 'ALL') {
                    return false;
                } else if (Object.keys(splits.WEEKS).indexOf(week) === -1) {
                    next(parameterError());
                }
                return true;
            });

            if (resultSplit.WEEKS.length > 0 && (['THIS_SEASON', '2_WEEKS', '4_WEEKS', '8_WEEKS', '12_WEEKS']).indexOf(season) !== -1) {
                next(parameterError());
            }

            resultSplit.QUARTERS = splitObject.QUARTERS.filter(function (quarter) {
                if (quarter === 'ALL') {
                    return false;
                } else if (Object.keys(splits.QUARTERS).indexOf(quarter) === -1) {
                    next(parameterError());
                }
                return true;
            });

            // TODO: replace values with more practical data

            if (resultSplit.WEEKS.length === 0 && resultSplit.QUARTERS.length === 0) {
                req.query.splits = null;
            } else {
                req.query.splits = resultSplit;
            }
        } catch (err) {
            next(parameterError())
        }
    }

    const weatherPar = req.query.weather || null;
    if (weatherPar !== null) {
        try {
            const weatherObject = JSON.parse(weatherPar);

            const resultWeather = {};
            resultWeather.TEMPERATURES = weatherObject.TEMPERATURES.filter(function (temperature) {
                if (temperature === 'ALL') {
                    return false;
                } else if (Object.keys(weather.TEMPERATURES).indexOf(temperature) === -1) {
                    next(parameterError());
                }
                return true;
            });

            resultWeather.CONDITIONS = weatherObject.CONDITIONS.filter(function (condition) {
                if (condition === 'ALL') {
                    return false;
                } else if (Object.keys(weather.CONDITIONS).indexOf(condition) === -1) {
                    next(parameterError());
                }
                return true;
            });

            // TODO: replace values with more practical data

            if (resultWeather.CONDITIONS.length === 0 && resultWeather.TEMPERATURES.length === 0) {
                req.query.weather = null;
            } else {
                req.query.weather = resultWeather;
            }
        } catch (err) {
            next(parameterError())
        }
    }

    const jsonField = req.query.fields || null;
    if (jsonField !== null) {
        try {
            const arrayField = JSON.parse(jsonField);
            const resultFields = arrayField.filter(function (field) {
                if (field === 'ALL') {
                    return false;
                } else if (Object.keys(fields).indexOf(field) === -1) {
                    next(parameterError());
                }
                return true;
            });

            if (resultFields.length === 0) {
                req.query.fields = null;
            } else {
                req.query.fields = resultFields;
            }
        } catch (err) {
            next(parameterError())
        }
    }

    const versusType = req.query.versus || null;
    if (versusType !== null && Object.keys(versusTypes).indexOf(versusType) === -1) {
        next(parameterError());
    }

    const versusValue = req.query.versus_val || null;
    if (versusType === null ^ versusValue === null) {
        next(parameterError());
    }

    // TODO: validate versusVal even more

    const limit = req.query._limit || null;
    if (limit !== null) {
        const number = parseInt(limit, 10);
        if (isNaN(number)) {
            next(parameterError());
        }
        req.query._limit = (number === 50 || number === 0) ? null : number;
    }

    const page = req.query._page || null;
    if (page !== null) {
        const number = parseInt(page, 10);
        if (isNaN(number)) {
            next(parameterError());
        }
        req.query._page = number === 0 ? null : page;
    }

    const order = req.query.order || null;
    if (order !== null) {
        if (!columns.ORDERS.includes(order)) {
            next(parameterError());
        }
    } else {
        req.query.order = 'DESC';
    }

    const orderBy = req.query.orderBy || null;
    if (orderBy === null && order !== null) {
        next(parameterError());
    } else if (orderBy === null) {
        req.query.orderBy = null;
    }

    next();
};

const validatePlayersNFLP = function (req, res, next) {
    const search = req.query.search || null;
    if (search === '') {
        next(parameterError())
    }

    const team = req.query.team || null;
    if (team !== null && Object.keys(teams).indexOf(team) === -1) {
        next(parameterError())
    }

    const jsonPosition = req.query.positions || null;
    if (jsonPosition !== null) {
        try {
            const arrayPositions = JSON.parse(jsonPosition);
            const resultPositions = arrayPositions.filter(function (position) {
                if (position === 'ALL') {
                    return false;
                } else if (Object.keys(positions.nflp).indexOf(position) === -1) {
                    next(parameterError());
                }
                return true;
            });

            if (resultPositions.length === 0) {
                req.query.positions = null;
            } else {
                req.query.positions = resultPositions;
            }
        } catch (err) {
            next(parameterError())
        }
    }

    next();
};

const validateTeamsNFLT = function (req, res, next) {
    const team = req.query.team || null;
    if (team !== null && Object.keys(teams).indexOf(team) === -1) {
        next(parameterError())
    }

    const jsonPosition = req.query.position || null;
    if (jsonPosition !== null) {
        try {
            const arrayPositions = JSON.parse(jsonPosition);
            const resultPositions = arrayPositions.filter(function (position) {
                if (position === 'ALL') {
                    return false;
                } else if (Object.keys(positions.nflt).indexOf(position) === -1) {
                    next(parameterError());
                }
                return true;
            });

            if (resultPositions.length === 0) {
                req.query.position = null;
            } else {
                req.query.position = resultPositions;
            }
        } catch (err) {
            next(parameterError())
        }
    }

    next();
};

module.exports = {
    validatePlayersAndTeamsCommonFields: validatePlayersAndTeamsCommonFields,
    validatePlayersNFLP: validatePlayersNFLP,
    validateTeamsNFLT: validateTeamsNFLT,
};
