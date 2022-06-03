import updateGraph from '../D3-graph.js'
import { fetchDataFromAPI } from './apiData.js'


export const resetSession = async (sessionID) => {
  fetchDataFromAPI('PUT', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/reset`)
  const data = fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
  updateGraph(await data)
}
