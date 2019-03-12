import React, { Component } from 'react'
import BandSearchResults from '../BandSearchResults'

class	BandSearch extends Component {
	constructor () {
		super()

		this.state = {
			name: '',
			city: '',
			bands: [],
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
      
      this.setState({
      	bands: [...parsedResponse]
      })

		} catch (err) {
			console.log(err)
		}
	}

	addBandMember = async (band_id, e) => {
  	try {
  		console.log('hitting add user as member of band');
  		console.log(band_id, "this is band_id in addBandMember");
  		console.log(this.props.user_id, "this is user_id in addBandMember");
  		const memberResponse = await fetch(`${process.env.REACT_APP_API_URL}/bands/member/new`,{
        method: 'POST',
        body: JSON.stringify({
        	user_id: this.props.user_id,
        	band_id: band_id
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

	render () {
		return (
			<div>
				{this.props.addBandtoShow ? <h3>Don't see your band? Try searching it's name</h3> :
				<h3>Add a band to the show</h3> }
				<form onSubmit={this.searchBand}>
					<input type="text" name="name" placeholder="Band name..." value={this.state.name} onChange={this.handleChange}/>
					<input type="text" name="city" placeholder="Band city..." value={this.state.city} onChange={this.handleChange}/>
					<button>Search</button>
				</form>
				{this.state.bands !== null ? <BandSearchResults 
					bands={this.state.bands}
					addBandMember={this.addBandMember}
					onShowPage={this.props.onShowPage}
					addBandToShow={this.props.addBandToShow} /> : null}
			</div>
		)
	}
}

export default BandSearch