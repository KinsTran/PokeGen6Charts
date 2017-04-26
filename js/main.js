"use strict"
$(function() {
    d3.csv("data/consolidated_pokemon_types.csv", function(error, data) {
        // Create all variables which are not recreated
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
            scaleWeight = false, // Whether to scale by weight or height, dictated by buttons, false at first
            scaleHeight = false; 
    
        // Create wrapper div for chart
        var div = d3.select("#viz")
            .append("div")
            .attr('height', height)
            .attr('width', width)
            .style("left", margin.left + "px")
            .style("top", margin.top + "px");

        // Nest data by type(Some Pokemon are in two nested areas due to having two types)
        var nestedData = d3.nest()
            .key(function(d) {
                return d.type_name;
            })
            .entries(data);


        // Define hierarchy, setting root
        var root = d3.hierarchy({
            values: nestedData
        }, function(d) {
            return d.values;
        });

        // Create treemap
        var treemap = d3.treemap() 
            .size([width, height]) 
            .round(true)
            .tile(d3.treemapResquarify)
            .padding(0);

        // Get type list, set color scale
        var types = nestedData.map(function(d) {
            return d.key;
        })
        // Color types assigned here, since they are put in the hierarchy in a certain order, and there's no natural way to order them
        var typeColors = ["#78C850", "#A040A0", "#F08030", "#A890F0", "#6890F0", "#A8B820", "#C6C6A7", "#F8D030", "#E0C068", "#EE99AC", "#C03028", "#F85888","#B8A038", "#B8B8D0", "#98D8D8", "#705898", "#7038F8", "#705848"]
        var colorScale = d3.scaleOrdinal().domain(types).range(typeColors)

        // Reusable draw function which binds data, positions elements
        var draw = function() {
            // Determines how to scale rectangles
            root.sum(function(d) {
                if(scaleWeight && scaleHeight) {
                    return +d["height"] + d["weight"]
                } else if (scaleWeight) {
                    return +d["weight"]
                } else if (scaleHeight) {
                    return +d["height"]
                } else {
                    return +d["noMeasure"] // Arbitrary column inserted to ensure I could make all nodes same size
                }
            })   

            // Construct treemap
            treemap(root)

            // Bind, enter, update, and delete data
            var nodes = div.data(root.leaves())
            nodes.enter() // NEED TO ADD HOVER TO MAKE THEIR TEXT
                .append("div")
                .merge(nodes)
                .attr("class", "node")
                .transition().duration(1500)
                .style("left", function(d, i) {
                    return d.x0 + "px";
                })
                .style("top", function(d) {
                    return d.y0 + "px";
                })
                .style('width', function(d) {
                    return d.x1 - d.x0 + 'px';
                })
                .style("height", function(d) {
                    return d.y1 - d.y0 + "px";
                })
                .style("background", function(d, i) {
                    return colorScale(d.data.type_name);
                });
        }
        // First draw on load
        draw();

        // On change event which redraws elements
        $("input").on("change", function() {
            // Changes colorscale if needed, sets if height/weight scaling are required

            // Draw again
            draw();
        })
    });
})