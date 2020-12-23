import React, { useState, useEffect } from 'react'
import { indexPostsUA } from '../../api/posts'
import { Link } from 'react-router-dom'
import PostCreate from './postCreate'

const PostIndexUA = (props) => {
  const [posts, setPosts] = useState(null)
  const { msgAlert, user } = props
  // when the page loads
  useEffect(() => {
    indexPostsUA()
      .then(res => {
        setPosts(res.data)
      })
      .catch(() => msgAlert({
        heading: 'Post Index Failed',
        message: 'Failed to gather the posts',
        variant: 'danger'
      }))
  }, [])

  if (!posts) {
    return <p>Loading..</p>
  }

  const postsIndex = posts.map(post => (
    <div key={post.id}>
      <h3><Link to={`/show-post/${post.id}`}>{post.title}</Link></h3>
      <p>{post.text}</p>
    </div>
  ))
  // If the user is signed in the user can create a new
  if (user) {
    return (
      <div>
        <h1>Index Page</h1>
        {postsIndex}
        <h3> Create a Post: </h3>
        <PostCreate
          user={user}
          msgAlert={msgAlert}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h1>Index Page</h1>
        {postsIndex}
      </div>
    )
  }
}

export default PostIndexUA
