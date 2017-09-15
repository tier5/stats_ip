const Promise = require('promise');
const repository = require('../repositories/SeasonRepository');

const NFL_DATA = {
    week: 1,
    season: 2017
};

const _loadData = function () {
    repository.getCurrentNFLWeekAndSeason().then(function (result) {
        NFL_DATA.week = result.week;
        NFL_DATA.season = result.season;
    }).catch(function () {
        console.error('Couldn\'t receive current week and season from DB!');
    });
};
_loadData();

// reload from DB every 5 minutes
setInterval(_loadData, 1000 * 60 * 5);

module.exports = {
    getCurrentNFLWeek: function () {
        return NFL_DATA.week;
    },
    getCurrentNFLYear: function () {
        return NFL_DATA.season;
    }
};
