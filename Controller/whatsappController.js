const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteerExtra = require('puppeteer-extra');
puppeteerExtra.use(StealthPlugin());

const generateQRCode = async (req, res)  =>{
    let intervalId = null;
    try {
        const browserLaunch = await puppeteerExtra.launch({headless: false});
        console.log("Browser Open");
        const page = await browserLaunch.newPage();
        console.log("Tab Page");
        await page.goto('https://web.whatsapp.com/', {timeout:60000});
        console.log("Reached Whatsapp Page");
        await page.waitForSelector('canvas', {timeout:120000});
        console.log('Selector is find');
        const base64Screenshot = await captureScreenshot(page);
        console.log("Return image to View page");
        res.render('Code', { msg:'Qr Generated Succcesfuly', qrcode:base64Screenshot , status:true});
        if (!intervalId) {
            const io = require('../index.js');
            intervalId = setInterval(async () => {
              console.log('socket call');
              const newBase64Screenshot = await captureScreenshot(page);
               if(newBase64Screenshot === null){
                     io.emit('newQrCode', { msg:'Qr not Found', status: false });
               } else {
                    io.emit('newQrCode', { msg:'Qr Found Again', qrcode: newBase64Screenshot, status: true });
                    console.log('New QR Code captured and sent to clients');
               }
            }, 30000);
          }
} catch (error) {
       console.log('error is', error);
       res.render('Code', { msg:'No Device Found', qrcode:null , status:false});
}

async function captureScreenshot(page) {
    try {
      const qrCodeElement = await page.$('canvas');
      const qrCodeBoundingBox = await qrCodeElement.boundingBox();
      console.log('Bounding Box');
      const screenshot = await page.screenshot({
        clip: {
          x: qrCodeBoundingBox.x - 10,
          y: qrCodeBoundingBox.y - 10,
          width: qrCodeBoundingBox.width + 20,
          height: qrCodeBoundingBox.height + 20
        },
        type: 'png'
      });
      console.log('Take the Screnshot');
      return screenshot.toString('base64');
    } catch (error) {
      console.log('error capturing screenshot:', error);
      return null;
    }
  }
}

module.exports = generateQRCode;