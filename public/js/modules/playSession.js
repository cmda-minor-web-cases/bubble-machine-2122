
import updateGraph from '../D3-graph.js'
import { fetchDataFromAPI } from './apiData.js'

const sessionID = 1
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const autoPlay = async () => {
  for (let i = 0; i <= 100; i++) {
    fetchDataFromAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
    const data = await fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
    updateGraph(await data)
    await wait(1000)
  }
}