import React, { Component } from 'react'

class	BandSearch extends Component {
	constructor () {
		super()

		this.state = {
			name: '',
			city: '',
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	searchBand = async (e) => {
		e.preventDefault()
		console.log("search band was called");
		try {
			const response = await fetch (`${process.env.REACT_APP_API_URL}/bands/search?name=${this.state.name}&city=${this.state.city}`)
			if (!response.ok) {
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json()
      console.log(parsedResponse);

		} catch (err) {
			console.log(err)
		}
	}

	render () {
		return (
			<div>
				<h3>Don't see your band? Try searching it's name</h3>
				<form onSubmit={this.searchBand}>
					<input type="text" name="name" placeholder="Band name..." value={this.state.name} onChange={this.handleChange}/>
					<input type="text" name="city" placeholder="Band city..." value={this.state.city} onChange={this.handleChange}/>
					<button>Search</button>
				</form>
			</div>
		)
	}
}

export default BandSearch