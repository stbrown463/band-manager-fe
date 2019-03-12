import React, { Component } from 'react'
import BandShows from '../BandShows'


class BandView extends Component {
	render () {
		console.log(this.props);
		return (



			<BandShows 
				username={this.props.username}
				user_id={this.props.user_id}
				band_name={this.props.band_name}
				band_id={this.props.band_id}
				shows={this.props.shows}
				setShow={this.props.setShow}/>
		)
	}
}

export default BandView