import React, { useState, useEffect, Fragment } from 'react'
import { showPostUA } from '../../api/posts'
import { withRouter } from 'react-router-dom'

const Post = (props) => {
  const [post, setPost] = useState(null)

  const { msgAlert, match } = props

  useEffect(() => {
    showPostUA(match.params.postId)
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
  //  If there is no post return loading
  if (!post) {
    return <p>Loading...</p>
  } else {
    // If the post has comments
    if (post.comments.length >= 1) {
      const showComments = post.comments.map(comment => (
        <p key={comment.id}>{comment.body}</p>
      ))
      return (
        <Fragment>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          <h3>Comments:</h3>
          {showComments}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          <p> This post has no comments </p>
        </Fragment>
      )
    }
  }
}

export default withRouter(Post)
