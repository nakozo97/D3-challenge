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
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(healthriskData, d => d.poverty)])
        .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthriskData, d => d.healthcare)])
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
        .attr("r", "15")
        .attr("fill", "#9cc9dd")
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

    // Step 6: Initialize Tool Tip
    var toolTip = d3.toolTip()
      .attr("class", "toolTip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state} <br> Poverty: ${d.poverty}<br> Healthcare: ${d.healthcare}`);
      });
    
    // Step 7: Create tooltip in the chart
    circlesGroup.call(toolTip);
  
    // Step 8: Create an event listener to display & hide the tooltip. 
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      
        // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
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
        .attr("value", "poverty") // value to grab for event listener
        .classed("active", true)
        .text("In Poverty (%)");

}); on("click", function(err) {
    console.log(error)
});