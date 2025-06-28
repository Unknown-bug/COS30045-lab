// --- Configuration Variables ---

// Define the dimensions of the SVG canvas
const w = 500;
const h = 250;
const padding = 20;
const maxValue = 25; // Maximum value for random data generation

// Define the initial dataset
var dataset = [14, 5, 26, 23, 9, 21, 7, 19, 20, 15, 8, 12];

// Variable to track sort order (true = ascending, false = descending)
var sortAscending = true;

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

// Function to add mouse over effects to bars
function addMouseEffects(selection) {
    selection
        .on("mouseover", function (event, d) {
            // Change color to orange on mouseover
            d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", "orange");

            // Get position for tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) - 10;

            // Create SVG tooltip
            svg1.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "14px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .attr("background", "white")
                .text("This value is " + d);
        })
        .on("mouseout", function (d) {
            // Change color back to slategrey on mouseout
            d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", "slategrey");

            // Remove tooltip
            d3.select("#tooltip").remove();
        });
}

// Initial chart creation
function createInitialChart() {
    // Create and position the bars (rectangles)
    var bars = svg1.selectAll("rect")
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

    // Add mouse effects to initial bars
    addMouseEffects(bars);

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
}

// Function to add a new data value
function addValue() {
    // Generate one new random number
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);

    // Update xScale domain to recognize the extra value
    xScale.domain(d3.range(dataset.length));

    // Update yScale domain in case the new value is the maximum
    yScale.domain([0, d3.max(dataset)]);

    // Bind data to bars variable
    var bars = svg1.selectAll("rect")
        .data(dataset);

    // Handle new bars (enter selection)
    var newBars = bars.enter()
        .append("rect")
        .attr("x", w) // Start from the right side
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", "slategrey"); // Same color as existing bars

    // Add mouse effects to new bars
    addMouseEffects(newBars);

    // Merge and transition all bars
    newBars.merge(bars)
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        });

    // Update labels
    var labels = svg1.selectAll("text")
        .data(dataset);

    labels.enter()
        .append("text")
        .attr("x", w + xScale.bandwidth() / 2) // Start from the right side
        .attr("y", function (d) {
            return h - yScale(d) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d;
        })
        .merge(labels)
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return h - yScale(d) + 14;
        })
        .text(function (d) {
            return d;
        });
}

// Function to remove a data value
function removeValue() {
    // Don't remove if there's only one bar left
    if (dataset.length <= 1) return;

    // Remove the first element from the array
    dataset.shift();

    // Update xScale domain
    xScale.domain(d3.range(dataset.length));

    // Update yScale domain
    yScale.domain([0, d3.max(dataset)]);

    // Bind data to bars variable
    var bars = svg1.selectAll("rect")
        .data(dataset);

    // Handle existing bars (update selection)
    bars.transition()
        .duration(500)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        });

    // Handle bars that need to be removed (exit selection)
    bars.exit()
        .transition()
        .duration(500)
        .attr("x", w) // Slide out to the right
        .remove();

    // Update labels
    var labels = svg1.selectAll("text")
        .data(dataset);

    labels.transition()
        .duration(500)
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return h - yScale(d) + 14;
        })
        .text(function (d) {
            return d;
        });

    // Remove exiting labels
    labels.exit()
        .transition()
        .duration(500)
        .attr("x", w + xScale.bandwidth() / 2)
        .remove();
}

// Function to sort bars
function sortBars() {
    // Sort the rectangles based on their data values
    svg1.selectAll("rect")
        .sort(function (a, b) {
            if (sortAscending) {
                return d3.ascending(a, b);
            } else {
                return d3.descending(a, b);
            }
        })
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return xScale(i);
        });

    // Sort the labels to match the rectangles
    svg1.selectAll("text")
        .sort(function (a, b) {
            if (sortAscending) {
                return d3.ascending(a, b);
            } else {
                return d3.descending(a, b);
            }
        })
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        });

    // Toggle sort order for next time
    sortAscending = !sortAscending;
}

// Create the initial chart
createInitialChart();

// Add event listeners for the buttons
d3.select("#addButton")
    .on("click", addValue);

d3.select("#removeButton")
    .on("click", removeValue);

d3.select("#sortButton")
    .on("click", sortBars); 