const router = require('express').Router();

const validator = require('../middlewares/WeatherMiddleware');
const controller = require('../controllers/WeatherController');

router.get('/games', validator.validateGames, controller.getGames);

router.get('/gameStadium', validator.validateWeatherKey, controller.getGameStadium);
router.get('/gameGraphData', validator.validateWeatherKey, controller.getGameGraphData);

//router.get('/weatherData', validator.validateWeatherData, controller.getWeatherData);

module.exports = router;
