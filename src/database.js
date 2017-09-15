
const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.STATROUTE_DB_HOST,
    port: process.env.STATROUTE_DB_PORT,
    database: process.env.STATROUTE_DB_DATABASE,
    user: process.env.STATROUTE_DB_USER,
    password: process.env.STATROUTE_DB_PASSWORD,
    ssl: process.env.STATROUTE_DB_SSL
});

module.exports = db;
