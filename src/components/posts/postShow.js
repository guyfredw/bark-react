import React, { useState, useEffect, Fragment } from 'react'
import { showPost, deletePost } from '../../api/posts'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { withRouter, Redirect } from 'react-router-dom'
import CommentCreate from '../comments/commentCreate'

const Post = (props) => {
  const [post, setPost] = useState(null)
  const [update, setUpdate] = useState(false)
  const [showCreateCom, setShowCC] = useState(false)

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

  const handleUpdate = () => {
    setUpdate(true)
  }

  // This function handles the hide and show of the forms
  const handleShow = () => {
    showCreateCom ? setShowCC(false) : setShowCC(true)
  }

  if (update) {
    return <Redirect to={'/post-update/' + post.id} />
  }
  //  If there is no post return loading
  if (!post) {
    return <p>Loading...</p>
  } else {
    // If the post has comments
    if (post.comments.length >= 1) {
      const showComments = post.comments.map(comment => {
        if (user.id === comment.owner) {
          return (
            <div key={comment.id}>
              <p>{comment.body}</p>
            </div>)
        } else {
          return <p key={comment.id}>{comment.body}</p>
        }
      })
      return (
        <Fragment>
          <Jumbotron>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </Jumbotron>
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
          <Jumbotron>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </Jumbotron>
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

export default withRouter(Post)
