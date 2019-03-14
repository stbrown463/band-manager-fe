import React, { Component } from 'react'

class BandAdd extends Component {
	constructor() {
		super()

		this.state ={
			'name': '',
			'img_url': '',
			'email': '',
			'city': '',
			'state': '',
			'website': '',
			'userIsMember': false
		}
	}

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      userIsMember: e.target.checked
    })
  }

  addBand = async (e) => {
  	e.preventDefault()

  	// Create Band
  	try {
  		const response = await fetch(`${process.env.REACT_APP_API_URL}/bands/new`, {
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

      // Add user as member of band
      if (this.state.userIsMember) {
				// console.log('hitting add user as member of band');
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
				// const parsedMember = await memberResponse.json()
				// console.log(parsedMember);
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
				<h3>Add band</h3>
				<form onSubmit={this.addBand}>
					<input name="name" type="text" value={this.state.name} placeholder="name" onChange={this.handleChange}/><br/>
					<input name="img_url" type="text" value={this.state.img_url} placeholder="img_url" onChange={this.handleChange}/><br/>
					<input name="email" type="text" value={this.state.email} placeholder="email" onChange={this.handleChange}/><br/>
					<input name="city" type="text" value={this.state.city} placeholder="city" onChange={this.handleChange}/><br/>
					<input name="state" type="text" value={this.state.state} placeholder="state" onChange={this.handleChange}/><br/>
					<input name="website" type="text" value={this.state.website} placeholder="website" onChange={this.handleChange}/><br/>
					<label>
						I'm in this band:&nbsp; 
						<input name="userIsMember" className="checkbox" type="checkbox" value={this.state.userIsMember} placeholder="userIsMember" onChange={this.handleChange}/><br/>
					</label>
					<button type="submit">Add Band</button>
				</form>
			</div>
		)
	}
}

export default BandAdd