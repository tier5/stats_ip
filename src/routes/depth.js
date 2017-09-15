const router = require('express').Router();

const validator = require('../middlewares/DepthMiddleware');
const controller = require('../controllers/DepthController');

router.get('/games', validator.validateGames, controller.getGames);

router.get('/gameField', validator.validateGameField, controller.getGame);

router.get('/statIp/defensive', validator.validateStatIpDefensive, controller.getStatIpDefensive);
router.get('/statIp/offensive', validator.validateStatIpOffensive, controller.getStatIpOffensive);

module.exports = router;
