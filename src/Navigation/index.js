import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'

export class Navigation extends Component {
render() {
    return (
      <div id='nav-bar'>
    		<Link to={'/home'} className='nav-link'>Home</Link>
    		<Link to={'/connections'} className="nav-link"> Connections </Link>
    		<Link to={'/new'} className='nav-link'>Add</Link>
        <Link to={'/bandselect'} className='nav-link'>Band Select</Link>
        <Link to={'/'} className="nav-link" onClick={this.props.logout.bind(null)}>{this.props.user_id ? "Logout" : "Login"}</Link>
      </div>
    )
  }
}

export default withRouter(Navigation)