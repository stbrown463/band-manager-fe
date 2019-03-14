import React, { Component } from 'react'
// import BandShows from '../BandShows'


class BandView extends Component {
	constructor () {
		super()

		this.state = {
			shows: [],
			loading: true,
		}
	}

	componentDidMount () {
		this.setState({
			shows: this.props.bandToView.shows,
			loading: false
		})
	}

	render () {
		// console.log(this.props);
		return (
			<div className="center">
				<h1>{this.props.bandToView.name} - {this.props.bandToView.city}</h1>
				<img src={this.props.bandToView.img_url} alt={this.props.bandToView.name} />
				<a href={"mailto:" + this.props.bandToView.email} className="link">Email</a>
			</div>
		)
	}
}

export default BandView

// Can't get shows to View at the moment... work on this later

// {!this.state.loading ? <BandShows 
// 	username={this.props.username}
// 	user_id={this.props.user_id}
// 	band_name={this.props.bandToView.name}
// 	band_id={this.props.bandToView.id}
// 	shows={this.state.shows}
// 	setShow={this.props.setShow}/> : null }

// Example props for this page
// bandToView:
// city: "chicago"
// email: "goodbrother@gmail.com"
// id: 2
// img_url: "sam.jpg"
// name: "good brother"
// shows: Array(1)
	// 0:
	// bandshow_id: "2"
	// city: "Chicago"
	// date: "Sat, 20 Apr 2019 09:00:00 -0000"
	// doors: "Sat, 20 Apr 2019 08:00:00 -0000"
	// email: "bk@bk.com"
	// id: 1
	// loadIn: "Sat, 20 Apr 2019 06:00:00 -0000"
	// notes: "a very good show"
	// poster_url: "sam.jpg"
	// state: "IL"
	// streetAddress: "Belmont and Damen"
	// venue_id: "1"
	// venue_name: "Beat Kitchen"
	// zipcode: "60647"