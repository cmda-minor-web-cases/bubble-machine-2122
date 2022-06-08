const width = window.innerWidth
const height = window.innerHeight
const margin = {width: (0.1 * width), height:(0.1 * height)}


d3.select('#graph')
  .append('canvas')
  .attr('width', width)
  .attr('height', height)

const canvas = d3.select('canvas')
const ctx = canvas.node().getContext('2d')

const detachedContainer = document.createElement('custom')
const dataContainer = d3.select(detachedContainer)

const xScale = d3.scaleLinear().range([0 + margin.width, width - margin.width])
const yScale = d3.scaleLinear().range([0 + margin.height, height - margin.height])

const update =  async (data) => {
  console.log(data)
  xScale.domain([d3.min(data.nodes, (d) => d.x), d3.max(data.nodes, (d) => d.x)])
  yScale.domain([d3.min(data.nodes, (d) => d.y), d3.max(data.nodes, (d) => d.y)])

  ctx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'))

  await data.nodes.forEach(drawNode)
  await data.links.forEach(drawLink)
}

const drawNode = async (d) => {
  const x = xScale(d.x)
  const y = yScale(d.y)
  const color = (label) => {
    if (label === 'person'){
      return '#348b90b0'
    } else {
      return '#dc143cbe'
    }
  }
  const r = (label) => {
    if (label === 'person'){
      return 15
    } else {
      return 5
    }
  }

  ctx.moveTo(x,y)
  ctx.beginPath()
  ctx.arc(x,y, r(d.label), 0, Math.PI*2)
  ctx.fillStyle = color(d.label)
  ctx.fill()
}

const drawLink = (l) => {
  ctx.moveTo(l.source.x, l.source.y)
  ctx.beginPath()
  ctx.lineTo(l.target.x, l.target.y)
  ctx.stroke()
}

// const simulation = d3.forceSimulation().on('tick', update)

export default update