import React, { Component } from 'react'

class Home extends Component {
	render () {
		console.log(this.props, "props on home page");
		return (
			<h2>This is the home page</h2>
		)
	}
}

export default Home