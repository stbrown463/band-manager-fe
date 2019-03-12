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
						<Link to={'/band/add'} id='new'
						  username={this.props.username}
              user_id={this.props.user_id}
              band_id={this.props.band_id}
              band_name={this.props.band_name}>Add</Link>
					</div>
					<div className="card">
						<h2>Show</h2>
					</div>
				</div>
				<div className="row">
					<div className="card">
						<h2>Venue</h2>
					</div>
					<div className="card">
						<h2>Contact</h2>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(NewContainer)