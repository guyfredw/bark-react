import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../assets/bark-logo.png'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown alignRight title="User" id="user-nav-dropdown">
      <NavDropdown.Item href='#posts'>My Posts</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavDropdown alignRight title="User" id="user-nav-dropdown">
      <NavDropdown.Item href="#sign-up">Sign Up</NavDropdown.Item>
      <NavDropdown.Item href="#sign-in">Sign In</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#all-posts">Posts</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="secondary" variant="dark" expand="md">
    <Navbar.Brand href="#/">
      <img src={logo} width='50' height='50'/>
    </Navbar.Brand>
    <Navbar.Brand>
      Bark
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
