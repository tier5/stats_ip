const db = require('../database');

const Promise = require('promise');

const NFL = require('../utils/NFLUtilsDB');

const PlayersModel = require('../model/PlayersModel');
const TeamsModel = require('../model/TeamsModel');
const Model = require('../model/Model');

const defaultValues = {
    'table': 'nflpall',
    'limit': 50,
    'offset': 0
};

const applyPlayerNameFilter = function(playerName, values, where) {
    if (playerName) {
        values.search = '%' + playerName.replace(/'/g, '\'') + '%';
        where.player = 'LIKE ${search}';
    }
};

const applyPlayerIDFilter = function(playerID, values, where) {
    if (playerID) {
        values.playerid = playerID;
        where.playerident = '${playerid}';
    }
};

const applySeasonFilter = function (season, values, where, _dbFields) {
    const dbFields = Object.assign({
        season: 'nflseason',
        week: 'regweek'
    }, _dbFields || {});

    let thisYear = NFL.getCurrentNFLYear();
    let thisWeek = NFL.getCurrentNFLWeek();

    if (season === 'THIS_SEASON') {
        values.nflseason = [thisYear.toString()];
        where[dbFields.season] = 'IN (${nflseason:csv})';
    } else if (season === '1_SEASON') {
        values.nflseason = [(thisYear - 1).toString()];
        where[dbFields.season] = 'IN (${nflseason:csv})';
    } else if (season === '3_SEASONS') {
        values.nflseason = Array.from(new Array(3).keys()).map(function (diff) {
            return (thisYear - diff - 1).toString();
        });
        where[dbFields.season] = 'IN (${nflseason:csv})';
    } else if (season === '5_SEASONS') {
        values.nflseason = Array.from(new Array(5).keys()).map(function (diff) {
            return (thisYear - diff - 1).toString();
        });
        where[dbFields.season] = 'IN (${nflseason:csv})';
    } else if (season === '10_SEASONS') {
        values.nflseason = Array.from(new Array(10).keys()).map(function (diff) {
            return (thisYear - diff - 1).toString();
        });
        where[dbFields.season] = 'IN (${nflseason:csv})';
    } else if (season === '2_WEEKS') {
        values.nflseason = [thisYear.toString()];
        where[dbFields.season] = 'IN (${nflseason:csv})';
        values.regweek = Array.from(new Array(thisWeek).keys()).map(function (week) {
            return week + 1;
        }).splice(-2);
        where[dbFields.week] = 'IN (${regweek:csv})';
    } else if (season === '4_WEEKS') {
        values.nflseason = [thisYear.toString()];
        where[dbFields.season] = 'IN (${nflseason:csv})';
        values.regweek = Array.from(new Array(thisWeek).keys()).map(function (week) {
            return week + 1;
        }).splice(-4);
        where[dbFields.week] = 'IN (${regweek:csv})';
    } else if (season === '8_WEEKS') {
        values.nflseason = [thisYear.toString()];
        where[dbFields.season] = 'IN (${nflseason:csv})';
        values.regweek = Array.from(new Array(thisWeek).keys()).map(function (week) {
            return week + 1;
        }).splice(-8);
        where[dbFields.week] = 'IN (${regweek:csv})';
    } else if (season === '12_WEEKS') {
        values.nflseason = [thisYear.toString()];
        where[dbFields.season] = 'IN (${nflseason:csv})';
        values.regweek = Array.from(new Array(thisWeek).keys()).map(function (week) {
            return week + 1;
        }).splice(-12);
        where[dbFields.week] = 'IN (${regweek:csv})';
    }
};

const applyTeamFilter = function (team, values, where) {
    if (team) {
        values.team = team;
        where.curteam = '${team}';
    }
};

const applyPositionsFilter = function (positions, values, where) {
    if (positions) {
        values.position = positions;
        where.tpposition = 'IN (${position:csv})';
    }
};

const applySplitsFilter = function (splits, values, where) {
    const seasonTypes = [1];
    if(splits && splits.WEEKS.includes('PLAYOFFS')) {
        seasonTypes.push(3);
    }
    values.regseason = seasonTypes;
    where.regseason = 'IN (${regseason:csv})';

    if (splits) {
        if (splits.WEEKS.length) {
            const weeks = [];
            if (splits.WEEKS.includes('WEEKS_1_6')) {
                weeks.push('Weeks 1-6');
            }
            if (splits.WEEKS.includes('WEEKS_7_13')) {
                weeks.push('Weeks 7-13');
            }
            if (splits.WEEKS.includes('WEEKS_14_16')) {
                weeks.push('Weeks 14-16');
            }
            if (splits.WEEKS.includes('PLAYOFFS')) {
                weeks.push('NFL Playoffs');
            }
            if(weeks.length > 0) {
                values.seasonweeks = weeks;
                where.seasonweeks = 'IN (${seasonweeks:csv})';
            }
        }
    }
};

