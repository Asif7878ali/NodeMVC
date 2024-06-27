const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteerExtra = require('puppeteer-extra');
puppeteerExtra.use(StealthPlugin());

exports.easyPay = async (req, res) => {
    try {
        const browserLaunch = await puppeteerExtra.launch({ headless: false });
        const page = await browserLaunch.newPage();
        await page.goto('https://www.google.com/');
        await page.waitForSelector('textarea.gLFyf');
        await page.type('textarea.gLFyf' ,'easy-pay.in');
        await page.keyboard.press('Enter');
        await page.waitForSelector('h3.LC20lb.MBeuO.DKV0Md');
        await page.click('h3.LC20lb.MBeuO.DKV0Md');
        console.log('CLick the Actual Link');
        await page.waitForSelector('input#CphPageMiddle_txtUserID');
        await page.type('input#CphPageMiddle_txtUserID' , '10730329');
        await page.waitForSelector('input#CphPageMiddle_txtPassword');
        await page.type('input#CphPageMiddle_txtPassword' , 'Mkjain@1978#@!');
        await page.waitForSelector('input.img-responsive');
        await page.click('input.img-responsive');
        console.log('sign in Buttons click');
        const heading = await page.$eval("td.LabelText" , div => div.innerText);
        await browserLaunch.close();
        res.render('easypay', { data: heading });

} catch (error) {
         console.log('The error is' , error);
         throw error;
   }
};