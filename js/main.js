$(function() {
    d3.csv("consolidated_pokemon_types.csv", function(error, data) {
        // Create all 
        var margin = {
            top: 40,
            right: 10,
            bottom: 10,
            left: 10
        },
        width = 960,
        height = 500,
        drawWidth = width - margin.left - margin.right,
        drawHeight = height - margin.top - margin.bottom,
        measure = "type"; // variable to visualize, will do type, height, weight
    })

    var svg = d3.select("#viz").attr("width", width).attr("height", height);
    var g = svg.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    
})