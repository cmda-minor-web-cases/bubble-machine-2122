import updateGraph from './D3-graph.js'
import { nextStep,  makeSession, resetSession } from './graphButtons.js'
console.log(document.querySelector('header'))

const sessionID = 3
const menuButton = document.getElementById('menuButton')
const menu = document.querySelector('header nav')

const resetBtn = document.querySelector('#resetSimulation')
const nextBtn = document.querySelector('#nextStep')
const sessionBtn = document.querySelector('#makeSession')
// const autoBtn = document.querySelector('#autoPlay')


const arrowImg = document.getElementById('#menuButton')
const openMenu = () => {
    menu.classList.toggle('open')
    arrowImg.src = "img/arrowleft.png"
}

menuButton.addEventListener('click', openMenu)




// Initial display of graph
const data = await fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
console.log(await data)
updateGraph(await data)


// Buttons

nextBtn.addEventListener('click', nextStep)
resetBtn.addEventListener('click', resetSession)
sessionBtn.addEventListener('click', makeSession)
// autoBtn.addEventListener('click', autoPlay)




  // https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/



// When clicking on zoomIn button change viewBox to zoom
document.querySelector("#zoomIn").addEventListener('click', (e) => {
  console.log("test");
    document.querySelector("#mysvg").setAttribute("viewBox", "-0.5 -0.5  1 1"); 
  }, false);
  
  // When clicking on zoomOut button change viewBox to zoom
  document.querySelector("#zoomOut").addEventListener('click', (e) => {
    document.querySelector("#mysvg").setAttribute("viewBox", "-1 -1  2 2");
  }, false);


  // localstorage y1 en x1 ophalen van de client
  // label: "person"
  // x: 0.797451970717726
  // y: 0.6517441909029593
