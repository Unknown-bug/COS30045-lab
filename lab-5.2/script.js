// --- Configuration Variables ---

// Define the dimensions of the SVG canvas
const w = 500;
const h = 250;
const padding = 20;
const maxValue = 25; // Maximum value for random data generation

// Define the initial dataset
var dataset = [14, 5, 26, 23, 9, 21, 7, 19, 20, 15, 8, 12];

// --- D3 Code ---

// Create scale functions
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

// Create the SVG element
var svg1 = d3.select(".chart-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Create and position the bars (rectangles)
svg1.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", function (d) {
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
        return yScale(d);
    })
    .attr("fill", "slategrey");

// Add labels on top of the bars
svg1.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
        return h - yScale(d) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");

// Function to generate new random data
function generateNewData() {
    // Store the number of values in the dataset
    var numValues = dataset.length;

    // Clear the dataset
    dataset = [];

    // Generate new random data
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    }

    // Update the scales with the new data
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);
}

// Function to update chart with basic transition
function updateWithBasicTransition() {
    generateNewData();

    // Update the rectangles with smooth transition
    svg1.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(2000)
        .ease(d3.easeCubicInOut)
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("height", function (d) {
            return yScale(d);
        });

    // Update the labels with smooth transition
    svg1.selectAll("text")
        .data(dataset)
        .transition()
        .duration(2000)
        .ease(d3.easeCubicInOut)
        .text(function (d) {
            return d;
        })
        .attr("y", function (d) {
            return h - yScale(d) + 14;
        });
}

// Function to update chart with elastic transition and staggered delay
function updateWithElasticTransition() {
    generateNewData();

    // Update the rectangles with elastic transition and staggered delay
    svg1.selectAll("rect")
        .data(dataset)
        .transition()
        .delay(function (d, i) {
            return i * 100; // Each bar delayed by 100ms more than the previous
        })
        .duration(2000)
        .ease(d3.easeElasticOut)
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("height", function (d) {
            return yScale(d);
        });

    // Update the labels with elastic transition and staggered delay
    svg1.selectAll("text")
        .data(dataset)
        .transition()
        .delay(function (d, i) {
            return i * 100;
        })
        .duration(2000)
        .ease(d3.easeElasticOut)
        .text(function (d) {
            return d;
        })
        .attr("y", function (d) {
            return h - yScale(d) + 14;
        });
}

// Function to update chart with proportional delay (always takes 1000ms total)
function updateWithProportionalTransition() {
    generateNewData();

    // Update the rectangles with proportional delay
    svg1.selectAll("rect")
        .data(dataset)
        .transition()
        .delay(function (d, i) {
            return i / dataset.length * 1000; // Proportional delay so total animation is 1000ms
        })
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("height", function (d) {
            return yScale(d);
        });

    // Update the labels with proportional delay
    svg1.selectAll("text")
        .data(dataset)
        .transition()
        .delay(function (d, i) {
            return i / dataset.length * 1000;
        })
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .text(function (d) {
            return d;
        })
        .attr("y", function (d) {
            return h - yScale(d) + 14;
        });
}

// Add event listeners for the different transition buttons
d3.select("#updateButton")
    .on("click", updateWithBasicTransition);

d3.select("#transition1Button")
    .on("click", updateWithElasticTransition);

d3.select("#transition2Button")
    .on("click", updateWithProportionalTransition); 