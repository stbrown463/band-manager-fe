import React, { Component } from 'react'
import ConnectionList from '../ConnectionList'

class Connections extends Component {
	componentDidMount () {
		this.props.getConnections()
	}

	makeConnection = (id, type, e) => {
		e.preventDefault()
		console.log('connect with band was called');
		console.log('this is id=', id);
		console.log('this is type=', type);
	}

	render () {
		console.log(this.props);
		return(
			<div>
				<ConnectionList 
					venues={this.props.venueConnects}
					bands={this.props.bandConnects}
					contacts={this.props.contactConnects}
					makeConnection={this.makeConnection}/>
			</div>
		)
	}
}

export default Connections

