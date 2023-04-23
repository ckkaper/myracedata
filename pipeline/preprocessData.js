const fs = require('fs');
const csv = require('csv-parser');
const config = require('../config.json');

function readRaceData(filePath) {
    const results = [];
    var processedResults = []

    fs.createReadStream(filePath)  // Replace 'data.csv' with your CSV file path
    .pipe(csv())
    .on('data', (item) => {
        if (item.AA == null) {
        } else {
            results.push(item);
        }
    })
    .on('end', () => {
        results.map(element => {
            if (element != "\n") {
                processedResults.push(
                {
                    AA: element.AA,
                    Id: element.id,
                    duration: element.full_distance_time
                });
            }
        });        
    fs.writeFileSync(config.scraper.results.processedDataPath, JSON.stringify(processedResults));
    });

}

// Execute
readRaceData(config.scraper.results.dataCsvFilePath);