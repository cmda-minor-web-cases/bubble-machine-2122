const menuButton = document.getElementById('menuButton')
const menu = document.querySelector('header nav')
const body = document.querySelector('svg')
const arrowImg = document.getElementById('#menuButton')
const openMenu = () => {
    menu.classList.toggle('open')
    arrowImg.src = "img/arrowleft.png"
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

const
svg = document.getElementById('mysvg'),
NS = svg.getAttribute('xmlns');

const httpGet =() => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "https://bubble-machine-api-dummy.herokuapp.com/rest/session/1", false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

const session = JSON.parse(httpGet());

//console.log(session.links);


const reversNumber = (number) => {
if(number < 0){
  return Math.abs(number);
}
else{
  return Math.abs(number) * -1;
}
}

let i = 0;
let persons = 0;
let items = 0;
const li = document.createElement("li");

for (const item of session["nodes"] ) {
  li.appendChild(document.createTextNode(session["nodes"][i]["id"]+" | "+ session["nodes"][i]["label"]+" | X="+session["nodes"][i]["x"]+" | Y="+session["nodes"][i]["y"]));
  document.querySelector("#listNotes").appendChild(li);
  c = document.createElementNS(NS, 'circle');
  c.setAttribute('id',session["nodes"][i]["id"]);
  if(session["nodes"][i]["label"] == "person"){
      c.classList.add(session["nodes"][i]["label"]+persons);
      c.classList.add(session["nodes"][i]["label"]);
      persons++;
  }
  else{
      c.classList.add(session["nodes"][i]["label"]+items);
      c.classList.add(session["nodes"][i]["label"]);
      items++;
  }
  // c.classList.add(session["nodes"][i]["label"]);
c.setAttributeNS(null, 'cx', session["nodes"][i]["x"]);

// let steps = (session["nodes"][i].x);

// console.log(steps)

// localStorage.setItem('steps',  JSON.stringify(steps));
// // let steps = session["nodes"][i];

// // let saveStep = () => {
// //   steps.forEach(step => {       

// //     localStorage.setItem('person', JSON.stringify(step)) 
// //   });
// // };

// // saveStep();


c.setAttributeNS(null, 'cy',  reversNumber(session["nodes"][i]["y"]));
c.setAttributeNS(null, 'r', 0.012);
svg.appendChild(c);
  i++;
}

for (const item of session["links"] ) {
  li.appendChild(document.createTextNode(session["links"][i]["label"]+" - "+session["links"][i]["source"]+" - "+session["links"][i]["target"]));
  document.querySelector("#listDocuments").appendChild(li);
  const newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
// newLine.setAttribute('id','line2');



switch (session["links"][i]["label"]) {
  case 'friend':
      newLine.setAttribute('x1',`${document.querySelector(".person"+session["links"][i]["source"]).cx.baseVal.value}`);
      newLine.setAttribute('y1',`${document.querySelector(".person"+session["links"][i]["source"]).cy.baseVal.value}`);
      newLine.setAttribute('x2',`${document.querySelector(".person"+session["links"][i]["target"]).cx.baseVal.value}`);
      newLine.setAttribute('y2',`${document.querySelector(".person"+session["links"][i]["target"]).cy.baseVal.value}`);
      newLine.setAttribute("stroke", "#44444447")
      newLine.setAttribute("stroke-width", "0.005")
      svg.append(newLine);
      i++;
  break;
  case 'infolink':
      if(session["links"][i]["target"] > 9){
          const number = session["links"][i]["target"];
          const arrOfDigits = Array.from(String(number), Number);
          for (const item of arrOfDigits ) {
              newLine.setAttribute('x1',`${document.querySelector(".item"+session["links"][i]["source"]).cx.baseVal.value}`);
              newLine.setAttribute('y1',`${document.querySelector(".item"+session["links"][i]["source"]).cy.baseVal.value}`);
              newLine.setAttribute('x2',`${document.querySelector(".person"+item).cx.baseVal.value}`);
              newLine.setAttribute('y2',`${document.querySelector(".person"+item).cy.baseVal.value}`);
              newLine.setAttribute("stroke", "black")
              newLine.setAttribute("stroke-width", "0.01")
              svg.append(newLine);
           
          }
  
          continue;
      }
      newLine.setAttribute('x1',`${document.querySelector(".item"+session["links"][i]["source"]).cx.baseVal.value}`);
      newLine.setAttribute('y1',`${document.querySelector(".item"+session["links"][i]["source"]).cy.baseVal.value}`);
      newLine.setAttribute('x2',`${document.querySelector(".person"+session["links"][i]["target"]).cx.baseVal.value}`);
      newLine.setAttribute('y2',`${document.querySelector(".person"+session["links"][i]["target"]).cy.baseVal.value}`);
      newLine.setAttribute("stroke", "black")
      newLine.setAttribute("stroke-width", "0.01")
      svg.append(newLine);
      i++;
  break;
  case 'itemlink':
      if(session["links"][i]["target"] > 9){
          const number = session["links"][i]["target"];
          const arrOfDigits = Array.from(String(number), Number);
          for (const item of arrOfDigits ) {
              newLine.setAttribute('x1',`${document.querySelector(".item"+session["links"][i]["source"]).cx.baseVal.value}`);
              newLine.setAttribute('y1',`${document.querySelector(".item"+session["links"][i]["source"]).cy.baseVal.value}`);
              newLine.setAttribute('x2',`${document.querySelector(".person"+item).cx.baseVal.value}`);
              newLine.setAttribute('y2',`${document.querySelector(".person"+item).cy.baseVal.value}`);
              newLine.setAttribute("stroke", "#44444447")
              newLine.setAttribute("stroke-width", "0.006")
              svg.append(newLine);
          }
  
          continue;
      }
      newLine.setAttribute('x1',`${document.querySelector(".item"+session["links"][i]["source"]).cx.baseVal.value}`);
      newLine.setAttribute('y1',`${document.querySelector(".item"+session["links"][i]["source"]).cy.baseVal.value}`);
      newLine.setAttribute('x2',`${document.querySelector(".person"+session["links"][i]["target"]).cx.baseVal.value}`);
      newLine.setAttribute('y2',`${document.querySelector(".person"+session["links"][i]["target"]).cy.baseVal.value}`);
      newLine.setAttribute("stroke", "green")
      newLine.setAttribute("stroke-width", "0.01")
      svg.append(newLine);
      i++;
  break;
}



}

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