const pgpFormat = require('pg-promise').as.format;
const debug = require('debug')('sql');

const Model = require('./Model');

const GAME_STADIUM_SELECT = Model.loadSQLQueryFile('/queries/Weather/gameStadiumSelect.sql');
const GAME_GRAPH_DATA_SELECT = Model.loadSQLQueryFile('/queries/Weather/gameGraphSelect.sql');

module.exports = {
    buildGameStadiumQuery: function () {
        return GAME_STADIUM_SELECT;
    },
    buildGameGraphDataQuery: function () {
        return GAME_GRAPH_DATA_SELECT;
    }
};
