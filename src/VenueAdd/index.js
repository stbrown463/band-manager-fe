import React, { Component } from 'react'

class VenueAdd extends Component {
	constructor() {
		super()

		this.state ={
			'name': '',
			'email': '',
			'img_url': '',
			'streetAddress': '',
			'city': '',
			'state': '',
			'zipcode': '',
			'longitude': '',
			'latitude': '',
			'website': '',
			'userWorksHere': false
		}
	}

  handleChange = (e) => {
    // console.log('handlechange is called');
    this.setState({
      [e.target.name]: e.target.value,
      userWorksHere: e.target.checked
    })
  }

  render () {
  	return (
  		<div>
  			<h1>Add a Venue</h1>
  			<form>
  				<input name="name" type="text" value={this.state.name} placeholder="name" onChange={this.handleChange}/><br/>
  				<input name="email" type="email" value={this.state.email} placeholder="email" onChange={this.handleChange}/><br/>
  				<input name="img_url" type="url" value={this.state.img_url} placeholder="img_url" onChange={this.handleChange}/><br/>
  				<input name="streetAddress" type="text" value={this.state.streetAddress} placeholder="streetAddress" onChange={this.handleChange}/><br/>
  				<input name="city" type="text" value={this.state.city} placeholder="city" onChange={this.handleChange}/><br/>
  				<input name="state" type="text" value={this.state.state} placeholder="state" onChange={this.handleChange}/><br/>
  				<input name="zipcode" type="number" value={this.state.zipcode} placeholder="zipcode" onChange={this.handleChange}/><br/>
  				<input name="longitude" type="number" value={this.state.longitude} placeholder="longitude" onChange={this.handleChange}/><br/>
  				<input name="latitude" type="number" value={this.state.latitude} placeholder="latitude" onChange={this.handleChange}/><br/>
  				<input name="website" type="url" value={this.state.website} placeholder="website" onChange={this.handleChange}/><br/>
  				{this.props.username ? <label>
						Are you an employeee of this venue?<br/>
						<input name="userWorksHere" type="checkbox" value={this.state.userWorksHere} placeholder="userWorksHere" onChange={this.handleChange}/><br/> 
					</label> : null}
  				<button>Add Venue</button>
  			</form>
  		</div>
  	)
  }
}

export default VenueAdd
