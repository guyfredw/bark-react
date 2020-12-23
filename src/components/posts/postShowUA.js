import React, { useState, useEffect, Fragment } from 'react'
import { showPostUA } from '../../api/posts'
import { withRouter } from 'react-router-dom'
import CommentCreate from '../comments/commentCreate'
import Button from 'react-bootstrap/Button'

const Post = (props) => {
  const [post, setPost] = useState(null)
  const [showCreateCom, setShowCC] = useState(false)

  const { msgAlert, match, user } = props

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

  // This function handles the hide and show of the forms
  const handleShow = () => {
    showCreateCom ? setShowCC(false) : setShowCC(true)
  }

  //  If there is no post return loading
  if (!post) {
    return <p>Loading...</p>
  } else {
    // If the user is not signed in
    if (!user) {
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
    // If the user is signed in then the user can create comments
    } else {
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
            <Button onClick={handleShow}>Write a comment!</Button>
            { showCreateCom ? (
              <div>
                <h4>Write your comment here: </h4>
                <CommentCreate
                  user={user}
                  msgAlert={msgAlert}
                  match={match}
                />
              </div>
            ) : null}
          </Fragment>
        )
      } else {
        return (
          <Fragment>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <p> This post has no comments </p>
            <h4>Be the first to comment</h4>
            <Button onClick={handleShow}>Write a comment!</Button>
            { showCreateCom ? (
              <div>
                <h4>Write your comment here: </h4>
                <CommentCreate
                  user={user}
                  msgAlert={msgAlert}
                  match={match}
                />
              </div>
            ) : null}
          </Fragment>
        )
      }
    }
  }
}

export default withRouter(Post)
