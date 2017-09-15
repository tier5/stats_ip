const Promise = require('promise');

const DepthRepository = require('../repositories/DepthRepository');
const WeatherRepository = require('../repositories/WeatherRepository');

const getGames = function (req, res, next) {
    DepthRepository.getGamesForWeek(req.query.week).then(function (result) {
        res.status(200)
            .json({
                status: 'success',
                data: {
                    games: result.map(function(match) {
                        return {
                            homeTeam: match.team,
                            awayTeam: match.vsteamweek,
                            weatherKey: match.weatherkey
                        };
                    }),
                    week: req.query.week
                }
            });
    }).catch(function (error) {
        next(error);
    });
};

const getGameStadium = function (req, res, next) {
    WeatherRepository.getGameStadium(req.query.weatherKey).then(function(result) {
        res.status(200)
            .json({
                status: 'success',
                data: {
                    stadium: result
                }
            });
    }).catch(function (error) {
        next(error);
    });
};

const getGameGraphData = function (req, res, next) {
    WeatherRepository.getGameGraphData(req.query.weatherKey).then(function(result) {
        res.status(200)
            .json({
                status: 'success',
                data: {
                    records: result
                }
            });
    }).catch(function (error) {
        next(error);
    });
};


module.exports = {
    getGames: getGames,
    getGameStadium: getGameStadium,
    getGameGraphData: getGameGraphData
};
