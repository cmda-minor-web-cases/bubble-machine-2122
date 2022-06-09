
import updateGraph from '../D3-graph.js'
import { fetchDataFromAPI } from './apiData.js'

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let play = false

export const autoPlay = async (sessionID) => {
  document.querySelector("#autoPlay").classList.toggle("autoRunning");
  let text = document.querySelector("#autoPlay").innerHTML;
  if (text === "Auto play start") {
    document.querySelector("#autoPlay").innerHTML = "Auto play pauze";
  } else {
    document.querySelector("#autoPlay").innerHTML = "Auto play start";

  }
  const counter = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
  play = !play
    for (let i = await counter.step; i <= 100; i++) {
      while(play === true) {
        fetchDataFromAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
        const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
        updateGraph(await data)
        await wait(1000)
      }
    }
}
