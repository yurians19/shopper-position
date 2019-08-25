const express = require('express');

const ShopperPositionController = require('./controllers/ShopperPositionController');

const router = express.Router();
const { check } = require('express-validator');

router.post('/position/:shopperId', [
    check('shopperId').isNumeric(),
    check('lat').isNumeric(),
    check('lng').isNumeric()
  ], ShopperPositionController.insert);

module.exports = router;
