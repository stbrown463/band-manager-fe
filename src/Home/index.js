import React, { Component } from 'react'
import BandShows from '../BandShows'

class Home extends Component {
	render () {
		console.log(this.props, "props on home page");
		return (
			<div>
				<h2>This is the home page</h2>
				<h3>Upcoming Shows</h3>
				<BandShows 
					username={this.props.username}
					user_id={this.props.user_id}
					band_name={this.props.band_name}
					band_id={this.props.band_id}/>

			</div>
		)
	}
}

export default Home