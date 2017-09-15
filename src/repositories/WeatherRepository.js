const Promise = require('promise');
const db = require('../database');
const model = require('../model/WeatherModel');



module.exports = {
    getGameStadium: function (weatherKey) {
        return new Promise(function (resolve, reject) {
            db.oneOrNone(model.buildGameStadiumQuery(), {
                weatherKey: weatherKey
            }).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        });
    },
    getGameGraphData: function (weatherKey) {
        return new Promise(function (resolve, reject) {
            db.any(model.buildGameGraphDataQuery(), {
                weatherKey: weatherKey
            }).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        });
    },
};
