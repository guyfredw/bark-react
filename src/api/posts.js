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

export const createPost = (user, post) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts/',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { post }
  })
}

export const updatePost = (user, post, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/posts/' + id,
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { post }
  })
}

// Unauthenticated requests
export const indexPostsUA = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/all-posts/'
  })
}

export const showPostUA = (postId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/show-post/' + postId
  })
}
