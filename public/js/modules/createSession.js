import updateGraph from "../D3-graph.js"
import { fetchDataFromAPI } from "./apiData.js"



export const createSession = async (sessionID) => {
  fetchDataFromAPI('POST', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session')
  const data = fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
  updateGraph(await data)
}
