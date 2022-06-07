
import updateGraph from '../D3-graph.js'
import { fetchDataFromAPI } from './apiData.js'

const sessionID = 1
export const nextStep = async () => {
  fetchDataFromAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
  const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
  updateGraph(await data)
}
