var chart = null;

$.getJSON('http://localhost:3000/data', function(data)  {
    const binsCount = data.labels.length;
    
    const chartData = {
    labels: data.labels,
    datasets: [
        {
        label: "Finish time distribution",
        backgroundColor: populateBarchartColors(binsCount),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: data.frequencies,
        },
    ]};

    const ctx = document.getElementById("myChart").getContext("2d");
    chart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
        responsive: true,
        scales: {
        y: {
            beginAtZero: true,
        },
        },
    }});

    document.addEventListener("DOMContentLoaded", function() {
        chart.update();
    });
});

function labelData() {
    const labelInput = document.getElementById("dataLabel");
    const requestedLabel = labelInput.value;

    $.getJSON('http://localhost:3000/data', function(data) {

        var index = findIndex(data.idDistribution, requestedLabel);
        chart.data.datasets[0].backgroundColor = chart.data.datasets[0].backgroundColor.map(x => "rgba(75, 192, 192, 0.5)");
        chart.data.datasets[0].backgroundColor[index] = "rgba(255, 99, 132, 0.5)";
        chart.update();

        labelInput.value = "";
    });
}

function findIndex(data, searchItem) {
    for (var i = 0; i < data.length; i++) {
        console.log(searchItem);
        if (data[i].indexOf(searchItem) >= 0) {
            return i;
        }   
    }
    return -1;
}

function populateBarchartColors(bins) {
    var colors = []; 
    for (let i; i < bins; i++) {
        colors.push("rgba(75, 192, 192, 0.5)");
    }
    return colors;
}