import { fetchAPI } from './script.js'

export const deleteSession = async (sessionID) => {
  fetchAPI('DELETE', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
}
