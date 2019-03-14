import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class NewContainer extends Component {
	render () {
			return (
			<div>
				<h1>Add a Band, Show, or Venue</h1>
				<div className="row">
					<div className="card">
						<h2>Band</h2>
						<Link to={'/band/add'} className='link'>Add</Link>
					</div>
					<div className="card">
						<h2>Show</h2>
						<Link to={'/show/add'} className='link'>Add</Link>
					</div>
					<div className="card">
						<h2>Venue</h2>
						<Link to={'/venue/add'} className='link'>Add</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(NewContainer)
					// <div className="card">
					// 	<h2>Contact</h2>
					// 	<Link to={'/contact/add'} id='new-contact'>Add</Link>
					// </div>