import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'

export class Navigation extends Component {
    render() {
        return (
            <div id='navbar'>
                <Link to={'/bandselect'} id='bandselect'>bandselect</Link>
                <Link to={'/'} id="logout" onClick={this.props.logout.bind(null)}>Logout</Link>
            </div>
        )
    }
}

export default withRouter(Navigation)