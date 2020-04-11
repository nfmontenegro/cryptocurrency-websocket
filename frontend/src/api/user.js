import {API} from '../utils'

const requestAPI = async (url, method, data) =>
  await API({
    url,
    method,
    data
  })

export default requestAPI
