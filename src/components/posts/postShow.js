import React, { useState, useEffect, Fragment } from 'react'

import { showPost } from '../../api/posts'

const Post = (props) => {
  const [post, setPost] = useState(null)

  const { user, msgAlert, match } = props

  useEffect(() => {
    setPost([])
    console.log('link works')
    // console.log(user, msgAlert, match)
    showPost(user, match.params.postId)
      .then(res => {
        setPost(res.data)
        console.log(res)
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

  if (!post) {
    return <p>Loading...</p>
  } else {
    if (post.comments) {
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
        </Fragment>
      )
    }
  }
}

export default Post
