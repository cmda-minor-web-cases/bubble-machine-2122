
import updateGraph from './D3-graph.js'
import { fetchDataFromAPI } from './modules/apiData.js'
import { createSession } from './modules/createSession.js'
import { resetSession } from './modules/resetSession.js'
import { nextStep } from './modules/updateSession.js'
// console.log(document.querySelector('header'))

const sessionID = 1
const menuButton = document.getElementById('menuButton')
const menu = document.querySelector('section')
const parameterButtons = document.querySelectorAll('section ul li')
const accordionButton =  document.querySelectorAll('section ul li img')


const resetBtn = document.querySelector('#resetSimulation')
const nextBtn = document.querySelector('#nextStep')
const sessionBtn = document.querySelector('#makeSession')
// const autoBtn = document.querySelector('#autoPlay')



  parameterButtons.forEach(accordion => {
    accordion.addEventListener('click', () => 
     accordion.classList.toggle('open-menu'));
     accordionButton.currentSrc = 'img/arrow-up.png';
  });

const openMenu = () => {
    menu.classList.toggle('open')
    //arrowImg.src = "img/arrowleft.png"

}

menuButton.addEventListener('click', openMenu)




// Initial display of graph
const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
// console.log(await data)
updateGraph(await data)


// Buttons

nextBtn.addEventListener('click', nextStep)
resetBtn.addEventListener('click', resetSession)
// sessionBtn.addEventListener('click', createSession)
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


  // console.log(data.links[0]);
  // console.log(data.links[0]["source"]);
  // console.log(data.links[0]["target"]);


console.log(data);


