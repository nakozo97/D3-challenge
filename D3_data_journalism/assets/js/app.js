// Core Assignment: D3 Dabbler (Required Assignment)
// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty`. 

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,and shift the latter by left and top margins.
// MOE - Margin of Error
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(healthriskData, err) {
    if (err) throw err;
  
    // Step 1: parse data / cast as numbers
    healthriskData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.povertyMoe = +data.povertyMoe;
      data.age = +data.age;
      data.ageMoe = +data.ageMoe;
      data.income = +data.income;
      data.incomeMoe = +data.incomeMoe;
      data.healthcare = +data.healthcare;
      data.healthcareLow = +data.healthcareLow;
      data.healthcareHigh = +data.healthcareHigh;
      data.obesity = +data.obesity;
      data.obesityLow = +data.obesityLow;
      data.obesityHigh = +data.obesityHigh;
      data.smokes = +data.smokes;
      data.smokesLow = +data.smokesLow;
      data.smokesHigh = +data.smokesHigh;
    });
  
    // Step 2: Create scale functions (xLinearScale / yLinearScale)
    // Multiply .domain to edit the x-axis and y-axis starting/finishing values. 
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthriskData, d => d.poverty) * 0.9, d3.max(healthriskData, d => d.poverty) * 1.1])
        .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(healthriskData, d => d.healthcare) * 0.9, d3.max(healthriskData, d => d.healthcare) * 1.1])
        .range([height, 0]);

    // Step 3: Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // Step 4: Append Axes to the chart   
    chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
   
    // Step 5: Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthriskData)
        .enter()
        .append("g");
  
        circlesGroup
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        // Radius
        .attr("r", "8")
        .attr("fill", "#add8e6")
        .attr("stroke", "white");

        circlesGroup
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .text(d => d.abbr)
        .attr("font-family", "sans-serif")
        .attr("font-size", "8px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("fill", "#FFFFFF");

    // Step 6: Initialize Tool Tip / Incorporate d3-tip
    // Import: <script src="https://cdnjs.cloudflare.com //ajax/libs/d3-tip/0.7.1/d3-tip.min.js"></script>

    var toolTip = d3.tip()
      .attr("font-size", "10px")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state} <br> Poverty : ${d.poverty}% <br> Healthcare : ${d.healthcare}%`);
      });
    
    // Step 7: Create tooltip in the chart
    chartGroup.call(toolTip);
  
    // Step 8: Create an event listener to display & hide the tooltip. 
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      
        // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 30)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axis Text")
        .classed("active", true)
        .text("Lacks Healthcare (%)");

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height +margin.top + 30})`)
        .attr("x", 0)
        .attr("y", 0)
        .attr("value", "poverty")
        .classed("active", true)
        .text("In Poverty (%)");

}) 
    .catch(function(error) {
    console.log(error);
});