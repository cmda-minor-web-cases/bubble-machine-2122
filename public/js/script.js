
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



  // get distance of items using pythagoras theorem

  function pythagorasTheorem(label){

    // average distance
    let distance = 0;

    let itemAmount = 0;

    data.links.forEach(link => {
      if(link["label"] != label) {
        return;
      }

      // fix error 2785 undefined
      if(data.nodes[link["target"]] == undefined){
        return;
      }
      
      // friend 1 x and y points
      const x1 = data.nodes[link["source"]]["x"];
      const y1 = data.nodes[link["source"]]["y"];

      // friend 2 x and y points
      const x2 = data.nodes[link["target"]]["x"];
      const y2 = data.nodes[link["target"]]["y"];

      // pythagorasTheorem formula 
      const a = x1 - x2;
      const b = y1 - y2;

      const c = Math.sqrt( a*a + b*b );

      // Add distance to average distance
      distance = distance = c;
      itemAmount++;

    })

    return distance/itemAmount;

}

const step = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`);


localStorage.setItem("friend"+step, pythagorasTheorem("friend"));
localStorage.setItem("itemlink"+step, pythagorasTheorem("itemlink"));
localStorage.setItem("infolink"+step, pythagorasTheorem("infolink"));


// console.log(localStorage.getItem("friend"+step));
// console.log(localStorage.getItem("friend"+step));
// console.log(localStorage.getItem("friend"+step));



let LinkDistanceFriends = [{name: 'friends',values: [{time: '1', value: 0.0001134320624809813}, {time: '2', value: 0.0001934320624809813}]},{name: 'users and items', values: []},{name: 'sharers',values: []}];
LinkDistanceFriends = JSON.parse(localStorage.getItem("LinkDistanceFriends"));
LinkDistanceFriends[0]["values"].push({time: `${step["step"]}`, value: pythagorasTheorem("friend")});

localStorage.setItem("LinkDistanceFriends", JSON.stringify(LinkDistanceFriends));

console.log(JSON.parse(localStorage.getItem("LinkDistanceFriends")));
