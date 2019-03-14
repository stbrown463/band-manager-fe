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

	showRegister = (e) => {
		e.preventDefault()
		if (this.state.showRegister) {
			this.setState({
				showRegister: false
			})
		} else {
			this.setState({
				showRegister: true
			})
		}
	}




	render() {
		// console.log(this.props);
		return (
			<div>
				<h1>BandConnectr</h1>
				{!this.state.showRegister ? <Login 
					handleLogin={this.props.handleLogin} 
					handleChange={this.props.handleChange} 
					username={this.props.username}
					password={this.props.password} /> :
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
					state={this.props.state} /> }
				<div className="clear"></div>
				<button onClick={this.showRegister}>{this.state.showRegister ? "Show Login" : "Show Register" }</button> 
			</div>


		)
	}
}


export default AuthContainer