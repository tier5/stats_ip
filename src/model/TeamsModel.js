const fs = require('fs');
const pgpFormat = require('pg-promise').as.format;
const path = require('path');
const debug = require('debug')('sql');

const Model = require('./Model');

const FULL_TEAM_OFF_SELECT = Model.loadSQLQueryFile('/queries/IP/teams/teamOffSelect.sql');
const FULL_TEAM_PAS_SELECT = Model.loadSQLQueryFile('/queries/IP/teams/teamPasSelect.sql');
const FULL_TEAM_RUS_SELECT = Model.loadSQLQueryFile('/queries/IP/teams/teamRusSelect.sql');
const FULL_TEAM_REC_SELECT = Model.loadSQLQueryFile('/queries/IP/teams/teamRecSelect.sql');
const FULL_TEAM_KIC_SELECT = Model.loadSQLQueryFile('/queries/IP/teams/teamKicSelect.sql');
const FULL_TEAM_DEF_SELECT = Model.loadSQLQueryFile('/queries/IP/teams/teamDefSelect.sql');

const buildTeamQuery = (positionsArg, values, whereObject, orderBy = null, order = 'DESC', hasLimit = true) => {
    const positions = positionsArg || [];

    const where = Model.buildWhere(whereObject);

    let orderPart = '';
    if (orderBy && hasLimit) {
        orderPart = '${orderBy~} ${order^},';
    }

    let limitPart = '';
    if (hasLimit) {
        limitPart = 'LIMIT ${limit} OFFSET ${offset}';
    }

    const masterValues = {
        table: values.table,
        where: where,
        orderBy: orderPart,
        limit: limitPart
    };


    let resultSQL;
    if (positions.includes('OFF')) {
        resultSQL = pgpFormat(FULL_TEAM_OFF_SELECT, masterValues);
    } else if (positions.includes('PAS')) {
        resultSQL = pgpFormat(FULL_TEAM_PAS_SELECT, masterValues);
    } else if (positions.includes('RUS')) {
        resultSQL = pgpFormat(FULL_TEAM_RUS_SELECT, masterValues);
    } else if (positions.includes('REC')) {
        resultSQL = pgpFormat(FULL_TEAM_REC_SELECT, masterValues);
    } else if (positions.includes('KIC')) {
        resultSQL = pgpFormat(FULL_TEAM_KIC_SELECT, masterValues);
    } else { // if (positions.includes('DEF')) { - default option
        resultSQL = pgpFormat(FULL_TEAM_DEF_SELECT, masterValues);
    }

    debug(where);
    debug(pgpFormat(where, values));
    return resultSQL;
};


