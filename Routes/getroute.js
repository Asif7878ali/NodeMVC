const {Router} = require('express');
const generateQRCode = require('../Controller/whatsappController.js');
const easypay = require('../Controller/easypayController.js');
const automateNumber = require('../Controller/whataNumController.js');

const router = Router();

router.route('/').get((req , res) =>{
    res.render('home');
})
router.route('/automate/whatsapp').get(generateQRCode);
router.route('/automate/whatapp/number').get(automateNumber);
router.route('/automate/easypay').get(easypay);

module.exports = router;