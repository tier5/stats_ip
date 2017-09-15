const pgpFormat = require('pg-promise').as.format;
const debug = require('debug')('sql');

const Model = require('./Model');

const FULL_PLAYER_SELECT = Model.loadSQLQueryFile('/queries/IP/players/playerSelect.sql');
const FULL_PLAYER_RZ_SELECT = Model.loadSQLQueryFile('/queries/IP/players/playerRZSelect.sql');

const FULL_SPECIFIC_PLAYER_SELECT = Model.loadSQLQueryFile('/queries/IP/players/specificPlayerSelect.sql');
const FULL_SPECIFIC_PLAYER_PAST_SELECT = Model.loadSQLQueryFile('/queries/IP/players/specificPlayerPastSelect.sql');
const FULL_SPECIFIC_PLAYER_WEATHER_SELECT = Model.loadSQLQueryFile('/queries/IP/players/specificPlayerWeatherSelect.sql');

const buildPlayerQuery = (values, whereObject, orderBy = null, order = 'DESC', hasLimit = true) => {

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
    if (masterValues.table.includes('rz')) {
        resultSQL = pgpFormat(FULL_PLAYER_RZ_SELECT, masterValues);
    } else {
        resultSQL = pgpFormat(FULL_PLAYER_SELECT, masterValues);
    }
    debug(where);
    debug(pgpFormat(where, values));
    return resultSQL;
};

const buildPlayerSpecificRecordsQuery = function (season, weather, values, whereObject, orderBy = null, order = 'DESC', hasLimit = true) {

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
    if (weather && (weather.TEMPERATURES.length > 0 || weather.CONDITIONS.length > 0)) {
        resultSQL = pgpFormat(FULL_SPECIFIC_PLAYER_WEATHER_SELECT, masterValues);
    } else if (!season.includes('SEASONS')) {
        resultSQL = pgpFormat(FULL_SPECIFIC_PLAYER_SELECT, masterValues);
    } else {
        resultSQL = pgpFormat(FULL_SPECIFIC_PLAYER_PAST_SELECT, masterValues);
    }

    debug(where);
    debug(pgpFormat(where, values));
    return resultSQL;
};

const buildSearchQuery = function () {
    return 'SELECT player, playerid, currentteam FROM ${table^} WHERE LOWER(player) LIKE LOWER(${search})';
};

