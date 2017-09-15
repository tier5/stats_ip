const fs = require('fs');
const path = require('path');
const debug = require('debug')('sql');

const loadSQLQueryFile = function (filename) {
    return fs.readFileSync(path.join(__dirname, filename), 'UTF-8').toString()
        .replace(/--.*$/gm, "")
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/\s+/g, ' ').trim();
};

const buildWhere = function (whereObject) {
    let where = '1=1';
    Object.keys(whereObject).forEach((whereKey) => {
        let keyword = '=';
        if (whereObject[whereKey].trim().startsWith('IN') || whereObject[whereKey].trim().startsWith('IS') || whereObject[whereKey].trim().startsWith('LIKE'))
            keyword = '';

        where += ' AND ' + whereKey + ' ' + keyword + ' ' + whereObject[whereKey];
    });
    return where;
};

const getIPTableName = (baseName, search, splitsArg, fieldsArg) => {
    const splits = splitsArg || {WEEKS: [], QUARTERS: []};
    const fields = fieldsArg || [];

    let tableName = baseName;

    if (fields.includes('REDZONE') && !search) {
        if(baseName !== 'nflt')
            tableName += 'rz';
    } else if (search) {
        tableName += 'sts';
    } else {
        if(baseName !== 'nflt')
            tableName += 'all';
    }

    if (splits.QUARTERS.includes('OT')) {
        tableName += 'ovt';
    } else if (splits.QUARTERS.includes('1_QUATER') && splits.QUARTERS.includes('2_QUATER')) {
        tableName += '1h';
    } else if (splits.QUARTERS.includes('3_QUATER') && splits.QUARTERS.includes('4_QUATER')) {
        tableName += '2h';
    } else if (splits.QUARTERS.includes('1_QUATER')) {
        tableName += '1q';
    } else if (splits.QUARTERS.includes('2_QUATER')) {
        tableName += '2q';
    } else if (splits.QUARTERS.includes('3_QUATER')) {
        tableName += '3q';
    } else if (splits.QUARTERS.includes('4_QUATER')) {
        tableName += '4q';
    } else if ((fields.includes('REDZONE') && !search) || (baseName === 'nflt')) {
        tableName += 'all';
    }

    if (baseName === 'nflp' && !search) {
        tableName += 'splits2';
    }
    if (fields.includes('REDZONE') && baseName === 'nflt') {
        tableName += 'rz';
    }

    debug(tableName);
    return tableName;
};

const buildCountQuery = function (query) {
    return 'SELECT COUNT(*) AS cnt FROM (' + query + ') as derivedTable';
};

const getRowCountColumns = () => {
    return [
        {title: 'Count', field: 'cnt'},
    ];
};

module.exports = {
    loadSQLQueryFile: loadSQLQueryFile,
    buildWhere: buildWhere,

    getTableName: getIPTableName,

    getRowCountColumns: getRowCountColumns,

    buildCountQuery: buildCountQuery
};