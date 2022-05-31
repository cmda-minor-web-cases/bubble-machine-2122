import update from './D3-graph.js'

const menuButton = document.getElementById('menuButton')
const menu = document.querySelector('header nav')
const svg = document.querySelector('svg')

const openMenu = () => {
    menu.classList.toggle('open')
}

menuButton.addEventListener('click', openMenu)

// body.addEventListener("mouseover", function( event ) {
//   // highlight the mouseover target
//   menu.style = { background: "#444"};
//   // console.log(event.target)
// })

const httpPost = (method,post) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( method, post, false ); // false for synchronous request
  xmlHttp.send( null );
}

const nextStep = () => {
  httpPost("POST","https://bubble-machine-api-dummy.herokuapp.com/rest/session/1/step");
  location.reload();
}

document.querySelector("#nextStep").addEventListener('click', nextStep)

document.querySelector("#resetSimulation").addEventListener('click', (e) => {
  httpPost("PUT","https://bubble-machine-api-dummy.herokuapp.com/rest/session/1/reset");
  location.reload();
}, false);

const httpGet =() => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "https://bubble-machine-api-dummy.herokuapp.com/rest/session/1", false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

const session = JSON.parse(httpGet());
console.log(session)

// Create Graph
update( await session)


// click a circle
svg.addEventListener('click', function(e) {
  var t = e.target;
  if (t.nodeName != 'circle') return;
  t.classList.add("test");
  console.log(t.getBoundingClientRect());
}, false);



// https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/


// When clicking on zoomIn button change viewBox to zoom
document.querySelector("#zoomIn").addEventListener('click', (e) => {
  console.log("test");
    document.querySelector("svg").setAttribute("viewBox", "-0.5 -0.5  1 1"); 
  }, false);
  
  // When clicking on zoomOut button change viewBox to zoom
document.querySelector("#zoomOut").addEventListener('click', (e) => {
    document.querySelector("svg").setAttribute("viewBox", "-1 -1  2 2");
}, false);