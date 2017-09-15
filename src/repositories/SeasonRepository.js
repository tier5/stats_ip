const db = require('../database');

module.exports = {
    getCurrentNFLWeekAndSeason: function () {
        return db.one('SELECT seasoninteger AS season, weeknumberinteger AS week FROM season WHERE thisweek LIMIT 1');
    }
};
