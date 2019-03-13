import React, { Component } from 'react'

class Connections extends Component {
	componentDidMount () {
		this.props.getConnections()
	}

	render () {
		return(
			<div>
				Connections Page
			</div>
		)
	}
}

export default Connections