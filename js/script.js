
// API request
const httpPost = (method,post) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( method, post, false ); // false for synchronous request
  xmlHttp.send( null );
}

// When clicking on nextStep button simulatie 1 next step
document.querySelector("#nextStep").addEventListener('click', (e) => {
  httpPost("POST","https://bubble-machine-api-dummy.herokuapp.com/rest/session/1/step");
  location.reload();
}, false);

// When clicking on resetSimulation button reset simulatie 1
document.querySelector("#resetSimulation").addEventListener('click', (e) => {
  httpPost("PUT","https://bubble-machine-api-dummy.herokuapp.com/rest/session/1/reset");
  location.reload();
}, false);

// Variablen svg
const svg = document.getElementById('mysvg');
const NS = svg.getAttribute('xmlns');

// Get API json file
const httpGet =() => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "https://bubble-machine-api-dummy.herokuapp.com/rest/session/1", false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

// Session json return
const session = JSON.parse(httpGet());


// Reverse number
// Example 1 = -1 and -1 = 1
const reversNumber = (number) => {
  if(number < 0){
    return Math.abs(number);
  }
  else{
    return Math.abs(number) * -1;
  }
}

// Variable to create a node
let i = 0;
let persons = 0;
let items = 0;
const li = document.createElement("li");



// Create a node inside the svg
const createNode =() => {
  // Loop through all nodes
  for (const item of session["nodes"] ) {
    li.appendChild(document.createTextNode(session["nodes"][i]["id"]+" | "+ session["nodes"][i]["label"]+" | X="+session["nodes"][i]["x"]+" | Y="+session["nodes"][i]["y"]));
    document.querySelector("#listNotes").appendChild(li);
    c = document.createElementNS(NS, 'circle');
    c.setAttribute('id',session["nodes"][i]["id"]);

    // If node label is person add class person + person number
    if(session["nodes"][i]["label"] == "person"){
        c.classList.add(session["nodes"][i]["label"]+persons);
        c.classList.add(session["nodes"][i]["label"]);
        persons++;
    }
    // If node label is item add class item + item number
    else{
        c.classList.add(session["nodes"][i]["label"]+items);
        c.classList.add(session["nodes"][i]["label"]);
        items++;
    }

    // c.classList.add(session["nodes"][i]["label"]);
    c.setAttributeNS(null, 'cx', session["nodes"][i]["x"]);
    c.setAttributeNS(null, 'cy',  reversNumber(session["nodes"][i]["y"]));
    c.setAttributeNS(null, 'r', 0.04);
    svg.appendChild(c);
    i++;
  }
}

// Place alle nodes inside svg
createNode();

// Draw line from 2 difrent connections
const drawLine =(newLine,connection1,connection2,connection3,connection4,color) => {
  newLine.setAttribute('x1',`${document.querySelector(connection1).cx.baseVal.value}`);
  newLine.setAttribute('y1',`${document.querySelector(connection2).cy.baseVal.value}`);
  newLine.setAttribute('x2',`${document.querySelector(connection3).cx.baseVal.value}`);
  newLine.setAttribute('y2',`${document.querySelector(connection4).cy.baseVal.value}`);
  newLine.setAttribute("stroke", color)
  newLine.setAttribute("stroke-width", "0.01")
  svg.append(newLine);
}

// Draw lines from difrent nodes
const createLinks =() => {
  // Loop through all items and add links
  for (const item of session["links"] ) {
    li.appendChild(document.createTextNode(session["links"][i]["label"]+" - "+session["links"][i]["source"]+" - "+session["links"][i]["target"]));
    document.querySelector("#listDocuments").appendChild(li);
    const newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    const number = session["links"][i]["target"];
    const arrOfDigits = Array.from(String(number), Number);


    switch (session["links"][i]["label"]) {
      // if case friend make friend connection
      case 'friend':
        drawLine(newLine,
          ".person"+session["links"][i]["source"],
          ".person"+session["links"][i]["source"],
          ".person"+session["links"][i]["target"],
          ".person"+session["links"][i]["target"],
          "yellow");
          i++;
      break;
      // if case infolink make infolink connection
      case 'infolink':
          if(session["links"][i]["target"] > 9){
              for (const item of arrOfDigits ) {
                drawLine(newLine,
                  ".item"+session["links"][i]["source"],
                  ".item"+session["links"][i]["source"],
                  ".person"+item,
                  ".person"+item,
                  "black");
              }
      
              continue;
          }
          drawLine(newLine,
            ".item"+session["links"][i]["source"],
            ".item"+session["links"][i]["source"],
            ".person"+session["links"][i]["target"],
            ".person"+session["links"][i]["target"],
            "black");
          i++;
      break;
      // if case itemlink make itemlink connection
      case 'itemlink':
          if(session["links"][i]["target"] > 9){
              for (const item of arrOfDigits ) {
                drawLine(newLine,
                  ".item"+session["links"][i]["source"],
                  ".item"+session["links"][i]["source"],
                  ".person"+item,
                  ".person"+item,
                  "green");
              }
      
              continue;
          }
          drawLine(newLine,
            ".item"+session["links"][i]["source"],
            ".item"+session["links"][i]["source"],
            ".person"+session["links"][i]["target"],
            ".person"+session["links"][i]["target"],
            "green");
          i++;
          break;
      }

  }

}

// Place all lines inside svg
createLinks();


// Bronnen
// https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/



const menuButton = document.getElementById('menuButton')
const menu = document.querySelector('header nav')
const openMenu = () => {
    menu.classList.toggle('open')
}

menuButton.addEventListener('click', openMenu)

