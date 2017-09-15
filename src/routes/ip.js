const router = require('express').Router();

const validator = require('../middlewares/IPMiddleware');
const controller = require('../controllers/IpController');

router.get('/players', [
    validator.validatePlayersNFLP, validator.validatePlayersAndTeamsCommonFields
], controller.getPlayers);

router.get('/players/search/:query', controller.getPlayersAutoComplete);

router.get('/teams', [
    validator.validateTeamsNFLT, validator.validatePlayersAndTeamsCommonFields
], controller.getTeams);

module.exports = router;
