import { fetchDataFromAPI } from './modules/apiData.js'
const sessionID = 1
const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);


  // get distance of items using pythagoras theorem

  function pythagorasTheorem(label){

    // average distance
    let distance = 0;

    let itemAmount = 0;

    data.links.forEach(link => {
      if(link["label"] != label) {
        return;
      }

      // fix error 2785 undefined
      if(data.nodes[link["target"]] == undefined){
        return;
      }
      
      // friend 1 x and y points
      const x1 = data.nodes[link["source"]]["x"];
      const y1 = data.nodes[link["source"]]["y"];

      // friend 2 x and y points
      const x2 = data.nodes[link["target"]]["x"];
      const y2 = data.nodes[link["target"]]["y"];

      // pythagorasTheorem formula 
      const a = x1 - x2;
      const b = y1 - y2;

      const c = Math.sqrt( a*a + b*b );

      // Add distance to average distance
      distance = distance = c;
      itemAmount++;

    })

    return distance/itemAmount;

}

const step = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`);


localStorage.setItem("friend"+step, pythagorasTheorem("friend"));
localStorage.setItem("itemlink"+step, pythagorasTheorem("itemlink"));
localStorage.setItem("infolink"+step, pythagorasTheorem("infolink"));


let LinkDistanceFriends = JSON.parse(localStorage.getItem("LinkDistanceFriends"));

if (LinkDistanceFriends == null){
  LinkDistanceFriends = [{name: 'friends',values: []},{name: 'users and items', values: []},{name: 'sharers',values: []}];

}
// console.log(LinkDistanceFriends);
LinkDistanceFriends[0]["values"].push({time: `${step["step"]}`, value: pythagorasTheorem("friend")});
LinkDistanceFriends[1]["values"].push({time: `${step["step"]}`, value: pythagorasTheorem("itemlink")});
LinkDistanceFriends[2]["values"].push({time: `${step["step"]}`, value: pythagorasTheorem("infolink")});

localStorage.setItem("LinkDistanceFriends", JSON.stringify(LinkDistanceFriends));


// Graph2
// bron: https://d3-graph-gallery.com/graph/connectedscatter_multi.html\
const width = window.innerWidth
const height = window.innerHeight
const margin = { width: (0.1 * width), height: (0.1 * height) }
const margin2 = {top: 10, right: 100, bottom: 30, left: 30},
    width2 = 460 - margin.left - margin.right,
    height2 = 400 - margin.top - margin.bottom;


// append the svg object to the body of the page
const svg2 = d3.select("#my_dataviz")
  .append("svg")
    .attr('width', width)
  .attr('height', height/3)
  .append("g")
    .attr("transform",`translate(${margin2.left},${margin2.top})`);



    // List of groups (here I have one group per column)
    const allGroup = ["friends", "users and items", "sharers"]

    const dataReady = JSON.parse(localStorage.getItem("LinkDistanceFriends"))

    // console.log(test);


    // A color scale: one color for each group
    const myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

      const numm1 = d3.max(dataReady[0]["values"], (d) => d.time);
      const numm2 = d3.max(dataReady[1]["values"], (d) => d.time);
      const numm3 = d3.max(dataReady[2]["values"], (d) => d.time);
      const numm1min = d3.min(dataReady[0]["values"], (d) => d.time);
      const numm2min = d3.min(dataReady[1]["values"], (d) => d.time);
      const numm3min = d3.min(dataReady[2]["values"], (d) => d.time);
      let largest2 = Math.max(numm1, numm2, numm3);
      let smalest2 = Math.min(numm1min, numm2min, numm3min);

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
      .domain([smalest2, largest2])
      .range([0 , width - margin.width])
    svg2.append("g")
      // .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));


      const num1 = d3.max(dataReady[0]["values"], (d) => d.value);
      const num2 = d3.max(dataReady[1]["values"], (d) => d.value);
      const num3 = d3.max(dataReady[2]["values"], (d) => d.value);
      const num1min = d3.min(dataReady[0]["values"], (d) => d.value);
      const num2min = d3.min(dataReady[1]["values"], (d) => d.value);
      const num3min = d3.min(dataReady[2]["values"], (d) => d.value);
      let largest = Math.max(num1, num2, num3);
      let smalest = Math.min(num1min, num2min, num3min);


    // Add Y axis
    const y = d3.scaleLinear()
      // .domain([d3.min( data.nodes, (data) => data.friends), d3.max(data.nodes, (data) => data.friends)])
      .domain( [smalest, largest])
      .range([ height/3 - 30, 0  ]);
    svg2.append("g")
      .call(d3.axisLeft(y));

    // Add the lines
    const line = d3.line()
      .x(d => x(+d.time))
      .y(d => y(+d.value))
    svg2.selectAll("myLines")
      .data(dataReady)
      .join("path")
        .attr("d", d => line(d.values))
        .attr("stroke", d => myColor(d.name))
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    svg2
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .join('g')
        .style("fill", d => myColor(d.name))
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(d => d.values)
      .join("circle")
        .attr("cx", d => x(d.time))
        .attr("cy", d => y(d.value))
        .attr("r", 5)
        .attr("stroke", "white")

    // Add a legend at the end of each line
    svg2
      .selectAll("myLabels")
      .data(dataReady)
      .join('g')
        .append("text")
          .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform",d => `translate(${x(d.value.time)},${y(d.value.value)})`) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(d => d.name)
          .style("fill", d => myColor(d.name))
          .style("font-size", 15)




// When clicking on zoomIn button change viewBox to zoom
document.querySelector("#my_dataviz svg").addEventListener('click', (e) => {
  document.querySelector("#my_dataviz svg").classList.toggle("showDistance");
  }, false);

  // When clicking on zoomIn button change viewBox to zoom
document.querySelector("#distance").addEventListener('click', (e) => {
  document.querySelector("#my_dataviz svg").classList.toggle("showDistance");
  }, false);