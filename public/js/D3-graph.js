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


// Function to download svg image
function downloadSVG(){

// //get svg element.
const svg2 = document.querySelector("svg");

//get svg source.
const serializer = new XMLSerializer();
let source = serializer.serializeToString(svg2);

//add name spaces.
if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
}
if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
}

//add xml declaration
source = '<?xml-stylesheet href="https://bubble-machine.herokuapp.com/css/style.css" version="1.0" standalone="no"?>\r\n' + source;

//convert svg source to URI data scheme.
const url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

// make from button a download svg button
document.getElementById("downloadSVG").setAttribute("href", url);
document.getElementById("downloadSVG").setAttribute("download", "test.svg");

}

// When clicking on downloadSVG button download svg
document.querySelector("#downloadSVG").addEventListener('click', (e) => {
  downloadSVG()
}, false);

// bron https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an


  
