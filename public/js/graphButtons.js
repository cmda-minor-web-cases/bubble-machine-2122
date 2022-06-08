import update from './D3-canvas.js'
// import update from './D3-graph.js'
import { fetchAPI } from './script.js'

const sessionID = 1
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const nextStep = async () => {
  fetchAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
  const data = await fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
  update(await data)
}

export const resetSession = async () => {
  fetchAPI('PUT', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/reset`)
  const data = fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
  update(await data)
}

export const makeSession = async () => {
  fetchAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session`)
  const data = fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
  update(await data)
}

export const autoPlay = async () => {
  for (let i = 0; i <= 100; i++) {
    fetchAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
    const data = await fetchAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`);
    update(await data)
    await wait(1000)
  }
}

