const Promise = require('promise');

const DepthRepository = require('../repositories/DepthRepository');

const getGames = function (req, res, next) {
    DepthRepository.getGamesForWeek(req.query.week).then(function (result) {
        res.status(200)
            .json({
                status: 'success',
                data: {
                    games: result.map(function(match) {
                        return {
                            offTeam: match.team,
                            defTeam: match.vsteamweek,
                        }
                    }),
                    week: req.query.week
                }
            });
    }).catch(function (error) {
        next(error);
    });
};

const getGame = function (req, res, next) {
    DepthRepository.getFieldTeams(req.query.week, req.query.defTeam, req.query.offTeam, req.query.offLineTeam).then(function (results) {
        res.status(200)
            .json({
                status: 'success',
                data: results
            });
    }).catch(function (error) {
        next(error);
    });
};

const getStatIpDefensive = function (req, res, next) {
    DepthRepository.getStatIpDefensive(req.query.defTeam, req.query.offTeam).then(function (result) {
        res.status(200)
            .json({
                status: 'success',
                data: result
            });
    }).catch(function (error) {
        next(error);
    });
};

const getStatIpOffensive = function (req, res, next) {
    DepthRepository.getStatIpOffensive(req.query.defTeam, req.query.offTeam).then(function (result) {
        res.status(200)
            .json({
                status: 'success',
                data: result
            });
    }).catch(function (error) {
        next(error);
    });
};

module.exports = {
    getGames: getGames,
    getGame: getGame,
    getStatIpDefensive: getStatIpDefensive,
    getStatIpOffensive: getStatIpOffensive
};
