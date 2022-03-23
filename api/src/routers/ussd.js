const router = require('express-promise-router')();
// importing the USSD controller
const { ussd,sessionCheck } = require('../controllers/ussd');


router.route('/').post([sessionCheck,ussd]);

module.exports = router;
