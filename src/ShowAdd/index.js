import React, { Component } from 'react'
import VenueSearch from '../VenueSearch'

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

	// componentDidMount() {
	// 	this.getVenues()
	// }


  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value,
      userBandPlaying: e.target.checked
    })
  }

  // getVenues = (e) => {
  // 	console.log('getVenues was called');
  // }

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

      // Add user's band to show
	    if (this.state.userBandPlaying) {

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

				console.log('Connect band to venue');
		  	const connection = await fetch (`${process.env.REACT_APP_API_URL}/connections/bv/new`, {
				  method: 'POST',
				  body: JSON.stringify({
				  	my_band_id: this.props.band_id,
				  	venue_id: this.state.venue,
				  	notes: '',
				  }),
				  credentials: 'include',
				  headers: {
				    'Content-Type': 'application/json'
				  }
		  	})
				const parsedConnection = await connection.json()
				console.log(connection.status);

				if (connection.status === 200) {
					// reconnect with venue by c_id
					const reconnect = await fetch (`${process.env.REACT_APP_API_URL}/connections/bv/${parsedConnection.id}/reconnect`, {
					  method: 'PUT',
					  credentials: 'include',
					  headers: {
					    'Content-Type': 'application/json'
					  }
					})
					if (!reconnect.ok) {
						throw Error(connection.statusText)
					}
					const parsedReconnect = await reconnect.json()
					console.log(parsedReconnect);
				} else {
					console.log(parsedConnection);
				}
			}
			// this.props.goHome()
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
				<form className="center" onSubmit={this.addShow}>
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
						<input name="userBandPlaying" className="checkbox" type="checkbox" value={this.state.userBandPlaying} placeholder="userBandPlaying" onChange={this.handleChange}/><br/> 
					</label> : null}
					<button type="submit">Add Show</button>
				</form>
			</div>
		)
	}
}

export default ShowAdd