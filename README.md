# D3-challenge

## Data Journalism and D3

## Background

- - -

A significant metro paper recently hired me as the new data visualization analyst to analyze the current trends shaping people's lives by creating charts, graphs, and interactive elements to help readers understand our editorial staff's findings on the `Healthcare vs. Poverty` USA state report. 

Our findings below were generated using information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System. The dataset includes government findings based on the 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml)]. 

### Dataset Index

* State ID
* State
* State Abbreviation
* Poverty / PovertyMoe
* Age / AgeMoe
* Income / IncomeMoe
* Healthcare / HealthcareMoe
* Obesity / ObesityLow / ObesityHigh
* Smokes / SmokesLow / SmokesHigh

* Note: MOE stands for "margin of error."

##### Note: This Report was written/edited with HTML, Javascript, D3, and Microsoft Excel.

### Core Assignment: D3 Dabbler

![Newsroom](Images/4-scatter.jpg)

* A scatter plot was created to analyze variables `Healthcare` and `Poverty`.
* Each State is represented by light blue circle elements.
* Each State's abbreviations are represented inside the light blue circle elements.
* X-Axis (Bottom of Chart) `In Poverty (%)` label represents `Poverty` values. 
* Y-Axis (Left of Chart) `Lacks Healthcare (%)` label represents `Healthcare` values.
* d3-tip was incorporated in `app.js`, the Javascript file.
* d3 allows the user to reveal a specific's data when the user hovers their cursor over the element. 

* Note: This is coded in the `app.js` file in this repository and requires the usage of `python -m http.server` to run the visualizations. This will host the page at `localhost:8000` in the user's web browser.

End of README.md
 