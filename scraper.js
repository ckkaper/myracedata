const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const testSite = "https://webscraper.io/test-sites/e-commerce/allinone";
const scrapingUrl = "https://www.myrace.gr/race/5770/results.html";
const storePageToCsvFile = (content) => {
    $ = cheerio.load(content);

    let table = $('table');

    let csvFile = '';


    table.find('tr').each((i, row) => {
        let rowData = [];
        let csvLine = '';

        $(row).find('td').each((i, el)=> {
            csvLine = csvLine + `${$(el).text()},`;
            rowData.push($(el).text());
        });
        csvLine = csvLine + '\n';
        csvFile = csvFile + csvLine;
    })

    fs.appendFileSync('data/raceData.csv', csvFile, (err) => {
        if (err) throw err; 
        console.log('saved');
    });
}

function storePagedContentAsHtml(content) {
    $ = cheerio.load(content);
    const table = $('table');
    console.log(table.length);

    const tableData = [];

    table.find('tr').each((i, row) => {
        const rawData = [];

        $(row).find('td').each((i, el) => {
            rawData.push($(el).text());
        });
        tableData.push(rawData);
    })
    console.log(tableData);

}
(async ()=> {
    /*const browser = await puppeteer.launch(
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
*/
    storePageToCsvFile( ` <table>
                               <thead>
                                <tr role="row"><th data-priority="3" class="sorting_disabled ui-state-default" rowspan="1" colspan="1" aria-label="A/A"><div class="DataTables_sort_wrapper">A/A<span class="DataTables_sort_icon"></span></div></th><th data-priority="4" class="sorting ui-state-default sorting_asc" tabindex="0" aria-controls="tabledataresults" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Σειρά: activate to sort column descending"><div class="DataTables_sort_wrapper">Σειρά<span class="DataTables_sort_icon css_right ui-icon ui-icon-triangle-1-n"></span></div></th><th data-priority="101" class="sorting_disabled ui-state-default" rowspan="1" colspan="1" aria-label="Σειρά/Φύλο"><div class="DataTables_sort_wrapper"><div>Σειρά</div><div>/Φύλο</div><span class="DataTables_sort_icon"></span></div></th><th data-priority="1" class="sorting_disabled ui-state-default" rowspan="1" colspan="1" aria-label="BIB"><div class="DataTables_sort_wrapper">BIB<span class="DataTables_sort_icon"></span></div></th><th data-priority="2" class="sorting_disabled ui-state-default" rowspan="1" colspan="1" aria-label="ΌνομαΦύλοΟμάδα/Σύλλογος/Εταιρία/Οργανισμός/Άλλο"><div class="DataTables_sort_wrapper"><div style="margin-top:-5px">Όνομα</div><div style="font-size:9px;">Φύλο</div><div style="font-size:9px;margin-bottom:-5px">Ομάδα/Σύλλογος/Εταιρία/Οργανισμός/Άλλο</div><span class="DataTables_sort_icon"></span></div></th><th data-priority="49" class="sorting ui-state-default" tabindex="0" aria-controls="tabledataresults" rowspan="1" 
colspan="1" aria-label="2,6 Km: activate to sort column ascending"><div class="DataTables_sort_wrapper">2,6 Km<span class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"></span></div></th><th data-priority="48" class="sorting ui-state-default" tabindex="0" aria-controls="tabledataresults" rowspan="1" colspan="1" aria-label="Finsih: activate to sort column ascending"><div class="DataTables_sort_wrapper">Finsih<span class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"></span></div></th></tr>
                            </thead>
                           
                           
                            <tbody>                            <tr role="row" class="odd"><td tabindex="0">1</td><td class="sorting_1">1</td><td>1</td><td><a href="/bibcard/1487638/results.html">5618</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487638/results.html">ΝΙΚΟΛΑΚΕΑΣ ΝΙΚΟΔΗΜΟΣ</a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px"></div></td><td><div style="font-weight:bold">00:08:10</div><div>00:08:10</div></td><td><div style="font-weight:bold">00:16:16</div><div>00:16:16</div></td></tr><tr role="row" class="even"><td tabindex="0">2</td><td class="sorting_1">2</td><td>2</td><td><a href="/bibcard/1487797/results.html">6137</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487797/results.html">ΔΙΟΝΥΣΑΚΟΠΟΥΛΟΣ ΠΑΝΑΓΙΩΤΗΣ</a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px">ΑΟ ΠΕΛΟΨ</div></td><td><div style="font-weight:bold">00:08:43</div><div>00:08:43</div></td><td><div style="font-weight:bold">00:17:22</div><div>00:17:22</div></td></tr><tr role="row" class="odd"><td tabindex="0">3</td><td class="sorting_1">3</td><td>3</td><td><a href="/bibcard/1487796/results.html">6136</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487796/results.html">ΓΙΑΝΝΑΚΟΠΟΥΛΟΣ ΙΩΑΝΝΗΣ</a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px">ΑΟ ΠΕΛΟΨ</div></td><td><div style="font-weight:bold">00:08:31</div><div>00:08:31</div></td><td><div style="font-weight:bold">00:17:27</div><div>00:17:27</div></td></tr><tr role="row" class="even"><td tabindex="0">4</td><td class="sorting_1">4</td><td>4</td><td><a href="/bibcard/1487798/results.html">6138</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487798/results.html">ΘΑΝΑΣΗΣ ΑΛΕΞΑΝΔΡΟΣ</a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px">ΑΟ ΠΕΛΟΨ</div></td><td><div style="font-weight:bold">00:08:53</div><div>00:08:53</div></td><td><div style="font-weight:bold">00:18:00</div><div>00:18:00</div></td></tr><tr role="row" class="odd"><td tabindex="0">5</td><td class="sorting_1">5</td><td>5</td><td><a href="/bibcard/1487511/results.html">5491</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487511/results.html">ΠΑΠΑΤΣΑΡΟΥΧΑΣ ΠΑΝΑΓΙΩΤΗΣ</a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px">SoufliRunningTeam</div></td><td><div style="font-weight:bold">00:09:23</div><div>00:09:21</div></td><td><div style="font-weight:bold">00:18:33</div><div>00:18:31</div></td></tr><tr role="row" class="even"><td tabindex="0">6</td><td class="sorting_1">6</td><td>6</td><td><a href="/bibcard/1487644/results.html">5624</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487644/results.html">ΜΑΓΓΙΝΑΣ ΔΗΜΟΣ</a></div><div style="font-size:9px">Άνδρας</div><div 
style="font-size:9px; margin-bottom:-5px"></div></td><td><div style="font-weight:bold">00:09:23</div><div>00:09:21</div></td><td><div style="font-weight:bold">00:18:33</div><div>00:18:32</div></td></tr><tr role="row" class="odd"><td tabindex="0">7</td><td class="sorting_1">7</td><td>7</td><td><a href="/bibcard/1487524/results.html">5504</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487524/results.html">ΠΥΡΓΑΣ ΓΙΑΝΝΗΣ</a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px"></div></td><td><div style="font-weight:bold">00:09:10</div><div>00:09:09</div></td><td><div style="font-weight:bold">00:18:37</div><div>00:18:35</div></td></tr><tr role="row" class="even"><td tabindex="0">8</td><td class="sorting_1">8</td><td>8</td><td><a href="/bibcard/1487243/results.html">5223</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487243/results.html">LIAKOPOULOS  GIORGOS </a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px">Sciencetraining</div></td><td><div style="font-weight:bold">00:09:23</div><div>00:09:23</div></td><td><div style="font-weight:bold">00:18:38</div><div>00:18:38</div></td></tr><tr role="row" class="odd"><td tabindex="0">9</td><td class="sorting_1">9</td><td>9</td><td><a href="/bibcard/1487476/results.html">5456</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487476/results.html">ΝΤΑΛΙΑΝΗΣ ΓΙΩΡΓΟΣ</a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px"></div></td><td><div style="font-weight:bold">00:09:43</div><div>00:09:40</div></td><td><div style="font-weight:bold">00:19:21</div><div>00:19:18</div></td></tr><tr role="row" class="even"><td tabindex="0">10</td><td class="sorting_1">10</td><td>10</td><td><a href="/bibcard/1487645/results.html">5625</a></td><td><div style="font-weight:bold; margin-top:-5px"><a style="margin-right:8px" href="/bibcard/1487645/results.html">ΙΣΟΥΦΙ MARVIN</a></div><div style="font-size:9px">Άνδρας</div><div style="font-size:9px; margin-bottom:-5px"></div></td><td><div style="font-weight:bold">00:09:28</div><div>00:09:26</div></td><td><div style="font-weight:bold">00:19:36</div><div>00:19:33</div></td></tr></tbody></table>`

       //return document.querySelector('#tabledataresults').innerHTML;
    );

//    await page.click('#tabledataresults_next')



    

    // fetch the first page

    // store the data

})();