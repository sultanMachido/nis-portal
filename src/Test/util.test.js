
const generateCompanyName = require('../reusables/generateCompanyName');
const puppeteer = require('puppeteer');


test('must return company name containing random string',()=>{
    expect(generateCompanyName('ope')).toMatch(/^ope\d/)
})

test('should display modal',async ()=>{
    const browser = await puppeteer.launch({
        headless:false,
        slowMo:250,
        args:['--window-size=1920,1080']
    });

    const page = await browser.newPage();

    await page.goto('http://localhost:3000/register');
    await page.click('input[type=text]');
    await page.type('input[type=text]','YomHR');
    await page.click('input[type=email]');
    await page.type('input[type=email]','yomhr@gmail.com');
    await page.click('input[type=password]');
    await page.type('input[type=password]','yom1234');
    await page.click('button');
    const successText = await page.$eval('#modal',el=>el.firstChild.textContent);
    expect(successText).toBe('Successful!')
},100000)