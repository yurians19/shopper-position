const express = require('express');

const ShopperPositionController = require('./controllers/ShopperPositionController');

const router = express.Router();

router.post('/position/:shopperId', ShopperPositionController.insert);

module.exports = router;
