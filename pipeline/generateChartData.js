const fs = require('fs');
const config = require('../config.json');



function saveJsonToFile(jsonObject) {
    fs.writeFileSync(config.scraper.results.chartDataPath, JSON.stringify(jsonObject));
}

function readRaceData() {
    const data = require('../' + config.scraper.results.processedDataPath);
    const observationsCount = data.length;

    var numberOfBins = calculateNumberOfBins(observationsCount);
    console.log(`Number of Bins: ${numberOfBins}`);

    return dataInSeconds(data);
}

function calculateChartData(data, numberOfBins) {
    var min = data[0].duration;
    var max = data[data.length - 1].duration;
    
    var durationRange = max - min;

    var binWidth = Math.round(durationRange / numberOfBins);

    var binRanges = []; 

    var binRangeSum = min;
    binRanges.push(min);
    for (var i = 0; i < numberOfBins - 1; i++) {
        binRangeSum = binRangeSum + binWidth
        binRanges.push(binRangeSum);
    }

    binRanges.push(max);

    // calculate frequency
    var frequencyPerBin = [];
    var idDistribution = [];

    // init idDistributionBins
    for (var i = 0; i < numberOfBins; i++) {
        idDistribution.push([]);
    }
    for (var i = 0; i < numberOfBins; i++) {
        frequencyPerBin.push(0); 
    }

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < numberOfBins; j++) {
            if (data[i].duration > binRanges[j] && data[i].duration <= binRanges[j + 1] ) {
                frequencyPerBin[j]++;
                idDistribution[j].push(data[i].Id);
            }
        }
    }

    var chartLabels = calculateLabels(binRanges);
    var chartFrequencies = frequencyPerBin;

    var chartData = { 
        frequencies: chartFrequencies,
        labels: chartLabels,
        idDistribution: idDistribution
    };

    return chartData;
}

function calculateLabels(binRanges) {
    labels = [];
    
    for (var i = 0; i < binRanges.length - 1; i++) { 
        var label = `${convertSecondsToTimeFormat(binRanges[i])} - ${convertSecondsToTimeFormat(binRanges[i + 1])}`
        labels.push(label);
    }
    return labels;
}

function convertTimeFormatToSeconds(duration) {
    // validate format
    var hms = duration.split(':');

    if (hms.length != 3) {
        console.log('error');
    }

    return (+hms[0]) * 60 * 60 + (+hms[1]) * 60 + (+hms[2]);
}

function convertSecondsToTimeFormat(seconds) {
    var secondSection = seconds % 60;
    var minutes = Math.floor( seconds / 60);
    var minutesSection = minutes % 60;
    var hoursSection = Math.floor(minutes / 60);

    return `${numberToString(hoursSection)}:${numberToString(minutesSection)}:${numberToString(secondSection)}`;
}

function calculateNumberOfBins(numberOfObservations) {
    return numberOfBins = Math.round( Math.log(numberOfObservations)/Math.log(2));
}

function dataInSeconds(data) {
    var dataInSeconds = []
    for (var i = 0; i < data.length; i++) {
        dataInSeconds.push({
            AA: data[i].AA,
            Id: data[i].Id, 
            duration: convertTimeFormatToSeconds(data[i].duration)
        });
    }
    return dataInSeconds;
}

function numberToString(number) {
    return number > 9 ? "" + number : "0" + number;
}

// execute
var dataInSeconds = readRaceData();

var chartData = calculateChartData(dataInSeconds, numberOfBins);

saveJsonToFile(chartData);
