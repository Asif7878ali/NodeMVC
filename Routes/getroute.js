const express = require('express');
const router = express.Router();
const whatsappController = require('../Controller/whatsappController.js');
const easypayController = require('../Controller/easypayController.js')

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/automate/whatsapp', whatsappController.getQRCode);
router.get('/automate/easypay', easypayController.easyPay);

module.exports = router;