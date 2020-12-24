import apiUrl from '../apiConfig'
import axios from 'axios'

export const createComment = (user, comment) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/comments/',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { comment }
  })
}
