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


// //get svg element.
// var svg = document.querySelector("#graph svg");

// //get svg source.
// var serializer = new XMLSerializer();
// var source = serializer.serializeToString(svg);

// //add name spaces.
// if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
//     source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
// }
// if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
//     source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
// }

// //add xml declaration
// source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

// //convert svg source to URI data scheme.
// var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);


// console.log("test");
// //set url value to a element's href attribute.
// document.getElementById("link").href = url;
// //you can download svg file by right click menu.