const getPlayersColumns = (search, team, positionsArg, seasonArg, splitsArg, weatherArg, fieldsArg, versus, versusVal) => {
    const positions = positionsArg || [];
    const season = seasonArg || 'THIS_SEASON';
    const splits = splitsArg || {WEEKS: [], QUARTERS: []};
    const weather = weatherArg || {TEMPERATURES: [], CONDITIONS: []};
    const fields = fieldsArg || [];

    if (season === 'THIS_SEASON'
        && splits.WEEKS.length === 0
        && splits.QUARTERS.length === 0 && weather.TEMPERATURES.length === 0
        && weather.CONDITIONS.length === 0 && fields.length === 0) {

        // 1 - 6
        return getOneToSixColumns(positions);
    } else if (!fields.includes('REDZONE')) {
        if (!season.includes('SEASONS')) {
            // 7 - 12
            return getSevenToTwelveColumns(positions);
        } else {
            // 13 - 18
            return getThirteenToEighteenColumns(positions);
        }
    } else {
        if (!season.includes('SEASONS')) {
            // 19 - 24
            return getNineteenToTwentyFourColumns(positions);
        } else {
            // 25 - 30
            return getTwentyFiveToThirtyColumns(positions);
        }
    }
};
const getOneToSixColumns = (positions) => {
    let columns = [
        {title: 'Rank', field: 'rownum'},
        {title: 'Player', field: 'player'},
        {title: 'Position', field: 'positions'},
        {title: 'Team', field: 'teams'},
        {title: 'Age', field: 'age'},
        {title: 'Bye Week', field: 'bye'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fantasy PPG', field: 'fantasyppg'},
        {title: 'Fantasy PTS', field: 'ffp'},
        {title: 'Ceiling', field: 'pceiling'},
        {title: 'Floor', field: 'pfloor'}
    ];

    if (positions.length === 1 && positions.includes('QB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Pass_Attempts', field: 'passingattempts'},
            {title: 'Completions', field: 'passingcompletions'},
            {title: 'Comp %', field: 'passcomppercent'},
            {title: 'INT', field: 'totalinterceptions'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Pass Yards/Gm', field: 'pydpergame'},
            {title: 'Pass Yards/Comp.', field: 'passyardcomp'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'FUM', field: 'fumbles'},
        ]);
    } else if (positions.length === 1 && positions.includes('RB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Actions', field: 'actions'},
            {title: 'Rush YDS/GM', field: 'ruydpergame'},
            {title: 'Yards/Carry', field: 'ruydpercarry'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('WR')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('TE')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Actions', field: 'actions'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('K')) {
        columns = columns.concat([
            {title: 'FGA', field: 'fieldgoalattempted'},
            {title: 'FGM', field: 'fieldgoalmade'},
            {title: 'FG %', field: 'fieldgoalpercent'},
            {title: '20+', field: 'fgtwentyplus'},
            {title: '30+', field: 'fgthirtyplus'},
            {title: '40+', field: 'fgfortyplus'},
            {title: '50+', field: 'fgfiftyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'PAT Attempt', field: 'pointafterattempted'},
            {title: 'PAT Made', field: 'pointaftermade'},
            {title: 'PAT %', field: 'pointafterpercent'},
            {title: 'PAT Block', field: 'patblocked'},
        ]);
    } else if (positions.length === 2 && positions.includes('WR') && positions.includes('TE')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Actions', field: 'actions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Scrim. YPG', field: 'passyardsscrimmageypg'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Actions', field: 'actions'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    }
    return columns;
};
const getSevenToTwelveColumns = (positions) => {
    let columns = [
        {title: 'Rank', field: 'rownum'},
        {title: 'Player', field: 'player'},
        {title: 'Position', field: 'positions'},
        {title: 'Team', field: 'teams'},
        {title: 'Age', field: 'age'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fantasy PPG', field: 'fantasyppg'},
        {title: 'Fantasy PTS', field: 'ffp'},
        {title: 'Ceiling', field: 'pceiling'},
        {title: 'Floor', field: 'pfloor'}
    ];

    if (positions.length === 1 && positions.includes('QB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Pass_Attempts', field: 'passingattempts'},
            {title: 'Completions', field: 'passingcompletions'},
            {title: 'Comp %', field: 'passcomppercent'},
            {title: 'INT', field: 'totalinterceptions'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Pass Yards/Gm', field: 'pydpergame'},
            {title: 'Pass Yards/Comp.', field: 'passyardcomp'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
        ]);
    } else if (positions.length === 1 && positions.includes('RB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'REC. Yards', field: 'reyd'},

            {title: 'Carries', field: 'carries'},
            {title: 'Targets', field: 'targets'},
            {title: 'Rush YDS/GM', field: 'ruydpergame'},
            {title: 'Yards/Carry', field: 'ruydpercarry'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('WR')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('TE')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('K')) {
        columns = columns.concat([
            {title: 'FGA', field: 'fieldgoalattempted'},
            {title: 'FGM', field: 'fieldgoalmade'},
            {title: 'FG %', field: 'fieldgoalpercent'},
            {title: 'PAT Attempt', field: 'pointafterattempted'},
            {title: 'PAT Made', field: 'pointaftermade'},
            {title: 'PAT %', field: 'pointafterpercent'},
            {title: '20+', field: 'fgtwentyplus'},
            {title: '30+', field: 'fgthirtyplus'},
            {title: '40+', field: 'fgfortyplus'},
            {title: '50+', field: 'fgfiftyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FG Block', field: 'fgblocked'},
            {title: 'PAT Block', field: 'patblocked'},
        ]);
    } else if (positions.length === 2 && positions.includes('WR') && positions.includes('TE')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Scrim. YPG', field: 'passyardsscrimmageypg'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Actions', field: 'actions'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    }
    return columns;
};
const getThirteenToEighteenColumns = (positions) => {
    let columns = [
        {title: 'Rank', field: 'rownum'},
        {title: 'Player', field: 'player'},
        {title: 'Position', field: 'positions'},
        {title: 'Team(s)', field: 'teams'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fantasy PPG', field: 'fantasyppg'},
        {title: 'Fantasy PTS', field: 'ffp'},
        {title: 'Ceiling', field: 'pceiling'},
        {title: 'Floor', field: 'pfloor'}
    ];

    if (positions.length === 1 && positions.includes('QB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Pass_Attempts', field: 'passingattempts'},
            {title: 'Completions', field: 'passingcompletions'},
            {title: 'Comp %', field: 'passcomppercent'},
            {title: 'INT', field: 'totalinterceptions'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Pass Yards/Gm', field: 'pydpergame'},
            {title: 'Pass Yards/Comp.', field: 'passyardcomp'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('RB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Carries', field: 'carries'},
            {title: 'Targets', field: 'targets'},
            {title: 'Rush YDS/GM', field: 'ruydpergame'},
            {title: 'Yards/Carry', field: 'ruydpercarry'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('WR')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('TE')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('K')) {
        columns = columns.concat([
            {title: 'FGA', field: 'fieldgoalattempted'},
            {title: 'FGM', field: 'fieldgoalmade'},
            {title: 'FG %', field: 'fieldgoalpercent'},
            {title: 'PAT Attempt', field: 'pointafterattempted'},
            {title: 'PAT Made', field: 'pointaftermade'},
            {title: 'PAT %', field: 'pointafterpercent'},
            {title: '20+', field: 'fgtwentyplus'},
            {title: '30+', field: 'fgthirtyplus'},
            {title: '40+', field: 'fgfortyplus'},
            {title: '50+', field: 'fgfiftyplus'},
            {title: '60+', field: 'fgsixtyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FG Block', field: 'fgblocked'},
            {title: 'PAT Block', field: 'patblocked'},
        ]);
    } else {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Scrim. YPG', field: 'passyardsscrimmageypg'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Actions', field: 'actions'},
            {title: '20+', field: 'twentyplus'},
            {title: '40+', field: 'fortyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    }
    return columns;
};
const getNineteenToTwentyFourColumns = (positions) => {
    let columns = [
        {title: 'Rank', field: 'rownum'},
        {title: 'Player', field: 'player'},
        {title: 'Position', field: 'positions'},
        {title: 'Team', field: 'teams'},
        {title: 'Age', field: 'age'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fantasy PPG', field: 'fantasyppg'},
        {title: 'Fantasy PTS', field: 'ffp'},
        {title: 'Ceiling', field: 'pceiling'},
        {title: 'Floor', field: 'pfloor'}
    ];

    if (positions.length === 1 && positions.includes('QB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Pass_Attempts', field: 'passingattempts'},
            {title: 'Completions', field: 'passingcompletions'},
            {title: 'Comp %', field: 'passcomppercent'},
            {title: 'INT', field: 'totalinterceptions'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Carries', field: 'carries'},
            {title: 'CarriesInside5', field: 'carries5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('RB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Carries', field: 'carries'},
            {title: 'Targets', field: 'targets'},
            {title: 'Rush YDS/GM', field: 'ruydpergame'},
            {title: 'Yards/Carry', field: 'ruydpercarry'},
            {title: 'CarriesInside5', field: 'carries5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('WR')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: 'TargetInside5', field: 'rtars5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('TE')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: 'TargetInside5', field: 'rtars5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('K')) {
        columns = columns.concat([
            {title: 'FGA', field: 'fieldgoalattempted'},
            {title: 'FGM', field: 'fieldgoalmade'},
            {title: 'FG %', field: 'fieldgoalpercent'},
            {title: 'PAT Attempt', field: 'pointafterattempted'},
            {title: 'PAT Made', field: 'pointaftermade'},
            {title: 'PAT %', field: 'pointafterpercent'},
            {title: '20+', field: 'fgtwentyplus'},
            {title: '30+', field: 'fgthirtyplus'},
            {title: '40+', field: 'fgfortyplus'},
            {title: '50+', field: 'fgfiftyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FG Block', field: 'fgblocked'},
            {title: 'PAT Block', field: 'patblocked'},
        ]);
    } else if (positions.length === 2 && positions.includes('WR') && positions.includes('TE')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: 'TargetInside5', field: 'rtars5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Scrim. YPG', field: 'passyardsscrimmageypg'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Actions', field: 'actions'},
            {title: 'ActionsInside5', field: 'actions5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    }
    return columns;
};
const getTwentyFiveToThirtyColumns = (positions) => {
    let columns = [
        {title: 'Rank', field: 'rownum'},
        {title: 'Player', field: 'player'},
        {title: 'Position', field: 'positions'},
        {title: 'Team(s)', field: 'teams'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fantasy PPG', field: 'fantasyppg'},
        {title: 'Fantasy PTS', field: 'ffp'},
        {title: 'Ceiling', field: 'pceiling'},
        {title: 'Floor', field: 'pfloor'}
    ];

    if (positions.length === 1 && positions.includes('QB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Pass_Attempts', field: 'passingattempts'},
            {title: 'Completions', field: 'passingcompletions'},
            {title: 'Comp %', field: 'passcomppercent'},
            {title: 'INT', field: 'totalinterceptions'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Carries', field: 'carries'},
            {title: 'Sacks', field: 'sacks'},
            {title: 'CarriesInside5', field: 'carries5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('RB')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Carries', field: 'carries'},
            {title: 'Targets', field: 'targets'},
            {title: 'Rush YDS/GM', field: 'ruydpergame'},
            {title: 'Yards/Carry', field: 'ruydpercarry'},
            {title: 'TargetInside5', field: 'rtars5y'},
            {title: 'CarriesInside5', field: 'carries5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('WR')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: 'TargetInside5', field: 'rtars5y'},
            {title: 'CarriesInside5', field: 'carries5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('TE')) {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Targets', field: 'targets'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Rec.Yards/Gm', field: 'reydpergame'},
            {title: 'Rec.Yards/Com.', field: 'reydpercompletion'},
            {title: 'Rec. Yards/Att.', field: 'reydperattempt'},
            {title: 'TargetInside5', field: 'rtars5y'},
            {title: 'CarriesInside5', field: 'carries5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    } else if (positions.length === 1 && positions.includes('K')) {
        columns = columns.concat([
            {title: 'FGA', field: 'fieldgoalattempted'},
            {title: 'FGM', field: 'fieldgoalmade'},
            {title: 'FG %', field: 'fieldgoalpercent'},
            {title: 'PAT Attempt', field: 'pointafterattempted'},
            {title: 'PAT Made', field: 'pointaftermade'},
            {title: 'PAT %', field: 'pointafterpercent'},
            {title: '20+', field: 'fgtwentyplus'},
            {title: '30+', field: 'fgthirtyplus'},
            {title: '40+', field: 'fgfortyplus'},
            {title: '50+', field: 'fgfiftyplus'},
            {title: '60+', field: 'fgsixtyplus'},
            {title: 'Long', field: 'longyard'},
            {title: 'FG Block', field: 'fgblocked'},
            {title: 'PAT Block', field: 'patblocked'},
        ]);
    } else {
        columns = columns.concat([
            {title: 'TD\'s', field: 'tds'},
            {title: 'Scrim. Yards', field: 'scrimmageyards'},
            {title: 'Scrim. YPG', field: 'passyardsscrimmageypg'},
            {title: 'Pass Yards', field: 'pyd'},
            {title: 'Rush Yards', field: 'ruyd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receptions'},
            {title: 'Actions', field: 'actions'},
            {title: 'Carries', field: 'carries'},
            {title: 'ActionsInside5', field: 'actions5y'},
            {title: 'TD\'under10', field: 'touchdowns10y'},
            {title: 'TD\'under3', field: 'touchdowns3y'},
            {title: 'FUM', field: 'fumbles'},
            {title: 'FUML', field: 'fumbleslost'},
        ]);
    }
    return columns;
};

const getSpecificPlayerRecordColumns = (position, seasonArg, weatherArg) => {
    const season = seasonArg || 'THIS_SEASON';
    const weather = weatherArg || {TEMPERATURES: [], CONDITIONS: []};

    if (!season.includes('SEASONS')
        && weather.TEMPERATURES.length === 0
        && weather.CONDITIONS.length === 0) {
        // 1 - 5
        return getOneToFiveSpecificColumns(position);
    } else if (season.includes('SEASONS')
        && weather.TEMPERATURES.length === 0
        && weather.CONDITIONS.length === 0) {
        // 5 - 10
        return getFiveToTenSpecificColumns(position);
    } else {
        // 16 - 20
        return getSixTeenToTwentySpecificColumns(position);
    }
};
const getOneToFiveSpecificColumns = function (position) {
    let columns = [
        {title: 'Week', field: 'week'},
        {title: 'Date', field: 'gamedate'},
        {title: 'Age', field: 'age'},
        {title: 'Kick Off Time', field: 'kickofftime'},
        {title: 'Opponent', field: 'oppo'},
        {title: 'Result', field: 'result'},
        {title: 'Fantasy PTS', field: 'ffp'},
        {title: 'Position Rank', field: 'prank'},
    ];

    if (position === 'QB') {
        columns = columns.concat([
            {title: 'Pass TD\'s', field: 'passtd'},
            {title: 'Total TD\'s', field: 'tottd'},
            {title: 'Pass Yards', field: 'passyd'},
            {title: 'Pass Attempts', field: 'passattm'},
            {title: 'Completions', field: 'passc'},
            {title: 'Comp %', field: 'compper'},
            {title: 'INT', field: 'intercepts'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: 'Pass Yards/Comp.', field: 'yardspercomp'},
            {title: 'Pass Yards/Att.', field: 'yardsperattm'},
            {title: 'Sacks', field: 'sacks'},
            {title: '40+', field: 'fortyp'},
            {title: 'Long', field: 'longy'},
            {title: 'FUM', field: 'fum'},
            {title: 'FumL', field: 'fuml'},
        ]);
    } else if (position === 'RB') {
        columns = columns.concat([
            {title: 'Rush TD\'s', field: 'rushtd'},
            {title: 'Total TD\'s', field: 'tottd'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receps'},
            {title: 'Targets', field: 'rtar'},
            {title: 'Carries', field: 'carries'},
            {title: 'Yards/Carry', field: 'yardspercarry'},
            {title: 'Rec.Yards/Com.', field: 'yardsperreception'},
            {title: 'Pass Yards/Att.', field: 'passyardsperattm'},
            {title: '20+', field: 'twentyp'},
            {title: '40+', field: 'fortyp'},
            {title: 'Long', field: 'longy'},
            {title: 'FUM', field: 'fum'},
            {title: 'FumL', field: 'fuml'},
        ]);
    } else if (position === 'WR') {
        columns = columns.concat([
            {title: 'Receiving TD\'s', field: 'rectd'},
            {title: 'Total TD\'s', field: 'tottd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receps'},
            {title: 'Targets', field: 'rtar'},
            {title: 'All Purpose Yards', field: 'apy'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: 'Rec.Yards/Com.', field: 'yardsperreception'},
            {title: 'Rec. Yards/Att.', field: 'reydperattm'},
            {title: 'Yards/Carry', field: 'yardspercarry'},
            {title: '20+', field: 'twentyp'},
            {title: '40+', field: 'fortyp'},
            {title: 'Long', field: 'longy'},
            {title: 'FUM', field: 'fum'},
            {title: 'FumL', field: 'fuml'},
        ]);
    } else if (position === 'TE') {
        columns = columns.concat([
            {title: 'Receiving TD\'s', field: 'rectd'},
            {title: 'Total TD\'s', field: 'tottd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receps'},
            {title: 'Targets', field: 'rtar'},
            {title: 'All Purpose Yards', field: 'apy'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: 'Rec.Yards/Com.', field: 'yardsperreception'},
            {title: 'Rec. Yards/Att.', field: 'reydperattm'},
            {title: 'Yards/Carry', field: 'yardspercarry'},
            {title: '20+', field: 'twentyp'},
            {title: '40+', field: 'fortyp'},
            {title: 'Long', field: 'longy'},
            {title: 'FUM', field: 'fum'},
            {title: 'FumL', field: 'fuml'},
        ]);
    } else if (position === 'K') {
        columns = columns.concat([
            {title: 'FGA', field: 'fgatt'},
            {title: 'FGM', field: 'fgm'},
            {title: 'FG %s', field: 'fgper'},
            {title: 'PAT Attempt', field: 'pattm'},
            {title: 'PAT Made', field: 'pamade'},
            {title: 'PAT %', field: 'patper'},
            {title: '10+', field: 'f10p'},
            {title: '20+', field: 'f20p'},
            {title: '30+', field: 'f30p'},
            {title: '40+', field: 'f40p'},
            {title: '50+', field: 'f50p'},
            {title: '60+', field: 'f60p'},
            {title: 'Long', field: 'longfg'},
            {title: 'FG Block', field: 'fgblocked'},
            {title: 'PAT Block', field: 'pablocked'},
        ]);
    }
    return columns;
};
const getFiveToTenSpecificColumns = function (position) {
    let columns = [
        {title: 'Season', field: 'nflseason'},
        {title: 'Age', field: 'age'},
        {title: 'Team(s)', field: 'teams'},
        {title: 'Games', field: 'gamesplayed'},
        {title: 'Fantasy PTS', field: 'totffp'},
        {title: 'Position Rank', field: 'prank'},
        {title: 'Fantasy PPG', field: 'fppg'},
        {title: 'Ceiling', field: 'ceiling'},
        {title: 'Floor', field: 'pfloor'},
    ];

    if (position === 'QB') {
        columns = columns.concat([
            {title: 'Pass TD\'s', field: 'passtds'},
            {title: 'Total TD\'s', field: 'tottds'},
            {title: 'Pass Yards', field: 'passyds'},
            {title: 'Pass_Attempts', field: 'passattms'},
            {title: 'Completions', field: 'passcomps'},
            {title: 'Comp %', field: 'compper'},
            {title: 'INT', field: 'intercepts'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: 'Pass Yards/Gm', field: 'passydspergame'},
            {title: 'Pass Yards/Comp.', field: 'passydspercomp'},
            {title: '20+', field: 'twentyps'},
            {title: '40+', field: 'fortyps'},
            {title: 'Long', field: 'longest'},
            {title: 'FUM', field: 'fum'},
        ]);
    } else if (position === 'RB') {
        columns = columns.concat([
            {title: 'Rush TD\'s', field: 'rushtds'},
            {title: 'Total TD\'s', field: 'tottds'},
            {title: 'Rush Yards', field: 'totrushy'},
            {title: 'REC. Yards', field: 'totreyd'},
            {title: 'Receptions', field: 'totreceps'},
            {title: 'Targets', field: 'targets'},
            {title: 'Carries', field: 'totcarries'},
            {title: 'Yards/Carry', field: 'yardspercarry'},
            {title: 'Rec.Yards/Com.', field: 'yardsperrecep'},
            {title: 'Pass Yards/Att.', field: 'passydsperattm'},
            {title: '20+', field: 'twentyps'},
            {title: '40+', field: 'fortyps'},
            {title: 'Long', field: 'longest'},
            {title: 'FUM', field: 'fum'},
        ]);
    } else if (position === 'WR') {
        columns = columns.concat([
            {title: 'Receiving TD\'s', field: 'totrectd'},
            {title: 'Total TD\'s', field: 'tottds'},
            {title: 'REC. Yards', field: 'totreyd'},
            {title: 'Receptions', field: 'totreceps'},
            {title: 'Targets', field: 'targets'},
            {title: 'All Purpose Yards', field: 'totapy'},
            {title: 'Rush Yards', field: 'totrushy'},
            {title: 'Rec.Yards/Com.', field: 'yardspercomp'},
            {title: 'Rec. Yards/Att.', field: 'yardspertar'},
            {title: 'Yards/Carry', field: 'yardspercarry'},
            {title: '20+', field: 'twentyps'},
            {title: '40+', field: 'fortyps'},
            {title: 'Long', field: 'longest'},
            {title: 'FUM', field: 'fum'},
        ]);
    } else if (position === 'TE') {
        columns = columns.concat([
            {title: 'Receiving TD\'s', field: 'totrectd'},
            {title: 'Total TD\'s', field: 'tottds'},
            {title: 'REC. Yards', field: 'totreyd'},
            {title: 'Receptions', field: 'totreceps'},
            {title: 'Targets', field: 'targets'},
            {title: 'All Purpose Yards', field: 'totapy'},
            {title: 'Rush Yards', field: 'totrushy'},
            {title: 'Rec.Yards/Com.', field: 'yardspercomp'},
            {title: 'Rec. Yards/Att.', field: 'yardspertar'},
            {title: 'Yards/Carry', field: 'yardspercarry'},
            {title: '20+', field: 'twentyps'},
            {title: '40+', field: 'fortyps'},
            {title: 'Long', field: 'longest'},
            {title: 'FUM', field: 'fum'},
        ]);
    } else if (position === 'K') {
        columns = columns.concat([
            {title: 'FGA', field: 'fgatt'},
            {title: 'FGM', field: 'fgm'},
            {title: 'FG %', field: 'fgper'},
            {title: 'PAT Attempt', field: 'pattm'},
            {title: 'PAT Made', field: 'pamade'},
            {title: 'PAT %', field: 'patper'},
            {title: '20+', field: 'f20p'},
            {title: '30+', field: 'f30p'},
            {title: '40+', field: 'f40p'},
            {title: '50+', field: 'f50p'},
            {title: '60+', field: 'f60p'},
            {title: 'Long', field: 'longfg'},
            {title: 'FG Block', field: 'fgblocked'},
            {title: 'PAT Block', field: 'pablocked'},
        ]);
    }
    return columns;
};
const getSixTeenToTwentySpecificColumns = function (position) {
    let columns = [
        {title: 'Date', field: 'gamedate'},
        {title: 'Week', field: 'week'},
        {title: 'Time of KO', field: 'kickofftime'},
        {title: 'Team', field: 'team'},
        {title: 'Opponent', field: 'oppo'},
        {title: 'Result', field: 'result'},
        {title: 'Stadium', field: 'stadium'},
        {title: 'Temperature', field: 'temperature'},
        {title: 'Wind Speed', field: 'windspeed'},
        {title: 'Conditions', field: 'wcond'},
        {title: 'Fantasy PTS', field: 'ffp'},
    ];

    if (position === 'QB') {
        columns = columns.concat([
            {title: 'Pass TD\'s', field: 'passtd'},
            {title: 'Total TD\'s', field: 'tottd'},
            {title: 'Pass Yards', field: 'passyd'},
            {title: 'Pass_Attempts', field: 'passattm'},
            {title: 'Completions', field: 'passc'},
            {title: 'Comp %', field: 'compper'},
            {title: 'INT', field: 'intercepts'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: '20+', field: 'twentyp'},
            {title: '40+', field: 'fortyp'},
            {title: 'Sacks', field: 'sacks'},
            {title: 'FUM', field: 'fum'},
        ]);
    } else if (position === 'RB') {
        columns = columns.concat([
            {title: 'Rush TD\'s', field: 'rushtd'},
            {title: 'Total TD\'s', field: 'tottd'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receps'},
            {title: 'Actions', field: 'actions'},
            {title: 'Yards/Carry', field: 'yardspercarry'},
            {title: 'Rec.Yards/Com.', field: 'yardspercomp'},
            {title: '20+', field: 'twentyp'},
            {title: '40+', field: 'fortyp'},
            {title: 'Long', field: 'longy'},
            {title: 'FUM', field: 'fum'},
        ]);
    } else if (position === 'WR') {
        columns = columns.concat([
            {title: 'Receiving TD\'s', field: 'rectd'},
            {title: 'Total TD\'s', field: 'tottd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receps'},
            {title: 'Targets', field: 'rtar'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: 'Rec.Yards/Com.', field: 'yardsperreception'},
            {title: 'Rec. Yards/Att.', field: 'reydperattm'},
            {title: '20+', field: 'twentyp'},
            {title: '40+', field: 'fortyp'},
            {title: 'Long', field: 'longy'},
            {title: 'FUM', field: 'fum'},
        ]);
    } else if (position === 'TE') {
        columns = columns.concat([
            {title: 'Receiving TD\'s', field: 'rectd'},
            {title: 'Total TD\'s', field: 'tottd'},
            {title: 'REC. Yards', field: 'reyd'},
            {title: 'Receptions', field: 'receps'},
            {title: 'Targets', field: 'rtar'},
            {title: 'Rush Yards', field: 'rushy'},
            {title: 'Rec.Yards/Com.', field: 'yardsperreception'},
            {title: 'Rec. Yards/Att.', field: 'reydperattm'},
            {title: '20+', field: 'twentyp'},
            {title: '40+', field: 'fortyp'},
            {title: 'Long', field: 'longy'},
            {title: 'FUM', field: 'fum'},
        ]);
    } else if (position === 'K') {
        columns = columns.concat([
            {title: 'FGA', field: 'fgatt'},
            {title: 'FGM', field: 'fgm'},
            {title: 'FG %', field: 'fgper'},
            {title: 'PAT Attempt', field: 'pattm'},
            {title: 'PAT Made', field: 'pamade'},
            {title: '20+', field: 'f20p'},
            {title: '30+', field: 'f30p'},
            {title: '40+', field: 'f40p'},
            {title: '50+', field: 'f50p'},
            {title: 'Long', field: 'longfg'},
            {title: 'FG Block', field: 'fgblocked'},
            {title: 'PAT Block', field: 'pablocked'},
        ]);
    }
    return columns;
};


const getSearchColumns = () => {
    return [
        {title: 'Player ID', field: 'playerid'},
        {title: 'Player', field: 'player'},
        {title: 'Team', field: 'currentteam'},
    ];
};


module.exports = {
    getPlayersColumns: getPlayersColumns,
    getSpecificPlayerRecordColumns: getSpecificPlayerRecordColumns,
    getSearchColumns: getSearchColumns,

    buildPlayerQuery: buildPlayerQuery,
    buildSearchQuery: buildSearchQuery,
    buildPlayerSpecificRecordsQuery: buildPlayerSpecificRecordsQuery,
};