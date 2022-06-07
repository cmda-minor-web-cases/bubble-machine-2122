const width = window.innerWidth
const height = window.innerHeight
const size = 5

// Create the svg in the body
const svg = d3.select('figure').append('svg')
.attr('width', width)
.attr('height', height)


// Scale
const xScale = d3.scaleLinear().range([0, width])
const yScale = d3.scaleLinear().range([0, height])


const update = async (data) => {
  // console.log(data)
  const nodes = data.nodes
  const links = data.links

  xScale.domain([d3.min(nodes, (d) => d.x), d3.max(nodes, (d) => d.x)])
  yScale.domain([d3.min(nodes, (d) => d.y), d3.max(nodes, (d) => d.y)])

  // const link = d3.linkHorizontal().data(links)
  // .source( d => d.source )
  // .target( d => d.target );

  const circle = svg.selectAll('circle').data(nodes).join(
    (enter) => {
      enter = enter.append('circle')
        .attr('r', `${size}px`)
      return enter
    },
    (update) => update,
    (exit) => exit.remove()
  )

  circle
    .transition()
    .attr('cx', (nodes) => xScale(nodes.x))
    .attr('cy', (nodes) => yScale(nodes.y))
    .attr('class', (nodes) => nodes.label )
}

export default update


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


  