const getTeamsColumns = (positionsArg) => {
    const positions = positionsArg || [];

    if (positions.includes('OFF')) {
        return getOffColumns();
    } else if (positions.includes('PAS')) {
        return getPasColumns();
    } else if (positions.includes('RUS')) {
        return getRusColumns();
    } else if (positions.includes('REC')) {
        return getRecColumns();
    } else if (positions.includes('KIC')) {
        return getKicColumns();
    } else { // if (positions.includes('DEF')) { - default option
        return getDefColumns();
    }
};
const getOffColumns = () => {
    return [
        {title: 'Rank', field: 'rank'},
        {title: 'Team', field: 'team'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fant PPG', field: 'ffpg'},
        {title: 'Points', field: 'points'},
        {title: 'Points/Gm', field: 'ppg'},
        {title: 'Offensive Plays', field: 'offp'},
        {title: 'Total Yards', field: 'offyrds'},
        {title: 'Pass Yards', field: 'pyrds'},
        {title: 'Rush Yards', field: 'ruyds'},
        {title: 'Total TD\'s', field: 'tds'},
        {title: 'Pass TD\'s', field: 'ptds'},
        {title: 'Rush TD\'s', field: 'rtds'},
        {title: 'Turnovers', field: 'gaways'},
    ];
};
const getPasColumns = () => {
    return [
        {title: 'Rank', field: 'rank'},
        {title: 'Team', field: 'team'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fant PPG', field: 'ffpg'},
        {title: 'Points', field: 'points'},
        {title: 'Points/Gm', field: 'ppg'},
        {title: 'Passing Plays', field: 'pdropbacks'},
        {title: 'Pass Yards', field: 'pyrds'},
        {title: 'Pass Attempts', field: 'patts'},
        {title: 'Completions', field: 'passc'},
        {title: 'Comp %', field: 'compper'},
        {title: 'Passing TD', field: 'ptds'},
        {title: 'INT', field: 'pinc'},
        {title: 'Sacks Allowed', field: 'tsack'},
    ];
};
const getRusColumns = () => {
    return [
        {title: 'Rank', field: 'rank'},
        {title: 'Team', field: 'team'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fant PPG', field: 'ffpg'},
        {title: 'Points', field: 'points'},
        {title: 'Points/Gm', field: 'ppg'},
        {title: 'Rush Attempts', field: 'ratts'},
        {title: 'Rush Yards', field: 'ruyds'},
        {title: 'Yards/Att', field: 'rattsperattm'},
        {title: 'Rush Yds/Gm', field: 'yardspergame'},
        {title: 'Rushing TD\'s', field: 'rtds'},
        {title: 'Rush Att/Game', field: 'rattspergame'},
        {title: 'Rush 2Pt Conversion', field: 'xprushconv'},
        {title: 'Rushing 1st Downs', field: 'firstdbrush'},
    ];
};
const getRecColumns = () => {
    return [
        {title: 'Rank', field: 'rank'},
        {title: 'Team', field: 'team'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fant PPG', field: 'ffpg'},
        {title: 'Points', field: 'points'},
        {title: 'Points/Gm', field: 'ppg'},
        {title: 'Receiving Plays', field: 'passattempts'},
        {title: 'REC. Yards', field: 'passyards'},
        {title: 'Receptions', field: 'passcompletions'},
        {title: 'Yards/Att', field: 'yardsperattm'},
        {title: 'Yards/Comp', field: 'yardspercomp'},
        {title: 'Receiving TD', field: 'passtouchdowns'},
        {title: 'Rush 2Pt Conversion', field: 'extrapointconversions'},
        {title: 'Rushing 1st Downs', field: 'firstdownsbypass'},
    ];
};
const getKicColumns = () => {
    return [
        {title: 'Rank', field: 'rank'},
        {title: 'Team', field: 'team'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fant PPG', field: 'ffpg'},
        {title: 'Points', field: 'points'},
        {title: 'Points/Gm', field: 'ppg'},
        {title: 'FG Attempts', field: 'fgattm'},
        {title: 'FieldGoals Made', field: 'fgmade'},
        {title: 'PAT Attempts', field: 'patt'},
        {title: 'PAT Made', field: 'pattm'},
        {title: 'Field Goals Blocked', field: 'blockedfg'},
        {title: 'PAT Blocked', field: 'blockedxp'},
        {title: 'Punts', field: 'punts'},
        {title: 'Punts Blocked', field: 'blockedpunt'},
    ];
};
const getDefColumns = () => {
    return [
        {title: 'Rank', field: 'rank'},
        {title: 'Team', field: 'team'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fant PPG', field: 'dffpg'},
        {title: 'Points', field: 'points'},
        {title: 'Points/Gm', field: 'dppg'},
        {title: 'Defensive Plays', field: 'dplays'},
        {title: 'Total Yards Allowed', field: 'yardsallowed'},
        {title: 'Pass Yards Allowed', field: 'pyardsallowed'},
        {title: 'Rush Yards Allowed', field: 'ryardsallowed'},
        {title: 'Defensive TD\'s', field: 'deftds'},
        {title: 'Interceptions', field: 'intercepts'},
        {title: 'Sacks', field: 'sacks'},
        {title: 'Safeties', field: 'safeties'},
    ];
};



module.exports = {
    buildTeamQuery: buildTeamQuery,

    getTeamsColumns: getTeamsColumns
};