import React, { useState, useEffect } from 'react'
import { indexPosts } from '../../api/posts'
import { Link } from 'react-router-dom'

const PostIndex = (props) => {
  const [posts, setPosts] = useState(null)
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
      <h1>Index Page</h1>
      {postsIndex}
    </div>
  )
}

export default PostIndex
