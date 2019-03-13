import React, { Component } from 'react'
import BandShows from '../BandShows'
import { withRouter, Link } from 'react-router-dom'

class Home extends Component {
	
	componentDidMount() {
		this.props.getShowsOfBand()
	}

	render () {
		console.log(this.props, "props on home page");
		return (
			<div className="center">
				<h3>{this.props.band_name}'s Upcoming Shows</h3>
				<BandShows 
					username={this.props.username}
					user_id={this.props.user_id}
					band_name={this.props.band_name}
					band_id={this.props.band_id}
					shows={this.props.shows}
					setShow={this.props.setShow}/>
				<Link to={'/new'} id="new" 
					username={this.props.username}
					user_id={this.props.user_id}
					band_name={this.props.band_name}
					band_id={this.props.band_id}>Add a Show</Link>
				<Link to={'/connections'} id="new"> Connections </Link>

			</div>
		)
	}
}

export default withRouter(Home)