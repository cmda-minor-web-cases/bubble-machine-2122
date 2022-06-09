const width = window.innerWidth
const height = window.innerHeight
const margin = { width: (0.1 * width), height: (0.1 * height) }
const size = 10

// Create the svg in the body
const svg = d3.select('#graph').append('svg')
.attr('width', width)
.attr('height', height)

// Scale
const xScale = d3.scaleLinear().range([0 + margin.width, width - margin.width])
const yScale = d3.scaleLinear().range([0 + margin.height, height - margin.height])


const updateGraph = async (data) => {
  const nodes = data.nodes
  const links = data.links

  // const linkGen = d3.linkRadial()

  xScale.domain([d3.min(nodes, (d) => d.x), d3.max(nodes, (d) => d.x)])
  yScale.domain([d3.min(nodes, (d) => d.y), d3.max(nodes, (d) => d.y)])

  const circle = svg.selectAll('circle').data(nodes).join(
    (enter) => {
      enter = enter.append('circle')
      return enter
    },
    (update) => update,
    (exit) => exit.remove()
  )

  const path = svg.selectAll('path')

  circle
    .transition()
    // .attr('cx', (nodes) =>  {
    //   if (nodes.label === 'person' && checkbox.checked === true){
    //     return xScale(nodes.innate_x)
    //   } else {
    //     return xScale(nodes.x)
    //   }}
    // )
    // .attr('cy', (nodes) =>  {
    //   if (nodes.label === 'person' && checkbox.checked === true){
    //     return xScale(nodes.innate_y)
    //   } else {
    //     return xScale(nodes.y)
    //   }}
    // )
    .attr('cx', (nodes) => xScale(nodes.x))
    .attr('cy', (nodes) => yScale(nodes.y))
    .attr('r', (nodes) => {
      if (nodes.label === 'person') {
        return '15px'
      } else {
        return '5px'
      }
    })
    .attr('class', (nodes) => nodes.label )
  
  path
    .transition()
    .attr('fill', 'none')
    .attr('class', (links) => links.label )
}

export default updateGraph




// let test = [{name: 'friends',values: [{time: '1', value: 0.0001134320624809813}, {time: '2', value: 0.0001934320624809813}]},{name: 'users and items', values: []},{name: 'sharers',values: []}];


// localStorage.setItem("LinkDistanceFriends", JSON.stringify(test));










// // Graph2
// // bron: https://d3-graph-gallery.com/graph/connectedscatter_multi.html

// const margin2 = {top: 10, right: 100, bottom: 30, left: 30},
//     width2 = 460 - margin.left - margin.right,
//     height2 = 400 - margin.top - margin.bottom;


// // append the svg object to the body of the page
// const svg2 = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", "100%")
//     .attr("height", "100%")
//   .append("g")
//     .attr("transform",`translate(${margin2.left},${margin2.top})`);



//     // List of groups (here I have one group per column)
//     const allGroup = ["friends", "users and items", "sharers"]

//     const dataReady = JSON.parse(localStorage.getItem("LinkDistanceFriends"))

//     // console.log(test);

//     // A color scale: one color for each group
//     const myColor = d3.scaleOrdinal()
//       .domain(allGroup)
//       .range(d3.schemeSet2);

//     // Add X axis --> it is a date format
//     const LinkDistanceFriends = JSON.parse(localStorage.getItem("LinkDistanceFriends"));
//     const x = d3.scaleLinear()

//   //   xScale.domain([d3.min(nodes, (d) => d.x), d3.max(nodes, (d) => d.x)])
//   // yScale.domain([d3.min(nodes, (d) => d.y), d3.max(nodes, (d) => d.y)])


//       .domain([d3.min(dataReady[0]["values"], (d) => d.time),d3.max(dataReady[0]["values"], (d) => d.time)])
//       .range([0, width])
//     svg2.append("g")
//       // .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(x));


//     // Add Y axis
//     const y = d3.scaleLinear()
//       // .domain([d3.min( data.nodes, (data) => data.friends), d3.max(data.nodes, (data) => data.friends)])
//       .domain( [d3.min(dataReady[0]["values"], (d) => d.value), d3.max(dataReady[0]["values"], (d) => d.value)])
//       .range([ height, 0 ]);
//     svg2.append("g")
//       .call(d3.axisLeft(y));

//     // Add the lines
//     const line = d3.line()
//       .x(d => x(+d.time))
//       .y(d => y(+d.value))
//     svg2.selectAll("myLines")
//       .data(dataReady)
//       .join("path")
//         .attr("d", d => line(d.values))
//         .attr("stroke", d => myColor(d.name))
//         .style("stroke-width", 4)
//         .style("fill", "none")

//     // Add the points
//     svg2
//       // First we need to enter in a group
//       .selectAll("myDots")
//       .data(dataReady)
//       .join('g')
//         .style("fill", d => myColor(d.name))
//       // Second we need to enter in the 'values' part of this group
//       .selectAll("myPoints")
//       .data(d => d.values)
//       .join("circle")
//         .attr("cx", d => x(d.time))
//         .attr("cy", d => y(d.value))
//         .attr("r", 5)
//         .attr("stroke", "white")

//         console.log(dataReady);
//     // Add a legend at the end of each line
//     svg2
//       .selectAll("myLabels")
//       .data(dataReady)
//       .join('g')
//         .append("text")
//           .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
//           // .attr("transform",d => `translate(${x(d.value.time)},${y(d.value.value)})`) // Put the text at the position of the last point
//           .attr("x", 12) // shift the text a bit more right
//           .text(d => d.name)
//           .style("fill", d => myColor(d.name))
//           .style("font-size", 15)

