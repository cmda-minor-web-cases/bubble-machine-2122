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
  // console.log(data)
  const nodes = data.nodes
  const links = data.links

  xScale.domain([d3.min(nodes, (d) => d.x), d3.max(nodes, (d) => d.x)])
  yScale.domain([d3.min(nodes, (d) => d.y), d3.max(nodes, (d) => d.y)])

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