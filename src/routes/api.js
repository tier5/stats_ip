const router = require('express').Router();

router.use('/ip', require('./ip'));
router.use('/depth', require('./depth'));
router.use('/auth', require('./auth'));
router.use('/pages', require('./pages'));
router.use('/weather', require('./weather'));

module.exports = router;
