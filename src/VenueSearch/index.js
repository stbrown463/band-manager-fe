import React, { Component } from 'react'
import VenueSearchResults from '../VenueSearchResults'

class	VenueSearch extends Component {
	constructor () {
		super()

		this.state = {
			name: '',
			city: '',
			venues: []
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	searchVenue = async (e) => {
		e.preventDefault()
		console.log("search venue was called");
		try {
			const response = await fetch (`${process.env.REACT_APP_API_URL}/venues/search?name=${this.state.name}&city=${this.state.city}`)
			if (!response.ok) {
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json()
      
      this.setState({
      	venues: [...parsedResponse]
      })

		} catch (err) {
			console.log(err)
		}
	}

	render () {
		return (
			<div>
				<h3>Search Venues</h3>
				<form onSubmit={this.searchVenue}>
					<input type="text" name="name" placeholder="Venue name..." value={this.state.name} onChange={this.handleChange}/>
					<input type="text" name="city" placeholder="Venue city..." value={this.state.city} onChange={this.handleChange}/>
					<button>Search</button>
				</form>
				{this.state.venues !== null ? <VenueSearchResults 
					venues={this.state.venues}
					setVenue={this.props.setVenue} /> : null}
			</div>
		)
	}
}

export default VenueSearch