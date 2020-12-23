import React, { useState, useEffect } from 'react'
import { indexPosts } from '../../api/posts'
import { Link } from 'react-router-dom'
import PostCreate from './postCreate'
import Button from 'react-bootstrap/Button'

const PostIndex = (props) => {
  const [posts, setPosts] = useState(null)
  const [showCreatePost, setShowCPost] = useState(false)

  const { user, msgAlert } = props
  // When the first page loads
  useEffect(() => {
    indexPosts(user)
      .then(res => {
        setPosts(res.data)
      })
      .catch(() => msgAlert({
        heading: 'Post Index Failed',
        message: 'Failed to gather the posts',
        variant: 'danger'
      }))
  }, [])

  // This function handles the hide and show of the forms
  const handleShow = () => {
    showCreatePost ? setShowCPost(false) : setShowCPost(true)
  }

  if (!posts) {
    return <p>Loading..</p>
  }

  const postsIndex = posts.map(post => (
    <div key={post.id}>
      <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
      <p>{post.text}</p>
    </div>
  ))

  return (
    <div>
      <h1>My Posts</h1>
      {postsIndex}
      <Button onClick={handleShow}>Write a Post!</Button>
      { showCreatePost ? (
        <div>
          <h4>Write your comment here: </h4>
          <PostCreate
            user={user}
            msgAlert={msgAlert}
          />
        </div>
      ) : null}
    </div>
  )
}

export default PostIndex
