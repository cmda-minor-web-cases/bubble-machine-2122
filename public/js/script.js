import update from './D3-graph.js'
import { nextStep, autoPlay, makeSession, resetSession } from './graphButtons.js'
console.log(document.querySelector('header'))

const sessionID = 1
const menuButton = document.getElementById('menuButton')
const menu = document.querySelector('header nav')

const resetBtn = document.querySelector('#resetSimulation')
const nextBtn = document.querySelector('#nextStep')
const sessionBtn = document.querySelector('#makeSession')
const autoBtn = document.querySelector('#autoPlay')


const openMenu = () => {
    menu.classList.toggle('open')
}

menuButton.addEventListener('click', openMenu)


export const fetchAPI = async (method, url) => {
  if (method === 'PUT' || method === 'POST') {
    fetch(url, {
      method: `${method}`
    })
  } else {
    const response = await fetch(url, {
      method: `${method}`,
      mode: 'cors'
    })
    const data = response.json()
    return data
  }
}

// Initial display of graph
const data = await fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
console.log(await data)
update(await data)


// Buttons

nextBtn.addEventListener('click', nextStep)
resetBtn.addEventListener('click', resetSession)
sessionBtn.addEventListener('click', makeSession)
autoBtn.addEventListener('click', autoPlay)


// When clicking on zoomIn button change viewBox to zoom
document.querySelector("#zoomIn").addEventListener('click', (e) => {
  console.log("test");
    document.querySelector("svg").setAttribute("viewBox", "-0.5 -0.5  1 1"); 
  }, false);
  
  // When clicking on zoomOut button change viewBox to zoom
document.querySelector("#zoomOut").addEventListener('click', (e) => {
    document.querySelector("svg").setAttribute("viewBox", "-1 -1  2 2");
}, false);