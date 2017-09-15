
const teams = require('../utils/parameters/teams');

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

const validateGameField = function (req, res, next) {
    const week = req.query.week || 0;
    {
        const number = parseInt(week, 10);
        if (isNaN(number)) {
            next(parameterError());
        }
        req.query.week = (number === 0) ? 1 : number;
    }

    const offTeam = req.query.offTeam || null;
    if (offTeam === null || Object.keys(teams).indexOf(offTeam) === -1) {
        next(parameterError());
    }

    const defTeam = req.query.defTeam || null;
    if (defTeam === null || Object.keys(teams).indexOf(defTeam) === -1) {
        next(parameterError());
    }

    const offLineTeam = req.query.offLineTeam || null;
    if (offLineTeam === null || Object.keys(teams).indexOf(offLineTeam) === -1) {
        next(parameterError());
    }

    next();
};

const validateStatIpDefensive = function (req, res, next) {
    const offTeam = req.query.offTeam || null;
    if (offTeam === null || Object.keys(teams).indexOf(offTeam) === -1) {
        next(parameterError());
    }

    const defTeam = req.query.defTeam || null;
    if (defTeam === null || Object.keys(teams).indexOf(defTeam) === -1) {
        next(parameterError());
    }

    next();
};

const validateStatIpOffensive = function (req, res, next) {
    const offTeam = req.query.offTeam || null;
    if (offTeam === null || Object.keys(teams).indexOf(offTeam) === -1) {
        next(parameterError());
    }

    const defTeam = req.query.defTeam || null;
    if (defTeam === null || Object.keys(teams).indexOf(defTeam) === -1) {
        next(parameterError());
    }

    next();
};

module.exports = {
    validateGames: validateGames,
    validateGameField: validateGameField,
    validateStatIpDefensive: validateStatIpDefensive,
    validateStatIpOffensive: validateStatIpOffensive
};
