import React, { Component } from 'react'

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
      userIsMember: e.target.checked
    })
  }

  searchVenues = (e) => {
  	console.log('searcHVenues was called');
  }

  getVenues = (e) => {
  	console.log('getVenues was called');
  }

  setVenue = (e) => {
  	console.log('setVenues was called');
  }

  addShow = async (e) => {
  	e.preventDefault()
  	console.log(this.state, "add band was called, this is state");

  	// Create Band
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
      // console.log(parsedResponse);

      // Add user as member of band
      if (this.state.userIsMember) {
				try {
					console.log('hitting add user as member of band');
					// console.log(this.props.user_id);
					// console.log(parsedResponse.id);
					const memberResponse = await fetch(`${process.env.REACT_APP_API_URL}/bands/member/new`,{
					  method: 'POST',
					  body: JSON.stringify({
					  	user_id: this.props.user_id,
					  	band_id: parsedResponse.id,
					  }),
					  credentials: 'include',
					  headers: {
					    'Content-Type': 'application/json'
					  }
					})
					if (!memberResponse.ok) {
					  throw Error(memberResponse.statusText)
					}
					const parsedMember = await memberResponse.json()
					console.log(parsedMember);

				} catch (err) {
					console.log(err)
				}
			}
			this.props.getBandsOfUser()
  	} catch (err) {
  		console.log(err)
  	}
  }

	render () {
		// console.log(this.props);
		return (
			<div>
				<h1>Add a new show</h1>
				<form onSubmit={this.addShow}>
					<label>
						Select venue. Don't see a venue? Link to addVenue page here<br />
						<select onChange={this.setVenue.bind(null)}>
							<option value={[null]}>No Venue</option>
						</select><br/>
					</label>
					<label>
						Date of show and start time<br />
						<input name="date" type="datetime-local" value={this.state.date} placeholder="date" onChange={this.handleChange}/><br/>
					</label>
					<label>
						Load in Time<br/>
						<input name="loadIn" type="time" value={this.state.loadIn} placeholder="loadIn" onChange={this.handleChange}/><br/>
					</label>
					<label>
						Doors time<br />
						<input name="doors" type="time" value={this.state.doors} placeholder="doors" onChange={this.handleChange}/><br/>
					</label>
					<input name="notes" type="text" value={this.state.notes} placeholder="notes" onChange={this.handleChange}/><br/>
					<input name="poster_url" type="url" value={this.state.poster_url} placeholder="poster_url" onChange={this.handleChange}/><br/>
					<label>
						Is {this.props.band_name} playing this show?
						<input name="userIsMember" type="checkbox" value={this.state.userIsMember} placeholder="userIsMember" onChange={this.handleChange}/><br/>
					</label>
					<button type="submit">Add Show</button>
				</form>
			</div>
		)
	}
}

export default ShowAdd