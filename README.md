# Visualizing Real Time Flight Path 


## Abstract
In this project we aim to create an interactive flight map using real-time flight data from ADB-s Exchange. A interactive WebGL Globe will be a used for the geographic data visualization. The user will be able to enter a source and a destination city and the flight map for the specific route will be rendered along with all the flights on that route. Real time data and rendering of the flight path will mimic the experience of passengers on planes. We will be using three.js and D3.js for the visualizations. 
 
## Objectives
* Learn how to develop web graphics using three.js
* Learn how to perform creative data visualization using D3.js.
* Build an interactive visualization of our selected data set. 
* Apply the design patterns learnt in class in the web project.
 
## Implementation Plan
Javascript will be used for the implementation of the web-application and the three.js library for 3-D graphics. The latitude, longitude and the altitude data will be used to trace a 3-D flight path over the globe. We shall limit the number of flight paths between two cities to avoid clutter. The 3-D flight path will be developed using three.js. 
The text boxes would allow the user to specify the source and the destination cities. The filters would allow user the select the number of flights they wanna see between the cities.  Using the flight data we will also display the cities on the globe, which have the highest air-traffic, based just on our dataset. 
We also aim to add more visualizations for other attributes in our dataset, once we have the above features working. If three.js becomes infeasible, we will use D3 for creating a 2-D visualization of the flight path on a world map.

