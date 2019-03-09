import React, { Component } from 'react'
import Login from './Login'

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
			</div>

		)
	}
}

export default AuthContainer