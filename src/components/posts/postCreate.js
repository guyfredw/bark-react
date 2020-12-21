import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createPost } from '../../api/posts'

const PostCreate = props => {
  const [post, setPost] = useState({ title: '', text: '' })
  // const [createdPostId, setCreatedPostId] = useState(null)

  const { user, msgAlert } = props

  const handleChange = event => {
    event.persist()
    setPost(prevPost => {
      // Determine the field that is being updated
      const updatedField = { [event.target.name]: event.target.value }
      // assign the value in the post object
      const editedPost = Object.assign({}, prevPost, updatedField)
      // return the edited posts
      return editedPost
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    createPost(user, post)
      .then(() => msgAlert({
        heading: 'Create Success',
        message: 'Post created successfully',
        variant: 'success'
      }))
      .then(() => {
        setPost({ title: '', text: '' })
      })
      .catch(err => msgAlert({
        heading: 'Create Fail',
        message: 'Failed to create post ' + err.message,
        variant: 'danger'
      }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <Form.Group controlId='post'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type='text'
          placeholder='Post title here'
          value={post.title}
          name='title'
          onChange={handleChange}
        />
        <Form.Label>Body</Form.Label>
        <Form.Control
          required
          type='text'
          placeholder='Post content here'
          value={post.text}
          name='text'
          onChange={handleChange}
        />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
      >Submit</Button>
    </form>
  )
}

export default PostCreate
