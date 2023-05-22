const chartData = {
labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
datasets: [
    {
    label: "Data",
    backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(75, 192, 192, 0.5)" , "rgba(75, 192, 192, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(75, 192, 192, 0.5)" ],
    borderColor: "rgba(75, 192, 192, 1)",
    borderWidth: 1,
    data: [10, 20, 30, 40, 50],
    },
],
};

const ctx = document.getElementById("myChart").getContext("2d");
const chart = new Chart(ctx, {
type: "bar",
data: chartData,
options: {
    responsive: true,
    scales: {
    y: {
        beginAtZero: true,
    },
    },
},
});

  function labelData() {
    console.log('label data');
  const labelInput = document.getElementById("dataLabel");
  const newDataLabel = labelInput.value;

  // Assuming you want to label the first dataset's data
  // update first label of the dataset
  chart.data.labels[0] = newDataLabel;
  console.log(chart.data.datasets[0].backgroundColor);
  chart.data.datasets[0].backgroundColor[0] = "rgba(255, 99, 132, 0.5)";
  chart.update();

  // Clear the input field
  labelInput.value = "";
}

document.addEventListener("DOMContentLoaded", function() {
    chart.update();
    console.log("Inside DOMContentLoaded");

});