const applyWeatherFilter = function (weather, values, where) {
    if(weather) {
        if (weather.TEMPERATURES.length) {
            const temps = [];
            if (weather.TEMPERATURES.includes('VCOLD')) {
                temps.push('J');
            }
            if (weather.TEMPERATURES.includes('COLD')) {
                temps.push('K');
            }
            if (weather.TEMPERATURES.includes('FAIR')) {
                temps.push('L');
            }
            if (weather.TEMPERATURES.includes('WARM')) {
                temps.push('M');
            }
            if (weather.TEMPERATURES.includes('HOT')) {
                temps.push('N');
            }
            if (weather.TEMPERATURES.includes('VHOT')) {
                temps.push('O');
            }
            if(temps.length > 0) {
                values.ctemp = temps;
                where.ctemp = 'IN (${ctemp:csv})';
            }
        }
        if (weather.CONDITIONS.length) {
            const cond = [];
            if (weather.CONDITIONS.includes('CLEAR')) {
                cond.push('S');
            }
            if (weather.CONDITIONS.includes('OVERCAST')) {
                cond.push('T');
            }
            if (weather.CONDITIONS.includes('RAIN')) {
                cond.push('U');
            }
            if (weather.CONDITIONS.includes('HRAIN')) {
                cond.push('V');
            }
            if (weather.CONDITIONS.includes('SNOW')) {
                cond.push('W');
            }
            if (weather.CONDITIONS.includes('HSNOW')) {
                cond.push('Y');
            }
            if(cond.length > 0) {
                values.cwcond = cond;
                where.cwcond = 'IN (${cwcond:csv})';
            }

            const wind = [];
            if (weather.CONDITIONS.includes('WINDY')) {
                wind.push('Q');
            }
            if (weather.CONDITIONS.includes('VWINDY')) {
                wind.push('R');
            }
            if(wind.length > 0) {
                values.cwind = wind;
                where.cwind = 'IN (${cwind:csv})';
            }
        }
    }
};

const applyFieldsFilter = function (fields, values, where) {
    if(fields && fields.length > 0) {
        const location = [];
        if(fields.includes('HOME')) {
            location.push('HOME');
        }
        if(fields.includes('AWAY')) {
            location.push('AWAY');
        }
        if(location.length > 0) {
            values.location = location;
            where.location = 'IN (${location:csv})';
        }

        const inoutdoor = [];
        if(fields.includes('INDOOR')) {
            inoutdoor.push('Indoor');
        }
        if(fields.includes('OUTDOOR')) {
            inoutdoor.push('Outdoor');
        }
        if(inoutdoor.length > 0) {
            values.inoutdoor = inoutdoor;
            where.inoutdoor = 'IN (${inoutdoor:csv})';
        }

        const playsurface = [];
        if(fields.includes('TURF')) {
            playsurface.push('Turf');
        }
        if(fields.includes('GRASS')) {
            playsurface.push('Grass');
        }
        if(playsurface.length > 0) {
            values.playsurface = playsurface;
            where.playsurface = 'IN (${playsurface:csv})';
        }

        if(fields.includes('PRIMETIME')) {
            where.pgs = 'TRUE';
        }
    }
};

const applyVersusFilter = function (versus, versus_val, values, where) {
    if(versus && versus === 'TEAM') {
        values.vsteam = versus_val;
        where.vsteam = '${vsteam}';
    }
    if(versus && versus === 'HC') {
        values.vshcoach = versus_val;
        where.vshcoach = '${vshcoach}';
    }
    if(versus && versus === 'OC') {
        values.vsoffcoor = versus_val;
        where.vsoffcoor = '${vsoffcoor}';
    }
    if(versus && versus === 'DC') {
        values.vsdefcood = versus_val;
        where.vsdefcood = '${vsdefcood}';
    }
};

const applyOrderByFilter = function (orderBy, order, values) {
    if (orderBy) {
        values.orderBy = orderBy;
        values.order = order;
    }
};

const applyLimits = function(limit, page, values) {
    if (limit) {
        values.limit = limit;
    }
    if (page) {
        values.offset = values.limit * page;
    }
};

