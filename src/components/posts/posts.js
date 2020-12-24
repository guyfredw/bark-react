import React, { useState, useEffect } from 'react'
import { indexPosts } from '../../api/posts'
import { Link } from 'react-router-dom'
import PostCreate from './postCreate'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
    <div className='col-6' key={post.id}>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title><Link to={`/posts/${post.id}`}>{post.title}</Link></Card.Title>
            <Card.Text>{post.text}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </div>
  ))

  return (
    <div>
      <h1>My Posts</h1>
      <Row>
        {postsIndex}
      </Row>
      <Button onClick={handleShow}>Write a Post!</Button>
      { showCreatePost ? (
        <div>
          <h4>Write your post here: </h4>
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
