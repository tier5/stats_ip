const router = require('express').Router();

const controller = require('../controllers/PageController');

router.get('/statroute-news', controller.getStatrouteNews);
router.get('/player-news', controller.getPlayerNews);
router.get('/:slug', controller.getPageBySlug);

module.exports = router;
