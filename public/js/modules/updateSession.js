import { fetchAPI } from './script.js'
import updateGraph from './D3-graph.js'

export const nextStep = async (sessionID) => {
  fetchAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
  const data = await fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
  updateGraph(await data)
}
