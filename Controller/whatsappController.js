const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteerExtra = require('puppeteer-extra');
puppeteerExtra.use(StealthPlugin());

let page;

async function generateQRCode(io) {
    try {
        if (!page) {
            const browserLaunch = await puppeteerExtra.launch({ headless: false });
            page = await browserLaunch.newPage();
            await page.goto('https://web.whatsapp.com/');
        }

        await page.waitForSelector('canvas', { timeout: 60000 });
        const qrCodeElement = await page.$('canvas');
        const qrCodeBoundingBox = await qrCodeElement.boundingBox();
        const screenshot = await page.screenshot({
            clip: {
                x: qrCodeBoundingBox.x - 10,
                y: qrCodeBoundingBox.y - 10,
                width: qrCodeBoundingBox.width + 20,
                height: qrCodeBoundingBox.height + 20
            },
            type: 'png'
        });
        const base64Screenshot = screenshot.toString('base64');
        io.emit('qrCodeEvent', base64Screenshot);
    } catch (error) {
        console.log('Error:', error);
    }
}

exports.getQRCode = async (req, res) => {
    const io = req.app.get('socketio');
    await generateQRCode(io);
    setInterval(() => generateQRCode(io), 30000);
    res.render('Code');
};
