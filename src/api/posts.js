import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexPosts = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
