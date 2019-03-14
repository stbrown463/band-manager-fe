import React, { Component } from 'react'
import BandShows from '../BandShows'
import Connections from '../Connections'
import { withRouter, Link } from 'react-router-dom'

class Home extends Component {
	
	componentDidMount() {
		this.props.getShowsOfBand()
	}

	render () {
		return (
			<div className="center">
				<h1>{this.props.band_name}</h1>
				<h2>Upcoming Shows</h2>
				<BandShows 
					username={this.props.username}
					user_id={this.props.user_id}
					band_name={this.props.band_name}
					band_id={this.props.band_id}
					shows={this.props.shows}
					setShow={this.props.setShow}/>
				<Link to={'/new'} className="link" 
					username={this.props.username}
					user_id={this.props.user_id}
					band_name={this.props.band_name}
					band_id={this.props.band_id}>Add a Show</Link>
				<Connections 
			    venueConnects={this.props.venueConnects}
	        bandConnects={this.props.bandConnects}
	        contactConnects={this.props.contactConnects}
	        getConnections={this.props.getConnections}/>
			</div>
		)
	}
}

export default withRouter(Home)