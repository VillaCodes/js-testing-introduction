const puppeteer = require('puppeteer');
const {generateText, checkAndGenerate} = require('./util');

test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
});


//testing for false positives
test('should output data-less text', () => {
    const text = generateText ('', null);
    expect(text).toBe(' (null years old)');
});

test('should generate a valid text output', () => {
    const text = checkAndGenerate('Max', 29)
    expect(text).toBe('Max (29 years old)')
});

//browser returns a promise, so use async/await with puppeteer
//page is an object
//all browser related things are async
//test also takes a timeout limit argument
test('should create an element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo:30,
        args: ['--window-size=1920,1080']
    });
    const page = await (await browser).newPage();
    await page.goto('file:///C:/Users/johna/Documents/GitHub/js-testing-introduction/index.html')
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '30');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', element => element.textContent);
    expect(finalText).toBe('Anna (30 years old)');
}, 10000);