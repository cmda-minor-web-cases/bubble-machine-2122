const width = window.innerWidth
const height = window.innerHeight
const margin = {width: (0.1 * width), height:(0.1 * height)}
const size = 10

// Create the svg in the body
const svg = d3.select('figure').append('svg')
.attr('width', width)
.attr('height', height)


// Scale
const xScale = d3.scaleLinear().range([0 + margin.width, width - margin.width])
const yScale = d3.scaleLinear().range([0 + margin.height, height - margin.height])


const update = async (data) => {
  console.log(data)
  const nodes = data.nodes
  const links = data.links

  // const linkGen = d3.linkRadial()

  xScale.domain([d3.min(nodes, (d) => d.x), d3.max(nodes, (d) => d.x)])
  yScale.domain([d3.min(nodes, (d) => d.y), d3.max(nodes, (d) => d.y)])

  // const path = svg.selectAll('path').data(links).join(
  //   (enter) => {
  //     enter = enter.append('path')
  //       .attr('d', linkGen)
  //     return enter
  //   },
  //   (update) => update,
  //   (exit) => exit.remove() 
  // )

  const circle = svg.selectAll('circle').data(nodes).join(
    (enter) => {
      enter = enter.append('circle')
      return enter
    },
    (update) => update,
    (exit) => exit.remove()
  )

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
      if (nodes.label === 'person'){
        return '15px'
      } else {
        return '5px'
      }
    })
    .attr('class', (nodes) => nodes.label )
  
  // path
  //   .transition()
  //   .attr('fill', 'none')
  //   .attr('class', (links) => links.label )
}

export default update