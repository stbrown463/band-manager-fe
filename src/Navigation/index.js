import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'

export class Navigation extends Component {
render() {
    return (
      <div id='nav-bar'>
    		<Link to={'/home'} id='home'>Home</Link>
    		<Link to={'/connections'} id="new"> Connections </Link>
    		<Link to={'/new'} id='new'>Add</Link>
        <Link to={'/bandselect'} id='bandselect'>Band Select</Link>
        <Link to={'/'} id="logout" onClick={this.props.logout.bind(null)}>{this.props.user_id ? "Logout" : "Login"}</Link>
      </div>
    )
  }
}

export default withRouter(Navigation)