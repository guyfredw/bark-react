import React, { useState, useEffect, Fragment } from 'react'
import { showPost, deletePost } from '../../api/posts'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'

const Post = (props) => {
  const [post, setPost] = useState(null)

  const { user, msgAlert, match, history } = props

  useEffect(() => {
    showPost(user, match.params.postId)
      .then(res => {
        setPost(res.data)
      })
      .then(() => {
        msgAlert({
          heading: 'Post shown successfully',
          message: 'See the post',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Post error',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  // When the button is clicked run this function
  const handleDelete = () => {
    // Call the api to delete the post
    deletePost(user, match.params.postId)
      .then(() => {
        msgAlert({
          heading: 'Post deleted',
          message: 'Returned to my posts',
          variant: 'success'
        })
      })
      // Redirect the user to the my posts page if the post was successfully deleted
      .then(() => history.push('/posts'))
      .catch(err => {
        msgAlert({
          heading: 'Failed Deletion',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  //  If there is no post return loading
  if (!post) {
    return <p>Loading...</p>
  } else {
    // If the post has comments
    if (post.comments) {
      const showComments = post.comments.map(comment => (
        <p key={comment.id}>{comment.body}</p>
      ))
      return (
        <Fragment>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          <Button onClick={handleDelete}>Delete</Button>
          <h3>Comments:</h3>
          {showComments}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
        </Fragment>
      )
    }
  }
}

export default withRouter(Post)
