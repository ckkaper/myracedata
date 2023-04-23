const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const config = require('../config.json');

const scrapingUrl = config.scraper.urlToScrap;

const storePageToCsvFile = (content) => {
    $ = cheerio.load(content);

    let table = $('table');

    let csvFile = config.scraper.results.dataCsvHeader;

    table.find('tr').each((i, row) => {
        let rowData = [];
        let csvLine = '';

        $(row).find('td').each((i, el)=> {
            if (i == 6 || i == 5) {
                csvLine = csvLine + `${$(el).children().first().text()},`
                rowData.push($(el).children().first().text());
            } else {
                csvLine = csvLine + `${$(el).text()},`;
                rowData.push($(el).text());
            }
        });
        csvLine = csvLine + '\n';
        csvFile = csvFile + csvLine;
    })

    fs.appendFileSync(config.scraper.results.dataCsvFilePath, csvFile, (err) => {
        if (err) throw err; 
    });
}

const isPaginationNextButtonEnabled = async (page) => {
    return await page.$('#tabledataresults_next')
                        .then((el) => el.getProperty("className"))
                        .then((cn) => cn.jsonValue())
                        .then((x) => {
                            if (x.split(" ").find((x) => x=="ui-state-disabled") != undefined) {
                                return false;
                            } else {
                                return true;
                            }
                        });
    
}


(async ()=> {


    const browser = await puppeteer.launch(
    { 
        args: ['--window-size=1080,1024'],
        headless: false
    });    

    const page = await browser.newPage();
    page.setViewport({width: 1080, height:1024})

    await page.goto(scrapingUrl, {waitUntil: ['domcontentloaded']});

    // Locate the required selector ensuring that the data are fetched
    await page.waitForSelector('#tabledataresults');
    await page.waitForSelector('tr');

    var counter = 1;
    var nextPage = await isPaginationNextButtonEnabled(page); 
    console.log(`Go to next page: ${nextPage}`);
    do {

        await page.waitForTimeout(3000);
        // store first page to csv
        await page.$("#tabledataresults").then((el) => {
            el.evaluate((d) => {
                return d.outerHTML; 
            }).then((x) => {
                console.log(`Store to csv: ${counter}`);
                storePageToCsvFile(x);
                return x;
            }).catch((err) => {
                console.log("failed to write to CSV file");
                console.log(err);
            })
        });


        counter++;
        await setTimeout(() => {
            console.log('Wait');
        }, 3000)

        console.log(`before page check ${counter}`);
        var nextPageEnabled = await isPaginationNextButtonEnabled(page);


        await page.waitForSelector('#tabledataresults_next');
        // go to the next page
        await page.click('#tabledataresults_next');
        
        if (!nextPageEnabled)
        {
            break;
        }
    } while (nextPageEnabled);
    browser.close();

})();
