import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class NewContainer extends Component {
	render () {
		console.log(this.props);
		return (
			<div>
				<h1>Add your Band, show, venue, or contact</h1>
				<div className="row">
					<div className="card">
						<h2>Band</h2>
						<Link to={'/band/add'} id='new-band'>Add</Link>
					</div>
					<div className="card">
						<h2>Show</h2>
						<Link to={'/show/add'} id='new-show'>Add</Link>
					</div>
				</div>
				<div className="row">
					<div className="card">
						<h2>Venue</h2>
						<Link to={'/venue/add'} id='new-venue'>Add</Link>
					</div>
					<div className="card">
						<h2>Contact</h2>
						<Link to={'/contact/add'} id='new-contact'>Add</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(NewContainer)