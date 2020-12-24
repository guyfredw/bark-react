import React, { Fragment } from 'react'
import logo from '../../assets/bark-logo.png'
// import postSS from '../../assets/postSS.png'

const Home = () => (
  <Fragment>
    <div className="homepage-title">
      <h1> Welcome to Bark!<img src={logo} /></h1>
    </div>
    <h2>About Bark</h2>
    <p>
      Bark is a social media application, where users are able to post about almost anything they desire and others will be able to do the same. Users will be also allowed to comment on others posts and on their own posts.
    </p>
    <h2>How to use the app</h2>
    <p>Check out all the posts by clicking on the <strong>Posts</strong> link in the navbar</p>
    <p>When all the posts are displayed you can click on the post title to checkout the comments of the post</p>
    <p> To access all the features create a user by signing up </p>
    <p> When signed-up/in you will be able to create posts and comment on posts </p>
    <p> <strong>Passwords</strong> require a minimum of 5 characters </p>
    <p> If you want to <strong>delete</strong> or <strong>update</strong> one of your posts go to <strong>My Posts</strong> under the <strong>User</strong> dropdown and click on one of the posts then you can update or delete it.</p>
  </Fragment>
)

export default Home
