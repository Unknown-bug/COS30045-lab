// --- Configuration Variables ---

// Define the dimensions of the SVG canvas
const w = 500;
const h = 300; // Increased height to accommodate axes
const padding = 60; // Increased padding for axes

// Step 2: Define the new dataset for the scatter plot
// Each inner array: [x_coordinate, y_coordinate]
const dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
    [600, 150] // Outlier
];

// --- D3 Code ---

//Create scale functions
const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function (d) { return d[0]; })])
    .range([padding, w - padding]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function (d) { return d[1]; })])
    .range([h - padding, padding]); // Reversed range for y-axis

//Create axis functions
const xAxis = d3.axisBottom()
    .ticks(5)
    .scale(xScale);

const yAxis = d3.axisLeft()
    .ticks(5)
    .scale(yScale);

// Create the SVG element
const svg = d3.select(".chart-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Step 3: Create and position the circles
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        // The first value of the inner array (d[0]) is the x-coordinate.
        return xScale(d[0]);
    })
    .attr("cy", function (d) {
        // The second value (d[1]) is the y-coordinate.
        return yScale(d[1]);
    })
    .attr("r", function (d) {
        // Circle radius
        return 5;
    })
    .attr("fill", function (d) {
        // Style important data points in red (e.g., where y > 80).
        if (d[1] > 80) {
            return "red";
        }
        return "slategrey"; // Default color
    });

// Step 4: Add labels to the scatter plot
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        // The label text shows the coordinates.
        return d[0] + "," + d[1];
    })
    .attr("x", function (d) {
        // Position the label slightly to the right of the circle.
        return xScale(d[0]) + 10; // Offset by radius + a little extra
    })
    .attr("y", function (d) {
        // Position the label vertically aligned with the circle's center.
        return yScale(d[1]);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "green");

// Step 5: Add the x-axis at the bottom of the chart
svg.append("g")
    .attr("transform", "translate(0, " + (h - padding) + ")")
    .call(xAxis);

// Step 6: Add the y-axis at the left of the chart
svg.append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis); 