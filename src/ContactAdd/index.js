import React, { Component } from 'react'

class ContactAdd extends Component {
	constructor() {
		super()

		this.state ={
			'name': '',
			'email': '',
			'city': '',
			'state': '',
			'userKnowsContact': false
		}
	}

  handleChange = (e) => {
    // console.log('handlechange is called');
    this.setState({
      [e.target.name]: e.target.value,
      userKnowsContact: e.target.checked
    })
  }

  render () {
  	return (
  		<div>
  			<h1>Add a Contact</h1>
  			<form>
  				<input name="name" type="text" value={this.state.name} placeholder="name" onChange={this.handleChange}/><br/>
  				<input name="email" type="email" value={this.state.email} placeholder="email" onChange={this.handleChange}/><br/>
  				<input name="city" type="text" value={this.state.city} placeholder="city" onChange={this.handleChange}/><br/>
  				<input name="state" type="text" value={this.state.state} placeholder="state" onChange={this.handleChange}/><br/>
  				{this.props.username ? <label>
						Do you know this person?<br />
						<input name="userKnowsContact" type="checkbox" value={this.state.userKnowsContact} onChange={this.handleChange}/><br/> 
					</label> : null}
					<button>Add Contact</button>
  			</form>
  		</div>
  	)
  }
}

export default ContactAdd