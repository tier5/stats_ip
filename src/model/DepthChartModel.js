const pgpFormat = require('pg-promise').as.format;
const debug = require('debug')('sql');

const Model = require('./Model');

const WEEK_GAMESS_SELECT = Model.loadSQLQueryFile('/queries/Depth/weekGamesSelect.sql');

const OFF_TEAM_SELECT = Model.loadSQLQueryFile('/queries/Depth/offTeamSelect.sql');
const DEF_TEAM_SELECT = Model.loadSQLQueryFile('/queries/Depth/defTeamSelect.sql');
const OFF_LINE_TEAM_SELECT = Model.loadSQLQueryFile('/queries/Depth/offLineTeamSelect.sql');

const STAT_DEF_VS_OPPONENT_SELECT = Model.loadSQLQueryFile('/queries/Depth/statDefVsOpponentSelect.sql');
const STAT_OFF_VS_OPPONENT_SELECT = Model.loadSQLQueryFile('/queries/Depth/statOffVsOpponentSelect.sql');
const STAT_VS_DEF_COORDINATOR_SELECT = Model.loadSQLQueryFile('/queries/Depth/statVsDefCoordinatorSelect.sql');
const STAT_VS_OFF_COORDINATOR_SELECT = Model.loadSQLQueryFile('/queries/Depth/statVsOffCoordinatorSelect.sql');

module.exports = {
    buildWeekGamesQuery: function () {
        return WEEK_GAMESS_SELECT;
    },
    buildOffTeamQuery: function () {
        return OFF_TEAM_SELECT;
    },
    buildDefTeamQuery: function () {
        return DEF_TEAM_SELECT;
    },
    buildOffLineTeamQuery: function () {
        return OFF_LINE_TEAM_SELECT;
    },
    buildStatIpDefVsOpponentQuery: function () {
        return STAT_DEF_VS_OPPONENT_SELECT;
    },
    buildStatIpOffVsOpponentQuery: function () {
        return STAT_OFF_VS_OPPONENT_SELECT;
    },
    buildStatIpVsDefCoordinatorQuery: function () {
        return STAT_VS_DEF_COORDINATOR_SELECT;
    },
    buildStatIpVsOffCoordinatorQuery: function () {
        return STAT_VS_OFF_COORDINATOR_SELECT;
    }
};