module.exports = {
    getPlayersWithNumberOfRecords: function (req) {
        const values = Object.assign({}, defaultValues);

        const columns = PlayersModel.getPlayersColumns(
            req.query.search, req.query.team, req.query.positions, req.query.season, req.query.splits, req.query.weather, req.query.fields, req.query.versus, req.query.versus_val);

        const where = {};

        applySeasonFilter(req.query.season, values, where);

        applyTeamFilter(req.query.team, values, where);

        applyPositionsFilter(req.query.positions, values, where);

        applySplitsFilter(req.query.splits, values, where);

        applyWeatherFilter(req.query.weather, values, where);

        applyFieldsFilter(req.query.fields, values, where);

        applyVersusFilter(req.query.versus, req.query.versus_val, values, where);

        applyOrderByFilter(req.query.orderBy, req.query.order, values);

        applyLimits(req.query._limit, req.query._page, values);

        values.table = Model.getTableName('nflp', req.query.search, req.query.splits, req.query.fields);

        return new Promise(function (resolve, reject) {
            Promise.all(
                [
                    db.any(PlayersModel.buildPlayerQuery(values, where, req.query.orderBy, req.query.order), values),
                    db.any(Model.buildCountQuery(PlayersModel.buildPlayerQuery(values, where, req.query.orderBy, req.query.order, false)), values),
                ]).then(function (data) {
                resolve({
                    columns: columns,
                    rows: data[0],
                    count: parseInt(data[1][0].cnt, 10)
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    },
    getSpecificPlayerRecordsWithNumberOfRecords: function (req) {
        const values = Object.assign({}, defaultValues);
        const where = {};

        applyPlayerIDFilter(req.query.search, values, where);

        applySeasonFilter(req.query.season, values, where, {
            week: 'week'
        });

        let seasonTypes = [1];
        if(req.query.splits && req.query.splits.WEEKS.includes('PLAYOFFS')) {
            seasonTypes = [3];
        }
        values.regseason = seasonTypes;
        where.regseason = 'IN (${regseason:csv})';

        applyTeamFilter(req.query.team, values, where);

        applyPositionsFilter(req.query.positions, values, where);

        applyWeatherFilter(req.query.weather, values, where);

        applyOrderByFilter(req.query.orderBy, req.query.order, values);

        values.table = Model.getTableName('nflp', req.query.search, req.query.splits, req.query.fields);

        return new Promise(function (resolve, reject) {
            Promise.all([
                db.any(PlayersModel.buildPlayerSpecificRecordsQuery(req.query.season || '', req.query.weather, values, where, req.query.orderBy, req.query.order), values),
                db.any(Model.buildCountQuery(PlayersModel.buildPlayerSpecificRecordsQuery(req.query.season || '', req.query.weather, values, where, req.query.orderBy, req.query.order, false)), values),
            ]).then(function (data) {
                let position = 'QB';
                if(data[0].length > 0) {
                    position = data[0][0].position;
                }
                resolve({
                    columns: PlayersModel.getSpecificPlayerRecordColumns(position, req.query.season, req.query.weather),
                    rows: data[0],
                    count: parseInt(data[1][0].cnt, 10)
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    },
    getPlayerNamesAutoComplete: function (req) {
        const values = Object.assign({}, defaultValues);

        const columns = PlayersModel.getSearchColumns();
        const where = {};

        applyPlayerNameFilter(req.params.query, values, where);

        values.table = 'ffplayers2017';

        //values.limit = 10;

        return new Promise(function (resolve, rejected) {
            db.any(PlayersModel.buildSearchQuery(), values).then(function (data) {
                resolve({
                    columns: columns,
                    rows: data
                });
            }).catch(function (err) {
                rejected(err);
            });
        });
    },

    getTeamsWithNumberOfRecords: function (req) {
        const values = Object.assign({}, defaultValues);
        const where = {};

        applySeasonFilter(req.query.season, values, where);

        applyTeamFilter(req.query.team, values, where);

        applySplitsFilter(req.query.splits, values, where);

        applyWeatherFilter(req.query.weather, values, where);

        applyFieldsFilter(req.query.fields, values, where);

        applyVersusFilter(req.query.versus, req.query.versus_val, values, where);

        applyOrderByFilter(req.query.orderBy, req.query.order, values);

        applyLimits(req.query._limit, req.query._page, values);

        values.table = Model.getTableName('nflt', req.query.search, req.query.splits, req.query.fields);

        return new Promise(function (resolve, reject) {
            Promise.all(
                [
                    db.any(TeamsModel.buildTeamQuery(req.query.positions, values, where, req.query.orderBy, req.query.order), values),
                    db.any(Model.buildCountQuery(TeamsModel.buildTeamQuery(req.query.positions, values, where, req.query.orderBy, req.query.order, false)), values),
                ]).then(function (data) {
                resolve({
                    columns: TeamsModel.getTeamsColumns(req.query.positions),
                    rows: data[0],
                    count: parseInt(data[1][0].cnt, 10)
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    },
};