import updateGraph from './D3-graph.js'
import { fetchAPI } from './script.js'

export const resetSession = async (sessionID) => {
  fetchAPI('PUT', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/reset`)
  const data = fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
  updateGraph(await data)
}
