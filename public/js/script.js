import update from './D3-graph.js'

const menuButton = document.getElementById('menuButton')
const menu = document.querySelector('header nav')
// const svg = document.querySelector('svg')
const resetBtn = document.querySelector('#resetSimulation')
const nextBtn = document.querySelector('#nextStep')


const openMenu = () => {
    menu.classList.toggle('open')
}

menuButton.addEventListener('click', openMenu)


const fetchAPI = async (method, url) => {
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
const data = await fetchAPI('GET', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session/1');
update(await data)


// Updating graph
const nextStep = async () => {
  fetchAPI('POST', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session/1/step')
  const data = await fetchAPI('GET', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session/1');
  update(await data)
}

const resetSession = async () => {
  fetchAPI('PUT', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session/1/reset')
  const data = fetchAPI('GET', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session/1');
  update(await data)
}






// https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/


// Buttons

nextBtn.addEventListener('click', nextStep)
resetBtn.addEventListener('click', resetSession)


// When clicking on zoomIn button change viewBox to zoom
document.querySelector("#zoomIn").addEventListener('click', (e) => {
  console.log("test");
    document.querySelector("svg").setAttribute("viewBox", "-0.5 -0.5  1 1"); 
  }, false);
  
  // When clicking on zoomOut button change viewBox to zoom
document.querySelector("#zoomOut").addEventListener('click', (e) => {
    document.querySelector("svg").setAttribute("viewBox", "-1 -1  2 2");
}, false);