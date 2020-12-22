import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updatePost, showPost } from '../../api/posts'

const PostUpdate = props => {
  const [post, setPost] = useState({ title: '', text: '' })
  const [updated, setUpdated] = useState(false)

  const { user, msgAlert, match } = props

  useEffect(() => {
    showPost(user, match.params.postId)
      .then(res => setPost(res.data))
      .then(() => msgAlert({
        heading: 'Post Show Successfull',
        message: 'Post is displayed',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Post Show Fail',
        message: err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = event => {
    event.persist()
    setPost(prevPost => {
      // The field which is being updated
      const updatedField = { [event.target.name]: event.target.value }

      const editedPost = Object.assign({}, prevPost, updatedField)

      return editedPost
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    updatePost(user, post, match.params.postId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update sucessfull',
        message: 'Post updated',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return <Redirect to={`/posts/${match.params.postId}`} />
  }

  return (
    <div>
      <h1> Update Task </h1>
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
    </div>
  )
}

export default PostUpdate
