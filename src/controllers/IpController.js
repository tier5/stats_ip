const IPRepository = require('../repositories/IPRepository');

const getPlayers = function (req, res, next) {

    let promise;
    if(req.query.search) {
        promise = IPRepository.getSpecificPlayerRecordsWithNumberOfRecords(req);
    } else {
        promise = IPRepository.getPlayersWithNumberOfRecords(req);
    }

    promise.then(
        function (players) {
            res.status(200)
                .json({
                    status: 'success',
                    data: players
                });
        }, function (error) {
            next(error);
        }
    );
};

const getPlayersAutoComplete = function (req, res, next) {

    IPRepository.getPlayerNamesAutoComplete(req).then(
        function (players) {
            res.status(200)
                .json({
                    status: 'success',
                    data: players
                });
        }, function (error) {
            next(error);
        }
    );
};

const getTeams = function (req, res, next) {

    IPRepository.getTeamsWithNumberOfRecords(req).then(
        function (teams) {
            res.status(200)
                .json({
                    status: 'success',
                    data: teams
                });
        }, function (error) {
            next(error);
        }
    )

};

module.exports = {
    getPlayers: getPlayers,
    getPlayersAutoComplete: getPlayersAutoComplete,

    getTeams: getTeams
};
