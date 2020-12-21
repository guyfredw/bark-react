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

export const showPost = (user, postId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/' + postId,
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const deletePost = (user, postId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/posts/' + postId,
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
