export const fetchDataFromAPI = async (method, url) => {
  if (method === 'PUT' || method === 'POST') {
    fetch(url, {
      method: `${method}`
    })
  } else {
    const response = await fetch(url, {
      method: `${method}`,
      mode: 'cors'
    })
    const data = response.json()
    return data
  }
}
