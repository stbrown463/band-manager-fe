import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'

class AuthContainer extends Component {
	constructor () {
		super()

		this.state = {
			showRegister: false
		}
	}





	render() {
		// console.log(this.props);
		return (
			<div>
				<h1>This is auth container</h1>
				<Login 
					handleLogin={this.props.handleLogin} 
					handleChange={this.props.handleChange} 
					username={this.props.username}
					password={this.props.password} />
				<Register
					handleRegister={this.props.handleRegister} 
					handleChange={this.props.handleChange}
					username={this.props.username}
					password={this.props.password}
					verify_password={this.props.verify_password}
					email={this.props.email}
					name={this.props.name}
					bio={this.props.bio}
					city={this.props.city}
					state={this.props.state} />
			</div>

		)
	}
}


export default AuthContainer