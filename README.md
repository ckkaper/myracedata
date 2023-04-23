## Race Data scrapper and data visualization
___
A basic webscrapper retrieving and storing race results for runners with some basic data visualization capabilities.

+ scrap data publicly available and store them in csv format.
+ process stored data and prepare them for data visualization.
+ data visualization:
    + Athletes performance results grouped by performance in a bar chart.
+ Identify performance group for a person.

### Installation
___
Running this requires Nodejs installed and also npm for the required packages.

```
npm i 
```
### Web Scrapper
___
The scraper is based on [puppeteer](https://pptr.dev/) for navigating through the page and [cheerio](https://cheerio.js.org/) for the element selection.

#### Usage
As project aims to be a basic solution for scraping and visualizing data of performance results the algorithmic logic followed in the scraping file is fitted to the webpage of interest sponsoring this effort. For different webpages or content the algoritmich logic should probably change.

**Configure Scraper**
In `config.json` file, in the scraper section you can add your own scraping settings:
 - `scaperUrl` the url to scrap data from
 - `dataCsvHeader` structure of the csv defined in the scraping logic. 
 - `processedDataPath` data path to store the processed data. 
 - `chartDataPath` data path for the chart data required for the chart visualization

 **Scraper Pipeline**
 Once the data are scraped and stored, preprocessing steps are required to convert data to an convenient way to be processed. Bellow there is a list of the all steps required before data are ready for visualization.
 ```
 npm run scrap                     # scrap data from the configured web page
 npm run process-data              # reduce data to usable required entries per user 
 npm run generate-chart-data       # Calculate PDF and generate chart data 
 ```

### Data Visualization
___
The main motivation of this was to present and observe the distribution of a local community race the only supported chart is a bar chart with the feature to identify the place in the distribution for a person. The library used is [ChartJs](https://www.chartjs.org/docs/latest/) and more visualization could be generated following as an example the implemented code. 

**Visualize Data**
Start backend server
```
npm run start-server
```

Go to local file path
```
C:/<PATH_TO>/public/index.html
```
### Licence
___
MIT: https://mit-license.org