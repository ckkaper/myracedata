const fs = require('fs');
const csv = require('csv-parser');

function readRaceData(filePath) {
    const results = [];
    var processedResults = []

    fs.createReadStream(filePath)  // Replace 'data.csv' with your CSV file path
    .pipe(csv())
    .on('data', (data) => {
        results.push(data);
    })
    .on('end', () => {
        results.map(element => processedResults.push(
            {
                AA: element.AA,
                Id: element.id,
                duration: element.full_distance_time
            }));        
    console.log(processedResults);
    fs.writeFileSync("./data/processedData.json", JSON.stringify(processedResults));
    });

}

readRaceData('./data/raceData.csv');