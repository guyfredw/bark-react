import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createComment } from '../../api/comments'

const CommentCreate = props => {
  const { user, msgAlert, match } = props
  // set the post_id to the url id
  const [comment, setComment] = useState({ body: '', post_id: match.params.postId })

  // console.log('comment post id is: ', comment.post_id)
  const handleChange = event => {
    event.persist()
    setComment(prevComment => {
      // Determine the field that is being updated
      const updatedField = { [event.target.name]: event.target.value }
      // assign the value in the post object
      const editedComment = Object.assign({}, prevComment, updatedField)
      // return the edited posts
      return editedComment
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    createComment(user, comment)
      .then(() => msgAlert({
        heading: 'Create Success',
        message: 'Post created successfully',
        variant: 'success'
      }))
      .then(() => {
        setComment({ body: '' })
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
        <Form.Label>Write your Comment:</Form.Label>
        <Form.Control
          required
          type='text'
          placeholder='Comment body here'
          value={comment.body}
          name='body'
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

export default CommentCreate
