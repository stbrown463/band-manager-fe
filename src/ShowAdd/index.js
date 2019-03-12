import React, { Component } from 'react'
import VenueSearch from '../VenueSearch'
import { DateTime } from "luxon";

class ShowAdd extends Component {
	constructor() {
		super()

		this.state ={
			'date': '',
			'loadIn': '',
			'doors': '',
			'notes': '',
			'poster_url': '',
			'venue': '',
			'userBandPlaying': false
		}
	}

	componentDidMount() {
		this.getVenues()
	}


  handleChange = (e) => {
    // console.log('handlechange is called');
    this.setState({
      [e.target.name]: e.target.value,
      userBandPlaying: e.target.checked
    })
  }

  getVenues = (e) => {
  	console.log('getVenues was called');
  }

  setVenue = (e) => {
    e.preventDefault()
    console.log('setVenue was valled');
    if (e.target.value != null) {
      const venueData = e.target.value.split(",");
      this.setState({
        venue: Number(venueData[0]),
      })
    } else {
      this.setState({
        venue: null,
      })
    }
  }

  addShow = async (e) => {
  	e.preventDefault()
  	console.log(this.state, "add band was called, this is state");

  // 	date: "2019-09-04T20:30"
		// doors: "20:00"
		// loadIn: "18:00"
		// notes: "A good show"
		// poster_url: "https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/40586973_1917118495249458_3563177492363608064_o.jpg?_nc_cat=102&_nc_ht=scontent-ort2-2.xx&oh=3c2781017fb5c68e2f98f0cb99e20433&oe=5D23E9A2"
		// userBandPlaying: false
		// venue: ""

  	// convert date to local timezone
  	const date = DateTime.fromISO(this.state.date).toString();
  	const loadIn = DateTime.fromISO(this.state.loadIn).toString();
  	const doors = DateTime.fromISO(this.state.doors).toString();
  	this.setState({
  		date: date,
  		loadIn: loadIn,
  		doors: doors
  	})
  	// console.log(date);
  	// console.log(date.zoneName);
  	// console.log(date.toString());

		// local.zoneName; //=> 'America/New_York'
		// local.toString(); //=> '2017-05-15T09:10:23.000-04:00'

		// var iso = DateTime.fromISO("2017-05-15T09:10:23");

		// iso.zoneName; //=> 'America/New_York'
		// iso.toString(); //=> '2017-05-15T09:10:23.000-04:00'





  	try {
  		const response = await fetch(`${process.env.REACT_APP_API_URL}/shows/new`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
  		})
			if (!response.ok) {
        throw Error(response.statusText)
      }
      const parsedResponse = await response.json()
       console.log(parsedResponse);

      // Add user as member of band
      if (this.state.userBandPlaying) {
				try {
					console.log('hitting add user as member of band');
					console.log(this.props.user_id);
					console.log(parsedResponse.id);
					const bandResponse = await fetch(`${process.env.REACT_APP_API_URL}/shows/band/new`,{
					  method: 'POST',
					  body: JSON.stringify({
					  	band_id: this.props.band_id,
					  	show_id: parsedResponse.id,
					  }),
					  credentials: 'include',
					  headers: {
					    'Content-Type': 'application/json'
					  }
					})
					if (!bandResponse.ok) {
					  throw Error(bandResponse.statusText)
					}
					const parsedBand = await bandResponse.json()
					console.log(parsedBand);

				} catch (err) {
					console.log(err)
				}
			}
  	} catch (err) {
  		console.log(err)
  	}
  }

	render () {
		// console.log(this.props);
		return (
			<div>
				<h1>Add a new show</h1>

				<VenueSearch setVenue={this.setVenue} /><br/>
				<form onSubmit={this.addShow}>
					<label>
						Date of show and start time<br />
						<input name="date" type="datetime-local" value={this.state.date} placeholder="date" onChange={this.handleChange}/><br/>
					</label>
					<label>
						Load in Time<br/>
						<input name="loadIn" type="datetime-local" value={this.state.loadIn} placeholder="loadIn" onChange={this.handleChange}/><br/>
					</label>
					<label>
						Doors time<br />
						<input name="doors" type="datetime-local" value={this.state.doors} placeholder="doors" onChange={this.handleChange}/><br/>
					</label>
					<input name="notes" type="text" value={this.state.notes} placeholder="notes" onChange={this.handleChange}/><br/>
					<input name="poster_url" type="text" value={this.state.poster_url} placeholder="poster_url" onChange={this.handleChange}/><br/>
					{this.props.band_name ? <label>
						Is {this.props.band_name} playing this show?
						<input name="userBandPlaying" type="checkbox" value={this.state.userBandPlaying} placeholder="userBandPlaying" onChange={this.handleChange}/><br/> 
					</label> : null}
					<button type="submit">Add Show</button>
				</form>
			</div>
		)
	}
}

export default ShowAdd