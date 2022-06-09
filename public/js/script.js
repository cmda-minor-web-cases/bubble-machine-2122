
import updateGraph from './D3-graph.js'
import { fetchDataFromAPI } from './modules/apiData.js'
import { createSession } from './modules/createSession.js'
import { resetSession } from './modules/resetSession.js'
import { nextStep } from './modules/updateSession.js'
import { autoPlay } from './modules/playSession.js'
// console.log(document.querySelector('header'))

const sessionID = 1

const menuButton = document.getElementById('menuButton')
const menu = document.querySelector('section')
const parameterButtons = document.querySelectorAll('section ul li')
const accordionButton =  document.querySelectorAll('section ul li img')


const resetBtn = document.querySelector('#resetSimulation')
const nextBtn = document.querySelector('#nextStep')
// const sessionBtn = document.querySelector('#makeSession')
const autoBtn = document.querySelector('#autoPlay')



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


nextBtn.addEventListener('click', () => nextStep(sessionID))
resetBtn.addEventListener('click', () => resetSession(sessionID))
// sessionBtn.addEventListener('click', createSession)
autoBtn.addEventListener('click', () => autoPlay(sessionID))



  // https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/


