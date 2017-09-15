const Promise = require('promise');
const db = require('../database');
const model = require('../model/DepthChartModel');

const teams = require('../utils/parameters/teams');
const NFLUtils = require('../utils/NFLUtilsDB');

const getFieldTeams = function (week, defTeam, offTeam, offLineTeam) {
    return new Promise(function (resolve, reject) {
        Promise.all([
            db.any(model.buildDefTeamQuery(), {team: defTeam, week: week}),
            db.any(model.buildOffTeamQuery(), {team: offTeam, week: week}),
            db.any(model.buildOffLineTeamQuery(), {team: offLineTeam, week: week}),
        ]).then((data) => {
            resolve({
                def: {
                    abbr: defTeam,
                    players: data[0]
                },
                off: {
                    abbr: offTeam,
                    players: data[1]
                },
                offLine: {
                    abbr: offLineTeam,
                    players: data[2]
                }
            });
        }).catch(function (err) {
            reject(err);
        });

    });
};

const getGamesForWeek = function (week) {
    return new Promise(function (resolve, reject) {
        db.any(model.buildWeekGamesQuery(), {
            week: week
        }).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    });
};

const getStatIpDefensive = function(defTeam, offTeam) {
    return new Promise(function (resolve, reject) {
        const seasons = Array.from(new Array(5).keys()).map((number) => {
            return (NFLUtils.getCurrentNFLYear() - (1 + number)).toString();
        });

        Promise.all([
            db.oneOrNone(model.buildStatIpDefVsOpponentQuery(), {team: defTeam, vsTeam: offTeam, seasons: seasons}),
            db.oneOrNone(model.buildStatIpVsOffCoordinatorQuery(), {team: defTeam, vsoffcoor: teams[offTeam].OC, seasons: seasons})
        ]).then(function (res) {
            resolve({
                vsOpponent: res[0],
                vsCoordinator: res[1]
            })
        }).catch(function (err) {
            reject(err);
        });
    });
};

const getStatIpOffensive = function(defTeam, offTeam) {
    return new Promise(function (resolve, reject) {
        const seasons = Array.from(new Array(5).keys()).map((number) => {
            return (NFLUtils.getCurrentNFLYear() - (1 + number)).toString();
        });

        Promise.all([
            db.oneOrNone(model.buildStatIpOffVsOpponentQuery(), {team: offTeam, vsTeam: defTeam, seasons: seasons}),
            db.oneOrNone(model.buildStatIpVsDefCoordinatorQuery(), {team: offTeam, vsdefcoor: teams[offTeam].DC, seasons: seasons})
        ]).then(function (res) {
            resolve({
                vsOpponent: res[0],
                vsCoordinator: res[1]
            })
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports = {
    getFieldTeams: getFieldTeams,
    getGamesForWeek: getGamesForWeek,

    getStatIpDefensive: getStatIpDefensive,
    getStatIpOffensive: getStatIpOffensive,
};