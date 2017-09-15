var teams = require('./parameters/teams');
var seasons = require('./parameters/seasons');
var splits = require('./parameters/splits');
var fields = require('./parameters/fields');
var versusTypes = require('./parameters/versusTypes');
var weather = require('./parameters/weather');

module.exports = function (filters, nflp) {
    const titleArray = [];

    const positions = filters.positions.slice();
    if(positions.length >= 3) {
        for(var i = 0; i < positions.length - 2; ++i) {
            if(positions[i] === 'RB' && positions[i + 1] === 'WR' && positions[i + 2] === 'TE') {
                console.log('splice');
                positions.splice(i, 3, 'Flex');
            }
        }
    }

    var temp = (nflp) ? 'All Players' : 'All Teams';
    if (filters.team) {
        temp = teams[filters.team].fullName;

        if (positions.length) {
            temp += ', All ' + positions.join(', ');
        }
    } else if (!filters.team && filters.searchName.length > 0) {
        temp = filters.searchName;
    } else if (positions.length > 0) {
        temp = 'All ' + positions.join(', ');
    }

    if (temp !== false)
        titleArray.push(temp);

    temp = false;
    if (filters.season) {
        temp = seasons[filters.season];

        if (filters.splits.WEEKS.length !== 0 && !filters.splits.WEEKS.includes('ALL')) {
            temp = temp + ', ' +filters.splits.WEEKS.map(function (weekKey) {
                return splits.WEEKS[weekKey]
            }).join(', ');
        }
    } else if (filters.splits.WEEKS.length !== 0) {
        temp = filters.splits.WEEKS.map(function (weekKey) {
            return splits.WEEKS[weekKey]
        }).join(', ');
    } else {
        temp = 'This season';
    }

    if (temp !== false)
        titleArray.push(temp);

    temp = false;

    if (filters.splits.QUARTERS.length === 2) {
        if (filters.splits.QUARTERS.includes('1_QUATER')) {
            temp = 'First Half';
        } else {
            temp = 'Second Half';
        }
    } else if (filters.splits.QUARTERS.length === 1 && filters.splits.QUARTERS[0] !== 'ALL') {
        temp = splits.QUARTERS[filters.splits.QUARTERS[0]];
    }

    if (temp !== false)
        titleArray.push(temp);

    temp = false;

    if (!filters.weather.TEMPERATURES.includes('ALL')) {
        temp = filters.weather.TEMPERATURES.map(function (tempKey) {
            return weather.TEMPERATURES[tempKey];
        }).join(', ');
    }

    if (temp !== false)
        titleArray.push(temp);

    temp = false;

    if (!filters.weather.CONDITIONS.includes('ALL')) {
        temp = filters.weather.CONDITIONS.map(function (condKey) {
            return weather.CONDITIONS[condKey];
        }).join(', ');
    }

    if (temp !== false)
        titleArray.push(temp);

    temp = false;
    var hasGames = false;

    if (!filters.fields.includes('ALL')) {
        temp = filters.fields.map(function (fieldKey) {
            return fields[fieldKey]
        }).join(', ');
        hasGames = true;
    }

    if (temp !== false)
        titleArray.push(temp);

    temp = false;

    if (filters.versus) {
        const val = (filters.versus === 'TEAM') ? teams[filters.versus_val].fullName : filters.versus_val;
        temp = versusTypes[filters.versus] + ' ' + val;
        hasGames = true;
    }

    if(!hasGames) {
        temp = 'All games';
    }

    if (temp !== false)
        titleArray.push(temp);


    return titleArray.join(', ');
};